import React, { useEffect, useState } from "react";
import axios from "../../utilities/axios";
import style from './style.module.css'
import CreateTodo from "./CreateTodo";
import TodoList from "./TodoList";


const initialState = {
    tasks: [],
    taskListLoader: true
}

const Task = () => {

    const [state, setState] = useState(initialState)

    useEffect(() => {
        axios.get('/')
            .then(res => {
                console.log(res)
                if (res !== null) {
                    setState({ ...state, tasks: res.data, taskListLoader: false })
                }
            })
            .catch(err => {
                console.log(err)
                setState({ ...state, taskListLoader: false })
            })
    }, [])

    const taskCreateHandler = (value) => {
        axios.post('create', value)
            .then(res => {
                const tasks = [...state.tasks, res.data]
                setState({ ...setState, tasks: tasks })

            })
            .catch(err => {
                console.log(err)
            })
    }

    const taskUpdateHandler = () => { }

    const taskDeleteHandler = (taskId) => {
        axios.delete(`${taskId}`)
            .then(res => {
                const filterTasks = state.tasks.filter(task => task.id !== taskId)
                setState({ ...state, tasks: filterTasks })
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <div className={style.main_container}>
            <CreateTodo onTaskCreate={taskCreateHandler} />
            <TodoList
                tasks={state.tasks}
                onTaskUpdate={taskUpdateHandler}
                onTaskDelete={taskDeleteHandler}
            />
        </div>
    )
}

export default Task