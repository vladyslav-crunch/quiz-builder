import { prisma } from '../../../prisma/client';
import type { CreateQuizInput, QuizDetail, QuizListItem } from '../types';

type QuizQuestionRecord = {
  id: string;
  type: QuizDetail['questions'][number]['type'];
  prompt: string;
  order: number;
  options: unknown;
  correctAnswer: unknown;
};

type QuizWithQuestions = {
  id: string;
  title: string;
  questions: QuizQuestionRecord[];
};

type QuizListQueryResult = Array<{
  id: string;
  title: string;
  _count: {
    questions: number;
  };
}>;

const quizListSelect = {
  id: true,
  title: true,
  _count: {
    select: { questions: true },
  },
} as const;


export async function createQuizRepository(
  input: CreateQuizInput,
): Promise<QuizDetail> {
  const quiz = await prisma.quiz.create({
    data: {
      title: input.title,
      questions: {
        create: input.questions.map((question, index) => {
          if (question.type === 'boolean') {
            return {
              type: 'boolean',
              prompt: question.prompt,
              order: index,
              correctAnswer: question.correctAnswer,
            };
          }

          if (question.type === 'input') {
            return {
              type: 'input',
              prompt: question.prompt,
              order: index,
              correctAnswer: question.correctAnswer,
            };
          }

          return {
            type: 'checkbox',
            prompt: question.prompt,
            order: index,
            options: question.options,
            correctAnswer: question.correctAnswers,
          };
        }),
      },
    },
    include: {
      questions: {
        orderBy: { order: 'asc' },
      },
    },
  });

  return toQuizDetail(quiz as QuizWithQuestions);
}

export async function listQuizzesRepository(): Promise<QuizListItem[]> {
  const quizzes = await listQuizzesQuery();

  return quizzes.map((quiz: QuizListQueryResult[number]) => ({
    id: quiz.id,
    title: quiz.title,
    questionCount: quiz._count.questions,
  }));
}


export async function getQuizByIdRepository(
  id: string,
): Promise<QuizDetail | null> {
  const quiz = await prisma.quiz.findUnique({
    where: { id },
    include: {
      questions: {
        orderBy: { order: 'asc' },
      },
    },
  });

  return quiz ? toQuizDetail(quiz as QuizWithQuestions) : null;
}


export async function deleteQuizByIdRepository(id: string): Promise<boolean> {
  const existingQuiz = await prisma.quiz.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existingQuiz) {
    return false;
  }

  await prisma.quiz.delete({
    where: { id },
  });

  return true;
}

function toQuizDetail(quiz: QuizWithQuestions): QuizDetail {
  return {
    id: quiz.id,
    title: quiz.title,
    questions: quiz.questions.map((question: QuizQuestionRecord) => ({
      id: question.id,
      type: question.type as QuizDetail['questions'][number]['type'],
      prompt: question.prompt,
      order: question.order,
      options: Array.isArray(question.options)
        ? (question.options as string[])
        : null,
      correctAnswer: normalizeCorrectAnswer(question.correctAnswer),
    })),
  };
}

function normalizeCorrectAnswer(
  value: unknown,
): QuizDetail['questions'][number]['correctAnswer'] {
  if (
    typeof value === 'boolean' ||
    typeof value === 'string' ||
    Array.isArray(value) ||
    value === null
  ) {
    return value as QuizDetail['questions'][number]['correctAnswer'];
  }

  return null;
}

async function listQuizzesQuery() {
  return prisma.quiz.findMany({
    orderBy: { createdAt: 'desc' },
    select: quizListSelect,
  });
}
