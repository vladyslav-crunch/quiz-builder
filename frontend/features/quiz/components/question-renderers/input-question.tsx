import type { QuizQuestion } from '../../types';

export function InputQuestion({ question }: { question: QuizQuestion }) {
  return (
    <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white/70">
      Correct answer:{' '}
      <span className="font-medium text-white">
        {String(question.correctAnswer ?? '')}
      </span>
    </div>
  );
}
