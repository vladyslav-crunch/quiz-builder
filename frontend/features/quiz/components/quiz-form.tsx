'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { ApiError } from '@/lib/api/base';
import { createQuiz } from '../api';
import { QuestionEditor } from './question-editor';
import { defaultQuizFormValues, toCreateQuizPayload } from '../lib/form';
import { quizFormSchema, type QuizFormValues } from '../schema';

export function QuizForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [questionError, setQuestionError] = useState<string | null>(null);
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<QuizFormValues>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: defaultQuizFormValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const onSubmit = async (values: QuizFormValues) => {
    setServerError(null);
    setQuestionError(null);

    try {
      const createdQuiz = await createQuiz(toCreateQuizPayload(values));
      router.push(`/quizzes/${createdQuiz.id}`);
      router.refresh();
    } catch (error) {
      if (error instanceof ApiError && error.fieldErrors) {
        // Set field-specific errors
        Object.entries(error.fieldErrors).forEach(([field, messages]) => {
          if (field === 'questions' && Array.isArray(messages)) {
            // Show error under questions
            setQuestionError(messages[0] || 'Error with questions');
          }
        });
      } else {
        setServerError(
          error instanceof Error ? error.message : 'Failed to create quiz',
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
      <section className="rounded-3xl border border-white/10 bg-white/6 p-6 shadow-glow backdrop-blur-xl">
        <label className="grid gap-2 text-sm font-medium text-white/70">
          Quiz title
          <input
            {...register('title')}
            disabled={isSubmitting}
            className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-accent-500/50 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="State capitals, product knowledge, onboarding check"
          />
        </label>
        {errors.title ? (
          <p className="mt-2 text-sm text-rose-300">{errors.title.message}</p>
        ) : null}
        {serverError ? (
          <p className="mt-2 text-sm text-rose-300">{serverError}</p>
        ) : null}
      </section>

      <section className="grid gap-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-white/40">
              Questions
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Build the quiz structure
            </h2>
          </div>
          <button
            type="button"
            onClick={() =>
              append({
                type: 'boolean',
                prompt: '',
                booleanAnswer: 'true',
                inputAnswer: '',
                optionsText: '',
                correctAnswersText: '',
              })
            }
            disabled={isSubmitting}
            className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add question
          </button>
        </div>

        <div className="grid gap-4">
          {fields.map((field, index) => {
            return (
              <article
                key={field.id}
                className="rounded-3xl border border-white/10 bg-slate-950/45 p-5 shadow-glow"
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/35">
                    Question {index + 1}
                  </p>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1 || isSubmitting}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid gap-4">
                  <label className="grid gap-2 text-sm font-medium text-white/70">
                    Question type
                    <select
                      {...register(`questions.${index}.type`)}
                      disabled={isSubmitting}
                      className="appearance-none rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 pr-14 text-white outline-none transition focus:border-accent-500/50 disabled:cursor-not-allowed disabled:opacity-50 bg-no-repeat bg-[length:20px] bg-[position:right_16px_center]"
                      style={{
                        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                      }}
                    >
                      <option value="boolean">Boolean</option>
                      <option value="input">Input</option>
                      <option value="checkbox">Checkbox</option>
                    </select>
                  </label>

                  <label className="grid gap-2 text-sm font-medium text-white/70">
                    Prompt
                    <input
                      {...register(`questions.${index}.prompt`)}
                      disabled={isSubmitting}
                      className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-accent-500/50 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="What is the capital of Japan?"
                    />
                  </label>
                  {errors.questions?.[index]?.prompt ? (
                    <p className="text-sm text-rose-300">
                      {errors.questions[index]?.prompt?.message}
                    </p>
                  ) : null}

                  <QuestionEditor
                    control={control}
                    register={register}
                    errors={errors}
                    index={index}
                    questionError={questionError}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <div className="flex items-center justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-gradient-to-r from-accent-500 to-orange-700 px-6 py-3 font-semibold text-slate-950 shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Saving quiz...' : 'Publish quiz'}
        </button>
      </div>
    </form>
  );
}
