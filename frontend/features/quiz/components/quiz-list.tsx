'use client';

import Link from 'next/link';

import { useQuizList } from '../hooks/use-quiz-list';
import type { QuizListItem } from '../types';

export function QuizList({
  initialQuizzes,
}: {
  initialQuizzes: QuizListItem[];
}) {
  const { quizzes, deletingId, deleteError, handleDelete } =
    useQuizList(initialQuizzes);

  if (quizzes.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/6 p-8 text-center text-white/70 shadow-glow backdrop-blur-xl">
        No quizzes yet. Create the first one to see it appear here.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {quizzes.map((quiz) => (
        <article
          key={quiz.id}
          className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/6 p-5 shadow-glow backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-accent-500/30"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-accent-500/5 opacity-0 transition group-hover:opacity-100" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link href={`/quizzes/${quiz.id}`} className="min-w-0">
              <p className="text-xs uppercase tracking-[0.28em] text-white/40">
                Quiz
              </p>
              <h2 className="mt-2 truncate text-xl font-semibold text-white">
                {quiz.title}
              </h2>
              <p className="mt-2 text-sm text-white/60">
                {quiz.questionCount}{' '}
                {quiz.questionCount === 1 ? 'question' : 'questions'}
              </p>
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href={`/quizzes/${quiz.id}`}
                className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                View details
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(quiz.id)}
                disabled={deletingId === quiz.id}
                className={
                  deleteError && deletingId === quiz.id
                    ? 'grid h-10 w-10 place-items-center rounded-full border border-rose-400/50 bg-rose-500/10 text-rose-300 transition disabled:cursor-not-allowed disabled:opacity-50'
                    : 'grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/60 transition hover:border-rose-400/40 hover:bg-rose-500/10 hover:text-rose-200 disabled:cursor-not-allowed disabled:opacity-50'
                }
                aria-label={`Delete ${quiz.title}`}
              >
                {deletingId === quiz.id ? '...' : '×'}
              </button>
            </div>
          </div>
          {deleteError && deletingId === quiz.id && (
            <p className="mt-4 text-sm text-rose-300">{deleteError}</p>
          )}
        </article>
      ))}
    </div>
  );
}
