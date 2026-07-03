'use client';

import {
  useWatch,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from 'react-hook-form';

import type { QuizFormValues } from '../schema';

export function QuestionEditor({
  control,
  register,
  errors,
  index,
  questionError,
}: {
  control: Control<QuizFormValues>;
  register: UseFormRegister<QuizFormValues>;
  errors: FieldErrors<QuizFormValues>;
  index: number;
  questionError?: string | null;
}) {
  const questionType = useWatch({ control, name: `questions.${index}.type` });

  return (
    <div className="flex flex-col gap-4">
      {questionType === 'boolean' ? (
        <div>
          <label className="grid gap-2 text-sm font-medium text-white/70">
            Correct answer
            <select
              {...register(`questions.${index}.booleanAnswer`)}
              className="appearance-none rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 pr-14 text-white outline-none transition focus:border-accent-500/50 bg-no-repeat bg-[length:20px] bg-[position:right_16px_center]"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
              }}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </label>
          {errors.questions?.[index]?.booleanAnswer ? (
            <p className="mt-2 text-sm text-rose-300">
              {errors.questions[index]?.booleanAnswer?.message}
            </p>
          ) : null}
        </div>
      ) : null}

      {questionType === 'input' ? (
        <div>
          <label className="grid gap-2 text-sm font-medium text-white/70">
            Correct answer
            <input
              {...register(`questions.${index}.inputAnswer`)}
              className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-accent-500/50"
              placeholder="Tokyo"
            />
          </label>
          {errors.questions?.[index]?.inputAnswer ? (
            <p className="mt-2 text-sm text-rose-300">
              {errors.questions[index]?.inputAnswer?.message}
            </p>
          ) : null}
        </div>
      ) : null}

      {questionType === 'checkbox' ? (
        <div className="grid gap-4">
          <div>
            <label className="grid gap-2 text-sm font-medium text-white/70">
              Options
              <textarea
                {...register(`questions.${index}.optionsText`)}
                rows={4}
                className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-accent-500/50"
                placeholder="Option A\nOption B\nOption C"
              />
            </label>
            {errors.questions?.[index]?.optionsText ? (
              <p className="mt-2 text-sm text-rose-300">
                {errors.questions[index]?.optionsText?.message}
              </p>
            ) : null}
            {questionError ? (
              <p className="mt-2 text-sm text-rose-300">{questionError}</p>
            ) : null}
          </div>
          <div>
            <label className="grid gap-2 text-sm font-medium text-white/70">
              Correct answers
              <textarea
                {...register(`questions.${index}.correctAnswersText`)}
                rows={3}
                className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-accent-500/50"
                placeholder="Option A\nOption C"
              />
            </label>
            {errors.questions?.[index]?.correctAnswersText ? (
              <p className="mt-2 text-sm text-rose-300">
                {errors.questions[index]?.correctAnswersText?.message}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
