import { configureStore } from '@reduxjs/toolkit'

import  userReducer from './slice/userSlice'
import taskReducer from './slice/taskSlice'


export const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: taskReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch