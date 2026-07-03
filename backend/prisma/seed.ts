/// <reference types="node" />
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();

  await prisma.quiz.create({
    data: {
      title: 'Sample General Knowledge Quiz',
      questions: {
        create: [
          {
            type: 'boolean',
            prompt: 'The Earth orbits the Sun.',
            order: 0,
            correctAnswer: true,
          },
          {
            type: 'input',
            prompt: 'What is the capital of France?',
            order: 1,
            correctAnswer: 'Paris',
          },
          {
            type: 'checkbox',
            prompt: 'Select all prime numbers.',
            order: 2,
            options: ['2', '3', '4', '5'],
            correctAnswer: ['2', '3', '5'],
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
