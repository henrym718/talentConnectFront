import prisma from '@/lib/prisma';
import { createTRPCRouter, baseProcedure, protectedProcedure } from '@/trpc/init';
import { agentsInsertSchema } from '../schemas';
import z from 'zod';

export const agentsRouter = createTRPCRouter({
  getOne: baseProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    return await prisma.agents.findUnique({
      where: {
        id: input.id,
      },
    });
  }),

  getMany: baseProcedure.query(async () => {
    return await prisma.agents.findMany();
  }),
  create: protectedProcedure.input(agentsInsertSchema).mutation(async ({ input, ctx }) => {
    return await prisma.agents.create({ data: { ...input, userId: ctx.auth.user.id } });
  }),
});
