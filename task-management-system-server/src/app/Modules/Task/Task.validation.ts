import { z } from 'zod';



const createTaskValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
 
  }),
});
const updateTaskValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  
  }),
});

export const taskValidationSchema = {
    createTaskValidationSchema,
    updateTaskValidationSchema,
};
