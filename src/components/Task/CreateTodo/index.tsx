import React from 'react'
import { useFormik } from 'formik'
import { Input } from 'antd'

import { CreateTodoProps } from '../types'
import { taskSchema } from '../util'

import style from './style.module.css'


const CreateTodo: React.FC<CreateTodoProps> = ({
  selectedTask,  
  onTaskCreate, 
  onTaskUpdate,
}) => {

  const isTaskSelected = selectedTask !== null

  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm
  } = useFormik({
    initialValues: {
      taskname: isTaskSelected ? selectedTask.taskname : '',
      taskDescription: isTaskSelected ? selectedTask.taskDescription : ''
    },
    enableReinitialize: true,
    validationSchema: taskSchema,
    onSubmit: values => {
      isTaskSelected
        ? onTaskUpdate(selectedTask.id, values, resetForm)
        : onTaskCreate(values, resetForm)
    },
  })

  return (
    <div className={style.todo_container}>
      <form className={style.task_form} onSubmit={handleSubmit}>
        <div className={style.group_input}>
          <label>Task Name</label>
          <Input
            className={style.task_input}
            type='text'
            name='taskname'
            placeholder='example: My first task'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.taskname}
            data-error={touched.taskname && errors.taskname ? 'true' : 'false'}
          />
        </div>

        <div className={style.group_input}>
          <label>Task Description</label>
          <Input.TextArea
            className={style.task_textarea}
            name='taskDescription'
            rows={2}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.taskDescription}
            data-error={touched.taskDescription && errors.taskDescription ? 'true' : 'false'}
          />
        </div>

        <button className={style.submit_button} type='submit'>{isTaskSelected ? 'Update Task' : 'Create Task'}</button>
      </form>
    </div>
  )
}

export default CreateTodo