import React from 'react'
import { CheckOutlined, DeleteFilled, EditOutlined } from '@ant-design/icons'

import { TodoListInterface } from '../types'

import style from './style.module.css'

const TodoList: React.FC<TodoListInterface> = ({
  tasks,
  onTaskDelete,
  onEditTask,
  onTaskUpdate
}) => {

  const tasksList = tasks.map((task) => {
    return (
      <li className={style.list_item} key={task.id}>
        <div className={style.group_item}>
          <div className={style.task_description}>
            <div className={style.task_name}>{task.taskname}</div>
            <div className={style.task_description}>{task.taskDescription}</div>
          </div>

          <div className={style.task_operations}>
            <EditOutlined onClick={() => onEditTask(task.id)} />
            <CheckOutlined className={style.success} onClick={() => onTaskUpdate(task.id, { isDone: true })} />
            <DeleteFilled className={style.danger} onClick={() => onTaskDelete(task.id)} />
          </div>
        </div>
        {/* <FaChevronDown className={style.arrow_expand} /> */}
      </li>
    )
  })

  return (
    <React.Fragment>
      <ul className={style.task_list}>{tasksList}</ul>
    </React.Fragment>
  )
}

export default TodoList