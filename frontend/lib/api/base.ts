import type { ZodSchema } from 'zod';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000';

export interface FieldError {
  [key: string]: string[];
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly fieldErrors?: FieldError,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export type ApiRequestInit = RequestInit & {
  cache?: string;
};

export const request = async <T>(
  path: string,
  init?: ApiRequestInit,
  validator?: ZodSchema,
): Promise<T> => {
  let response: Response;

  try {
    response = await fetch(`${baseUrl}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      },
    });
  } catch {
    throw new ApiError(503, `Unable to reach the quiz API at ${baseUrl}`);
  }

  if (!response.ok) {
    let message = await response.text();
    let fieldErrors: FieldError | undefined;
    try {
      const jsonError = JSON.parse(message);
      if (jsonError.issues?.fieldErrors) {
        fieldErrors = jsonError.issues.fieldErrors;
        message = jsonError.message || message;
      }
    } catch {}

    throw new ApiError(
      response.status,
      message || `Request failed with status ${response.status}`,
      fieldErrors,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const json = await response.json();

  // Validate response with Zod schema if provided
  if (validator) {
    const validated = validator.safeParse(json);
    if (!validated.success) {
      throw new ApiError(
        500,
        `Invalid API response: ${validated.error.message}`,
      );
    }
    return validated.data as T;
  }

  return json as Promise<T>;
};
