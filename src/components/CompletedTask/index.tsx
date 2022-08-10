import React, { useEffect, useState } from 'react'

import axios from '../../utilities/axios'
import { getUser } from '../../utilities/helperfunction'
import { TaskType } from '../Task/types'

import style from './style.module.css'

const CompleteTask = () => {
  const { token } = getUser()
  const [completedTasks, setCompletedTasks] = useState<TaskType[]>([])
  axios.defaults.headers.common['authorization'] = `Bearer ${token}`

  
  useEffect(() => {
    (async () => {
      try {
        const task = await axios.get<TaskType[]>('/task/completed')
        setCompletedTasks(task.data)       
      } catch (error) { 
        console.log(error)   
      }
    })()
  }, [])

  const tasks = completedTasks.map(task => (
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
    <ul className={style.task_list}>{tasks}</ul>
  )
}

export default CompleteTask