import { LoadingOutlined } from '@ant-design/icons'
import axios, { CancelToken } from 'axios'
import React, { useEffect, useState } from 'react'

import useInfiniteScroll from '../../customHooks/useInfiniteScroll'

import style from './style.module.css'

interface Tasks {
  id: number,
  todo: string,
  completed: string,
  userId: number  
}

interface Fetch{
  todos: Tasks[],
  total: number,
}

const initialState: Fetch = {
  todos: [],
  total: 0,
}

const InfiniteScroll = () => {
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [loading, setLoading] = useState(false)
  const [skipCount, setSkipCount] = useState<number>(0)
  const [state, setState] = useState<Fetch>(initialState)
  const { lastElementRef } = useInfiniteScroll(hasMore, loading,  () => setSkipCount(prev => prev + 20))

  const fetchTasks = async (controller: AbortController) => {
    try {
      setLoading(true)
      const response = await axios.get<Fetch>(`https://dummyjson.com/todos/?limit=20&skip=${skipCount}`, {
        signal: controller.signal
      })
      const newtasks = [...state.todos, ...response.data.todos]
      const total = response.data.total
      setState({ 
        ...state,
        todos: newtasks,
        total: total,
      }) 
      
      if(response.data.todos.length === 0){
        setHasMore(false)
      }

      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() =>{
    const controller = new AbortController();

    (async () => {
      await fetchTasks(controller)
    })()

    return () => {
      controller.abort()
    }
  }, [skipCount])


  const tasks = state.todos.map((task, index) => {
    if(index === state.todos.length -1){
      return (
        <li 
          className={style.list_item} 
          key={task.id}
          ref={lastElementRef}
        >
          <div className={style.group_item}>
            <div className={style.task_description}>
              <div className={style.task_name}>{task.id}</div>
              <div className={style.task_description}>{task.todo}</div>
            </div>
          </div>
        </li>
      )
    }

    return( 
      <li className={style.list_item} key={task.id}>
        <div className={style.group_item}>
          <div className={style.task_description}>
            <div className={style.task_name}>{task.id}</div>
            <div className={style.task_description}>{task.todo}</div>
          </div>
        </div>
      </li>
    )})

  return (
    <div className={style.main_container}>
      <ul className={style.task_list}>
        {tasks}
        { loading && <LoadingOutlined className={style.loader} />}
      </ul>
    </div>
  )
}

export default InfiniteScroll