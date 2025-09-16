import { z } from 'zod';

export const agentsInsertSchema = z.object({
  name: z.string().min(1, { message: 'Nombre es requerido' }),
  instructions: z.string().min(1, { message: 'instrucciones son requerido' }),
});
