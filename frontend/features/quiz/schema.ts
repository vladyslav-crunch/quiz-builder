import { z } from 'zod';

const questionFormSchema = z
  .object({
    type: z.enum(['boolean', 'input', 'checkbox']),
    prompt: z.string().trim().min(1, 'Question prompt is required'),
    booleanAnswer: z.enum(['true', 'false']).optional(),
    inputAnswer: z.string().optional(),
    optionsText: z.string().optional(),
    correctAnswersText: z.string().optional(),
  })
  .superRefine((value, context) => {
    if (value.type === 'boolean' && !value.booleanAnswer) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Pick true or false.',
        path: ['booleanAnswer'],
      });
    }

    if (value.type === 'input' && !value.inputAnswer?.trim()) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Provide the expected answer.',
        path: ['inputAnswer'],
      });
    }

    if (value.type === 'checkbox') {
      const options = splitList(value.optionsText ?? '');
      const correctAnswers = splitList(value.correctAnswersText ?? '');

      if (options.length < 2) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Add at least two options.',
          path: ['optionsText'],
        });
      }

      if (correctAnswers.length < 1) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Add at least one correct answer.',
          path: ['correctAnswersText'],
        });
      }

      if (correctAnswers.length > options.length) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Cannot have more correct answers than options.',
          path: ['correctAnswersText'],
        });
      }

      if (correctAnswers.some((answer) => !options.includes(answer))) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Every correct answer must match an option exactly.',
          path: ['correctAnswersText'],
        });
      }
    }
  });

export const quizFormSchema = z.object({
  title: z.string().trim().min(1, 'Quiz title is required'),
  questions: z.array(questionFormSchema).min(1, 'Add at least one question'),
});

export type QuizFormValues = z.infer<typeof quizFormSchema>;

export const splitList = (value: string) =>
  value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
