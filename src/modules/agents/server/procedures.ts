import prisma from '@/lib/prisma';
import { createTRPCRouter, protectedProcedure } from '@/trpc/init';
import { agentsInsertSchema, agentsQuerySchema } from '../schemas';
import z from 'zod';

export const agentsRouter = createTRPCRouter({
  getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    return await prisma.agents.findUnique({
      where: {
        id: input.id,
      },
    });
  }),

  getMany: protectedProcedure.input(agentsQuerySchema).query(async ({ input, ctx }) => {
    const { pageSize, page, search } = input;

    const data = await prisma.agents.findMany({
      where: {
        AND: [{ userId: ctx.auth.user.id }, { name: { contains: search, mode: 'insensitive' } }],
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.agents.count({
      where: {
        AND: [{ userId: ctx.auth.user.id }, { name: { contains: search, mode: 'insensitive' } }],
      },
    });

    const totalPages = Math.ceil(total / pageSize);

    return {
      items: data,
      total,
      totalPages,
    };
  }),

  create: protectedProcedure.input(agentsInsertSchema).mutation(async ({ input, ctx }) => {
    return await prisma.agents.create({ data: { ...input, userId: ctx.auth.user.id } });
  }),
});
