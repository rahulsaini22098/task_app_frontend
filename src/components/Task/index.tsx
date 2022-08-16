import React, { useEffect } from 'react'

import { getAllTasks,
  createTask,
  deleteTask, 
  updatedTask,
  updateSelectedTask } from '../../redux/slice/taskSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hook'

import style from './style.module.css'
import CreateTodo from './CreateTodo'
import TodoList from './TodoList'
import { FormValues } from './types'

const Task = () => {
  const { tasks, selectedTask } = useAppSelector((state) => state.tasks)
  const { token } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(token){
      dispatch(getAllTasks(token))
    }
  }, [token])

  const taskCreateHandler = (values: FormValues, cb: () => void) => {
    if(token){
      dispatch(createTask({ token, values }))
      cb()
    }
  }

  const taskUpdateHandler = (id: string, values: FormValues, cb?: () => void) => {
    if(token){
      dispatch(updatedTask({ id, values, token }))
    }

    cb?.()
  }

  const taskDeleteHandler = (taskId: string) => {
    if(token){
      dispatch(deleteTask({ taskId, token }))
    }
  }

  const taskEditHandler = (id: string) => {
    dispatch(updateSelectedTask(id))
  }


  return (
    <div className={style.main_container}>
      <CreateTodo
        selectedTask={selectedTask}
        onTaskCreate={taskCreateHandler}
        onTaskUpdate={taskUpdateHandler}
      />
      <TodoList
        tasks={tasks}
        onTaskDelete={taskDeleteHandler}
        onEditTask={taskEditHandler}
        onTaskUpdate={taskUpdateHandler}
      />
    </div>
  )
}

export default Task