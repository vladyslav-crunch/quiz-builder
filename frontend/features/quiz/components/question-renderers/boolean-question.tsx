import type { QuizQuestion } from '../../types';

export function BooleanQuestion({ question }: { question: QuizQuestion }) {
  return (
    <div className="mt-5 flex gap-3">
      {['true', 'false'].map((option) => {
        const isCorrect = String(question.correctAnswer) === option;

        return (
          <span
            key={option}
            className={`rounded-2xl border px-4 py-2 text-sm ${
              isCorrect
                ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200'
                : 'border-white/10 bg-slate-950/40 text-white/60'
            }`}
          >
            {option === 'true' ? 'True' : 'False'}
          </span>
        );
      })}
    </div>
  );
}
