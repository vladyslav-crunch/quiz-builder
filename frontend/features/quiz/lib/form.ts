import type { CreateQuizPayload } from '../types';

import { splitList, type QuizFormValues } from '../schema';

export const defaultQuizFormValues: QuizFormValues = {
  title: '',
  questions: [
    {
      type: 'boolean',
      prompt: '',
      booleanAnswer: 'true',
      inputAnswer: '',
      optionsText: 'Option A\nOption B',
      correctAnswersText: 'Option A',
    },
  ],
};

export const toCreateQuizPayload = (
  values: QuizFormValues,
): CreateQuizPayload => ({
  title: values.title,
  questions: values.questions.map((question) => {
    if (question.type === 'boolean') {
      return {
        type: 'boolean' as const,
        prompt: question.prompt,
        correctAnswer: question.booleanAnswer === 'true',
      };
    }

    if (question.type === 'input') {
      return {
        type: 'input' as const,
        prompt: question.prompt,
        correctAnswer: question.inputAnswer?.trim() ?? '',
      };
    }

    return {
      type: 'checkbox' as const,
      prompt: question.prompt,
      options: splitList(question.optionsText ?? ''),
      correctAnswers: splitList(question.correctAnswersText ?? ''),
    };
  }),
});
