import { LoadingOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'

import useInfiniteScroll from '../../customHooks/useInfiniteScroll'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { fetchTask } from '../../redux/slice/infiniteScroll'

import style from './style.module.css'

const InfiniteScroll = () => {
  const dispatch = useAppDispatch()
  const { todos, hasMore, loading } = useAppSelector((state) => state.infinitScroll)

  const [skipCount, setSkipCount] = useState<number>(0)
  const { lastElementRef } = useInfiniteScroll(hasMore, loading,  () => setSkipCount(prev => prev + 20))

  useEffect(() =>{
    const controller = new AbortController()
    dispatch(fetchTask({ skipCount, controller }))

    return () => { controller.abort() }
  }, [skipCount])


  const tasks = todos.map((task, index) => {
    if(index === todos.length -1){
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