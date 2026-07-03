'use client';

import { useState } from 'react';
import { deleteQuiz } from '../api';
import type { QuizListItem } from '../types';

export function useQuizList(initialQuizzes: QuizListItem[]) {
  const [quizzes, setQuizzes] = useState(initialQuizzes);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = async (quizId: string) => {
    setDeletingId(quizId);
    setDeleteError(null);

    try {
      await deleteQuiz(quizId);
      setQuizzes((current) => current.filter((quiz) => quiz.id !== quizId));
    } catch (error) {
      setDeleteError(
        error instanceof Error ? error.message : 'Failed to delete quiz',
      );
    } finally {
      setDeletingId(null);
    }
  };

  return { quizzes, deletingId, deleteError, handleDelete };
}
