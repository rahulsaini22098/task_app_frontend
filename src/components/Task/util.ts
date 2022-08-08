import { object, string } from 'yup'

export const taskSchema = object({
  taskname: string().required(),
  taskDescription: string().required()
})