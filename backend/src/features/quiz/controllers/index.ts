import type { NextFunction, Request, Response } from 'express';

import { createQuizSchema } from '../schemas';
import {
  createQuiz,
  deleteQuizById,
  getQuizById,
  listQuizzes,
} from '../services';

export async function createQuizController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const parsed = createQuizSchema.safeParse(request.body);

    if (!parsed.success) {
      response.status(400).json({
        message: 'Invalid quiz payload',
        issues: parsed.error.flatten(),
      });
      return;
    }

    const quiz = await createQuiz(parsed.data);

    response.status(201).json(quiz);
  } catch (error) {
    next(error);
  }
}

export async function listQuizzesController(
  _request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const quizzes = await listQuizzes();
    response.json(quizzes);
  } catch (error) {
    next(error);
  }
}

export async function getQuizController(
  request: Request<{ id: string }>,
  response: Response,
  next: NextFunction,
) {
  try {
    const { id } = request.params;

    // Validate ID format
    if (!id || !/^[a-z0-9]+$/.test(id)) {
      response.status(400).json({ message: 'Invalid quiz ID format' });
      return;
    }

    const quiz = await getQuizById(id);

    if (!quiz) {
      response.status(404).json({ message: 'Quiz not found' });
      return;
    }

    response.json(quiz);
  } catch (error) {
    next(error);
  }
}

export async function deleteQuizController(
  request: Request<{ id: string }>,
  response: Response,
  next: NextFunction,
) {
  try {
    const { id } = request.params;

    // Validate ID format
    if (!id || !/^[a-z0-9]+$/.test(id)) {
      response.status(400).json({ message: 'Invalid quiz ID format' });
      return;
    }

    const deleted = await deleteQuizById(id);

    if (!deleted) {
      response.status(404).json({ message: 'Quiz not found' });
      return;
    }

    response.status(204).send();
  } catch (error) {
    next(error);
  }
}
