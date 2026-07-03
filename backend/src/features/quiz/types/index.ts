export type QuestionType = 'boolean' | 'input' | 'checkbox';

export type QuizListItem = {
  id: string;
  title: string;
  questionCount: number;
};

export type QuizQuestion = {
  id: string;
  type: QuestionType;
  prompt: string;
  order: number;
  options: string[] | null;
  correctAnswer: boolean | string | string[] | null;
};

export type QuizDetail = {
  id: string;
  title: string;
  questions: QuizQuestion[];
};

export type CreateQuizPayload = {
  title: string;
  questions: Array<
    | { type: 'boolean'; prompt: string; correctAnswer: boolean }
    | { type: 'input'; prompt: string; correctAnswer: string }
    | {
        type: 'checkbox';
        prompt: string;
        options: string[];
        correctAnswers: string[];
      }
  >;
};

export type CreateQuizInput = CreateQuizPayload;
