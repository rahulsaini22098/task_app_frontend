import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from '../../utilities/axios'

import { FormValues, TaskInitialState, TaskType } from './../../components/Task/types'

const initialState: TaskInitialState = {
  tasks: [],
  selectedTask: null,
  taskListLoader: false
}


const getAllTasks = createAsyncThunk(
  'task/getAllUSer',
  async (state, action) => {
    try {
      const tasks = await axios.get<TaskType[]>('/')

      return tasks
    } catch (error) {
      
      return action.rejectWithValue(error)
    }
    
  }
)

const createTask = createAsyncThunk(
  'task/createTask',
  async (values, action) => {
    try {
      const task = await axios.post<TaskType>('create', values)

      return task
    } catch (error) {
      return action.rejectWithValue(error)
    }
  }
)

const updatedTask = createAsyncThunk(
  'task/update',
  async (payload: {id: string, values: FormValues }, action) => {
    try {
      const { id, values } = payload
      const res = await axios.post(`update/${id}`, values)

      return res
    } catch (error) {
      return action.rejectWithValue(error)
    }
  }
)

const deleteTask = createAsyncThunk(
  'task/delete',
  async(taskId: string, action) => {
    try {
      await axios.delete(`${taskId}`)
      
      return { taskId }
    } catch (error) {
      return action.rejectWithValue(error)
    }
  }
)

export const taskSlice = createSlice({
  name: 'task',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => { 
    builder
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.taskListLoader = false,
        state.tasks = action.payload.data
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.taskListLoader = false
        console.log(action.error)  
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload.data)
      })
      .addCase(createTask.rejected, (state, action) => {
        console.log(action.error)
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload.taskId)
      })
      .addCase(deleteTask.rejected, (state, action) => {
        console.log(action.error)
      })
  }
})

// export const {} = taskSlice.actions

export default taskSlice.reducer

