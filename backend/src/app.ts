import cors from 'cors';
import express from 'express';

import { env } from './env';
import { quizRoutes } from './features/quiz';
import { errorMiddleware } from './middleware/error.middleware';
import { notFoundMiddleware } from './middleware/not-found.middleware';

export const app = express();

app.use(cors({ origin: env.frontendUrl }));
app.use(express.json());

app.get('/health', (_request, response) => {
  response.json({ ok: true });
});

app.use('/quizzes', quizRoutes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);
