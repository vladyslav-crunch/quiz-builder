import { app } from './app';
import { env } from './env';

app.listen(env.port, () => {
  console.log(`Backend listening on http://localhost:${env.port}`);
});
