import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/constants';
import { z } from 'zod';

export const agentsInsertSchema = z.object({
  name: z.string().min(1, { message: 'Nombre es requerido' }),
  instructions: z.string().min(1, { message: 'instrucciones son requerido' }),
});

export const agentsQuerySchema = z.object({
  search: z.string().optional().default(''),
  page: z.coerce.number().optional().default(DEFAULT_PAGE),
  pageSize: z.coerce.number().optional().default(DEFAULT_PAGE_SIZE),
});
