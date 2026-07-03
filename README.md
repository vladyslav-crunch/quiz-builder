# Quiz Builder

Full-stack quiz creation app built with Next.js, Express, PostgreSQL, Prisma, React Hook Form, Zod, and Tailwind CSS.

## Structure

- `backend/` - Express API + Prisma
- `frontend/` - Next.js UI

## Requirements

- Node.js 20+
- PostgreSQL database

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment files:

- Create `backend/.env` with:
```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/quiz_builder?schema=public"
FRONTEND_URL="http://localhost:3000"
PORT=4000
```

- Create `frontend/.env.local` with:
```bash
NEXT_PUBLIC_API_BASE_URL="http://localhost:4000"
```

3. Generate Prisma Client and push the schema to the database:

```bash
npm run prisma:generate --workspace backend
npm run db:push --workspace backend
```

4. Seed the database with a sample quiz:

```bash
npm run db:seed --workspace backend
```

5. Start both apps:

```bash
npm run dev
```

## Scripts

Backend:

- `npm run dev --workspace backend` - Start the API in watch mode
- `npm run build --workspace backend` - Type-check and compile the API
- `npm run lint --workspace backend` - Run ESLint
- `npm run db:push --workspace backend` - Apply Prisma schema changes
- `npm run db:seed --workspace backend` - Load sample data

Frontend:

- `npm run dev --workspace frontend` - Start the Next.js app
- `npm run build --workspace frontend` - Build the UI
- `npm run lint --workspace frontend` - Run lint checks

## Environment Variables

Backend `backend/.env`:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/quiz_builder?schema=public"
FRONTEND_URL="http://localhost:3000"
PORT=4000
```

Frontend `frontend/.env.local`:

```bash
NEXT_PUBLIC_API_BASE_URL="http://localhost:4000"
```

## API

- `POST /quizzes` - Create a quiz
- `GET /quizzes` - List quizzes with question counts
- `GET /quizzes/:id` - Fetch full quiz details
- `DELETE /quizzes/:id` - Delete a quiz

## Creating a Quiz

Open `http://localhost:3000/create`, add a title, add one or more questions, and submit the form. The quiz will be saved through the backend and you will be redirected to the detail page.
