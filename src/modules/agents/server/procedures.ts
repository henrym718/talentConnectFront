import prisma from '@/lib/prisma';
import { createTRPCRouter, baseProcedure } from '@/trpc/init';
import { TRPCError } from '@trpc/server';

export const agentsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    return await prisma.agents.findMany();
  }),
});
