import { LoadingOutlined } from '@ant-design/icons'
import axios from 'axios'
import { NodeElement } from 'rc-tree/lib/interface'
import React, { useCallback, useEffect, useRef, useState } from 'react'

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

interface IntersectionOptions{
    root: any,
    rootMargin: string,
    threshold: number
}

const initialState: Fetch = {
  todos: [],
  total: 0,
}

const InfiniteScroll = () =>{
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [loading, setLoading] = useState(false)
  const [skipCount, setSkipCount] = useState<number>(0)
  const [state, setState] = useState<Fetch>(initialState)

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const response = await axios.get<Fetch>(`https://dummyjson.com/todos/?limit=20&skip=${skipCount}`)
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
    (async () => {
      await fetchTasks()
    })()
  }, [skipCount])

  const observer = useRef<IntersectionObserver>()

  const lastElementRef = useCallback((node: HTMLDivElement) =>{
    
    if(loading) return

    if(observer.current) observer.current.disconnect()

    const options: IntersectionOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    }

    observer.current = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting && hasMore){
        setSkipCount(prev => prev + 20)      
      }
    }, options)

    if(node) observer.current.observe(node)
  }, [loading, hasMore])


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

  useEffect(() => {
    fetchTasks()
  }, [])


  return(
    <div className={style.main_container}>
      <ul className={style.task_list}>
        {tasks}
        { loading && <LoadingOutlined />}
      </ul>
    </div>
  )
}

export default InfiniteScroll