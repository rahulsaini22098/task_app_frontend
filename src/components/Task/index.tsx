import React, { useEffect, useState } from "react";
import axios from "../../utilities/axios";
import style from './style.module.css'
import CreateTodo from "./CreateTodo";
import TodoList from "./TodoList";
import { FormValues, InitialState, TaskType } from "./types";

const initialState = {
    tasks: [],
    taskListLoader: true,
    selectedTask: null,
}

const Task = () => {
    const [state, setState] = useState<InitialState>(initialState)

    useEffect(() => {
        axios.get<TaskType[]>('/')
            .then((res: { data: TaskType[] }) => {
                if (res !== null) {
                    setState({ ...state, tasks: res.data, taskListLoader: false })
                }
            })
            .catch((err: any) => {
                console.log(err)
                setState({ ...state, taskListLoader: false })
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const taskCreateHandler = (value: FormValues, cb: Function) => {
        axios.post('create', value)
            .then((res: { data: any; }) => {
                const tasks = [...state.tasks, res.data]
                setState({ ...state, tasks: tasks })
                cb()
            })
            .catch((err: any) => {
                console.log(err)
            })
    }

    const taskUpdateHandler = (id: string, values: FormValues, cb: Function) => {
        axios.post(`update/${id}`, values)
            .then((res: any) => {
                const filterTask: TaskType[] = state.tasks.filter(task => task.id !== id)

                if(state.selectedTask !== null){
                    const updateTask: TaskType = { ...state.selectedTask, ...values }
                    filterTask.push(updateTask)
                    setState({ ...state, tasks: filterTask, selectedTask: null })
                    cb()
                }
            })
            .catch((err: any) => {
                console.log(err)
            })


    }

    const taskDeleteHandler = (taskId: string) => {
        axios.delete(`${taskId}`)
            .then((res: any) => {
                const filterTasks = state.tasks.filter(task => task.id !== taskId)
                setState({ ...state, tasks: filterTasks })
            })
            .catch((err: any) => {
                console.log(err);
            })
    }

    const taskEditHandler = (id: string) => {
        const task = state.tasks.find(task => task.id === id)
        if(task !== undefined){
            setState({ ...state, selectedTask: task })
        }
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