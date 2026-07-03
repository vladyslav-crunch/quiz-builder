import { z } from 'zod';

const questionTypeSchema = z.enum(['boolean', 'input', 'checkbox']);

const quizQuestionSchema = z.object({
  id: z.string(),
  type: questionTypeSchema,
  prompt: z.string(),
  order: z.number().int().nonnegative(),
  options: z.array(z.string()).nullable(),
  correctAnswer: z.union([
    z.boolean(),
    z.string(),
    z.array(z.string()),
    z.null(),
  ]),
});

export const quizListItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  questionCount: z.number().int().nonnegative(),
});

export const quizDetailSchema = z.object({
  id: z.string(),
  title: z.string(),
  questions: z.array(quizQuestionSchema),
});

export const quizzesListSchema = z.array(quizListItemSchema);

export type ValidatedQuizListItem = z.infer<typeof quizListItemSchema>;
export type ValidatedQuizDetail = z.infer<typeof quizDetailSchema>;
export type ValidatedQuizzesList = z.infer<typeof quizzesListSchema>;
