import React from "react";
import {
    FaEdit,
    FaCheck,
    FaTrash,
    FaChevronDown
} from 'react-icons/fa'

import style from './style.module.css'

const TodoList = ({
    tasks,
    onTaskDelete,
    onEditTask
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
                        <FaEdit onClick={() => onEditTask(task.id)} />
                        <FaCheck className={style.success} />
                        <FaTrash
                            className={style.danger}
                            onClick={() => onTaskDelete(task.id)}
                        />
                    </div>
                </div>
                <FaChevronDown className={style.arrow_expand} />
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