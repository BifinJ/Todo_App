import { PrismaClient } from '@prisma/client';

// Check if we are running in production or development

  let prismaclient: PrismaClient | undefined;


const prisma = prismaclient || new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

if (process.env.NODE_ENV !== 'production') {
  prismaclient = prisma;
}

export default prisma;
