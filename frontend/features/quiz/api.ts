import type { CreateQuizPayload, QuizDetail, QuizListItem } from './types';

import { ApiError, request } from '@/lib/api/base';
import { quizDetailSchema, quizzesListSchema } from './response-schemas';

export { ApiError };

export const getQuizzes = async (): Promise<QuizListItem[]> =>
  request('/quizzes', { cache: 'no-store' }, quizzesListSchema);

export const getQuiz = async (id: string): Promise<QuizDetail> =>
  request(`/quizzes/${id}`, { cache: 'no-store' }, quizDetailSchema);

export const createQuiz = async (
  payload: CreateQuizPayload,
): Promise<QuizDetail> =>
  request(
    '/quizzes',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
    quizDetailSchema,
  );

export const deleteQuiz = async (id: string): Promise<void> =>
  request(`/quizzes/${id}`, {
    method: 'DELETE',
  });
