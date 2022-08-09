import React, { useEffect, useState } from "react";
import axios from "../../utilities/axios";
import style from './style.module.css'
import CreateTodo from "./CreateTodo";
import TodoList from "./TodoList";


const initialState = {
    tasks: [],
    taskListLoader: true,
    selectedTask: {},
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

    const taskCreateHandler = (value, cb) => {
        axios.post('create', value)
            .then(res => {
                const tasks = [...state.tasks, res.data]
                setState({ ...state, tasks: tasks })
                cb()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const taskUpdateHandler = (id, values, cb) => {
        axios.post(`update/${id}`, values)
            .then(res => {
                console.log(res)
                const filterTask = state.tasks.filter(task => task.id !== id)
                const updateTask = { ...state.selectedTask, ...values }
                filterTask.push(updateTask)
                setState({ ...state, tasks: filterTask, selectedTask: {} })
                cb()
            })
            .catch(err => {
                console.log(err)
            })


    }

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

    const taskEditHandler = (id) => {
        const task = state.tasks.find(task => task.id === id)
        setState({ ...state, selectedTask: task })
    }


    return (
        <div className={style.main_container}>
            <CreateTodo
                selectedTask={state.selectedTask}
                onTaskCreate={taskCreateHandler}
                onTaskUpdate={taskUpdateHandler}
            />
            <TodoList
                tasks={state.tasks}
                onTaskDelete={taskDeleteHandler}
                onEditTask={taskEditHandler}
            />
        </div>
    )
}

export default Task