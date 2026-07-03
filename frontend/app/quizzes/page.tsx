import { Shell } from '@/components/shell';
import { PageHeader } from '@/components/layouts/page-header';
import { ErrorState } from '@/components/layouts/error-state';
import { QuizList, ApiError, getQuizzes } from '@/features/quiz';

export default async function QuizzesPage() {
  try {
    const quizzes = await getQuizzes();

    return (
      <Shell>
        <PageHeader
          label="Dashboard"
          title="All quizzes in one place."
          description="Browse every quiz, open the full structure, or remove it from the database directly from this view."
        />

        <QuizList initialQuizzes={quizzes} />
      </Shell>
    );
  } catch (error) {
    const message =
      error instanceof ApiError
        ? error.message
        : 'The quiz dashboard is temporarily unavailable.';

    return (
      <Shell>
        <ErrorState title="Cannot load quizzes right now." message={message} />
      </Shell>
    );
  }
}
