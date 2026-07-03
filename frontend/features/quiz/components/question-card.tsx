import { Badge } from '@/components/ui/badge';

import type { QuizQuestion } from '../types';
import {
  BooleanQuestion,
  CheckboxQuestion,
  InputQuestion,
} from './question-renderers';

export function QuestionCard({
  question,
  index,
}: {
  question: QuizQuestion;
  index: number;
}) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/6 p-6 shadow-glow backdrop-blur-xl">
      <div className="flex flex-wrap items-center gap-3">
        <Badge>Question {index + 1}</Badge>
        <Badge>{question.type}</Badge>
      </div>
      <h3 className="mt-4 text-xl font-semibold text-white">
        {question.prompt}
      </h3>

      {question.type === 'boolean' && <BooleanQuestion question={question} />}
      {question.type === 'input' && <InputQuestion question={question} />}
      {question.type === 'checkbox' && <CheckboxQuestion question={question} />}
    </article>
  );
}
