import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { getAllTasks } from '../../redux/slice/taskSlice'
import axios from '../../utilities/axios'


import style from './style.module.css'

const CompleteTask = () => {
  const dispatch = useAppDispatch()
  const { token } = useAppSelector((state) => state.user)
  const { tasks } = useAppSelector((state) => state.tasks)
  axios.defaults.headers.common['authorization'] = `Bearer ${token}`

  
  useEffect(() => {
    if(tasks.length == 0 && token !== null){
      dispatch(getAllTasks(token))
    }
  }, [token])

  const completedTask = tasks.filter(tasks => tasks.isDone)

  const tasksList = completedTask.map(task => (
    <li className={style.list_item} key={task.id}>
      <div className={style.group_item}>
        <div className={style.task_description}>
          <div className={style.task_name}>{task.taskname}</div>
          <div className={style.task_description}>{task.taskDescription}</div>
        </div>
      </div>
    </li>
  ))

  return (
    <ul className={style.task_list}>{tasksList}</ul>
  )
}

export default CompleteTask