import { Router } from 'express';

import {
  createQuizController,
  deleteQuizController,
  getQuizController,
  listQuizzesController,
} from '../controllers';

export const quizRoutes = Router();

quizRoutes.post('/', createQuizController);
quizRoutes.get('/', listQuizzesController);
quizRoutes.get('/:id', getQuizController);
quizRoutes.delete('/:id', deleteQuizController);
