import prisma from '@/lib/prisma';
import { createTRPCRouter, protectedProcedure } from '@/trpc/init';
import { agentsInsertSchema } from '../schemas';
import z from 'zod';

export const agentsRouter = createTRPCRouter({
  getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    return await prisma.agents.findUnique({
      where: {
        id: input.id,
      },
    });
  }),

  getMany: protectedProcedure.query(async () => {
    return await prisma.agents.findMany();
  }),
  create: protectedProcedure.input(agentsInsertSchema).mutation(async ({ input, ctx }) => {
    return await prisma.agents.create({ data: { ...input, userId: ctx.auth.user.id } });
  }),
});
