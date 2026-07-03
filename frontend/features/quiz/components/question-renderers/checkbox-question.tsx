import type { QuizQuestion } from '../../types';

export function CheckboxQuestion({ question }: { question: QuizQuestion }) {
  return (
    <div className="mt-5 grid gap-4">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-white/35">
          Options
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {(question.options ?? []).map((option) => {
            const isCorrect =
              Array.isArray(question.correctAnswer) &&
              question.correctAnswer.includes(option);

            return (
              <div
                key={option}
                className={`rounded-2xl border px-4 py-3 text-sm ${
                  isCorrect
                    ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-100'
                    : 'border-white/10 bg-slate-950/40 text-white/70'
                }`}
              >
                {option}
              </div>
            );
          })}
        </div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white/70">
        Correct answers:{' '}
        <span className="font-medium text-white">
          {Array.isArray(question.correctAnswer)
            ? question.correctAnswer.join(', ')
            : ''}
        </span>
      </div>
    </div>
  );
}
