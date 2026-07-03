import type { Request, Response } from 'express';

export function errorMiddleware(
  error: unknown,
  _request: Request,
  response: Response,
) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : undefined;

  // Log error with timestamp for debugging
  console.error('[ERROR]', {
    timestamp: new Date().toISOString(),
    message: errorMessage,
    stack: errorStack,
  });

  // Prisma validation errors -> 400 Bad Request
  if (
    errorMessage.includes('Unique constraint failed') ||
    errorMessage.includes('Unknown field') ||
    errorMessage.includes('Invalid value')
  ) {
    response.status(400).json({
      message: 'Invalid data provided',
      code: 'VALIDATION_ERROR',
    });
    return;
  }

  // Prisma connection errors -> 503 Service Unavailable
  if (
    errorMessage.includes("Can't reach database") ||
    errorMessage.includes('Connection refused') ||
    errorMessage.includes('ENOTFOUND')
  ) {
    response.status(503).json({
      message: 'Database service temporarily unavailable',
      code: 'DATABASE_UNAVAILABLE',
    });
    return;
  }

  // Default to 500 for other errors
  response.status(500).json({
    message: 'An unexpected error occurred',
    code: 'INTERNAL_SERVER_ERROR',
  });
}
