import { configureStore } from '@reduxjs/toolkit'

import userReducer from './slice/userSlice'
import taskReducer from './slice/taskSlice'
import infinitScrollSlice from './slice/infiniteScroll'


export const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: taskReducer,
    infinitScroll: infinitScrollSlice
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch