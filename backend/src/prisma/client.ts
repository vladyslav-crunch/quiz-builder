import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

// Handle graceful shutdown to prevent connection pool exhaustion
process.on('SIGINT', async () => {
  console.log('SIGINT received, closing Prisma connection...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing Prisma connection...');
  await prisma.$disconnect();
  process.exit(0);
});

// Handle uncaught exceptions
process.on('uncaughtException', async (error) => {
  console.error('Uncaught exception:', error);
  await prisma.$disconnect();
  process.exit(1);
});
