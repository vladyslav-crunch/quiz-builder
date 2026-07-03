import { Shell } from '@/components/shell';
import { PageHeader } from '@/components/layouts/page-header';
import { QuizForm } from '@/features/quiz';

export default function CreateQuizPage() {
  return (
    <Shell>
      <PageHeader
        label="Create"
        title="Design a quiz with structured question types."
        description="Mix boolean, input, and checkbox questions. Add or remove questions dynamically, then publish the quiz to the backend."
      />
      <QuizForm />
    </Shell>
  );
}
