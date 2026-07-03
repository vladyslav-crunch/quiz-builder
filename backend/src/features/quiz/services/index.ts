import {
  createQuizRepository,
  deleteQuizByIdRepository,
  getQuizByIdRepository,
  listQuizzesRepository,
} from '../repositories';
import type { CreateQuizInput, QuizDetail, QuizListItem } from '../types';

export async function createQuiz(input: CreateQuizInput): Promise<QuizDetail> {
  return createQuizRepository(input);
}

export async function listQuizzes(): Promise<QuizListItem[]> {
  return listQuizzesRepository();
}

export async function getQuizById(id: string): Promise<QuizDetail | null> {
  return getQuizByIdRepository(id);
}

export async function deleteQuizById(id: string): Promise<boolean> {
  return deleteQuizByIdRepository(id);
}
