import { notFound } from 'next/navigation';

import { Shell } from '@/components/shell';
import { PageHeader } from '@/components/layouts/page-header';
import { ErrorState } from '@/components/layouts/error-state';
import { QuestionCard, ApiError, getQuiz } from '@/features/quiz';

type QuizDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function QuizDetailPage({ params }: QuizDetailPageProps) {
  const { id } = await params;

  try {
    const quiz = await getQuiz(id);

    return (
      <Shell>
        <PageHeader
          label="Quiz detail"
          title={quiz.title}
          description="Read-only preview of the quiz structure with questions and expected answers."
        />

        <div className="grid gap-4">
          {quiz.questions.map((question, index) => (
            <QuestionCard key={question.id} question={question} index={index} />
          ))}
        </div>
      </Shell>
    );
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    const message =
      error instanceof ApiError
        ? error.message
        : 'The quiz details are temporarily unavailable.';

    return (
      <Shell>
        <ErrorState
          title="Cannot load this quiz right now."
          message={message}
        />
      </Shell>
    );
  }
}
