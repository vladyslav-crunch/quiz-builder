import { z } from 'zod';

const booleanQuestionSchema = z.object({
  type: z.literal('boolean'),
  prompt: z.string().trim().min(1),
  correctAnswer: z.boolean(),
});

const inputQuestionSchema = z.object({
  type: z.literal('input'),
  prompt: z.string().trim().min(1),
  correctAnswer: z.string().trim().min(1),
});

const checkboxQuestionSchema = z
  .object({
    type: z.literal('checkbox'),
    prompt: z.string().trim().min(1),
    options: z.array(z.string().trim().min(1)).min(2),
    correctAnswers: z.array(z.string().trim().min(1)).min(1),
  })
  .superRefine((value, context) => {
    const optionSet = new Set(value.options);

    if (value.correctAnswers.some((answer) => !optionSet.has(answer))) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Every correct answer must exist in the options list.',
        path: ['correctAnswers'],
      });
    }

    if (new Set(value.options).size !== value.options.length) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Options must be unique.',
        path: ['options'],
      });
    }
  });

export const createQuizSchema = z.object({
  title: z.string().trim().min(1),
  questions: z
    .array(
      z.union([
        booleanQuestionSchema,
        inputQuestionSchema,
        checkboxQuestionSchema,
      ]),
    )
    .min(1),
});

export type CreateQuizInput = z.infer<typeof createQuizSchema>;
