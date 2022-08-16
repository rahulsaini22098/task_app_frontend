import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import axios from '../../utilities/axios'

import { FormValues, TaskInitialState, TaskType } from './../../components/Task/types'

interface CreateTaskPayload {
  token: string,
  values: FormValues
}
interface UpdatedTaskPayload {
  id: string,
  values: FormValues,
  token: string
}
interface DeleteTaskPayload {
  taskId: string,
  token: string
}

const initialState: TaskInitialState = {
  tasks: [],
  selectedTask: null,
  taskListLoader: false
}

export const getAllTasks = createAsyncThunk(
  'task/getAllUSer',
  async (payload: string, action) => {
    try {
      const res = await axios.get<TaskType[]>('/', {
        headers: {
          'authorization': `Bearer ${payload}`
        }
      })

      return res.data
    } catch (error) {
      return action.rejectWithValue(error)
    }
    
  }
)

export const createTask = createAsyncThunk(
  'task/createTask',
  async (payload: CreateTaskPayload, action) => {
    try {
      const res = await axios.post<TaskType>('/create', payload.values, {
        headers: {
          'authorization': `Bearer ${payload.token}`
        }
      })

      return res.data
    } catch (error) {
      return action.rejectWithValue(error)
    }
  }
)

export const updatedTask = createAsyncThunk(
  'task/update',
  async (payload: UpdatedTaskPayload, action) => {
    try {
      const { id, values, token } = payload
      const res = await axios.post(`update/${id}`, values, {
        headers: {
          'authorization': `Bearer ${token}`
        }
      })

      return payload
    } catch (error) {
      return action.rejectWithValue(error)
    }
  }
)


export const deleteTask = createAsyncThunk(
  'task/delete',
  async(payload: DeleteTaskPayload, action) => {
    try {
      await axios.delete(`${payload.taskId}`, {
        headers: {
          'authorization': `Bearer ${payload.token}`
        }
      })
      
      return { taskId: payload.taskId }
    } catch (error) {
      return action.rejectWithValue(error)
    }
  }
)

export const taskSlice = createSlice({
  name: 'task',
  initialState: initialState,
  reducers: {
    updateSelectedTask: (state, action: PayloadAction<string>) => {

      const task = state.tasks.find(task => task.id == action.payload)

      if(task !== undefined){
        state.selectedTask = task
      }
    }
  },
  extraReducers: (builder) => { 
    builder
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.taskListLoader = false,
        state.tasks = action.payload
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.taskListLoader = false
        console.log(action.error)  
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload)
      })
      .addCase(createTask.rejected, (_, action) => {
        console.log(action.error)
      })
      .addCase(updatedTask.fulfilled, (state, action) => {
        const filterTask = state.tasks.filter(task => task.id !== action.payload.id)

        if(state.selectedTask !== null){
          const updateTask: TaskType = { ...state.selectedTask, ...action.payload.values }
          filterTask.push(updateTask)
        }
        state.tasks = filterTask
        state.selectedTask = null
      })
      .addCase(updatedTask.rejected, (_, action) => {
        console.log(action.error)
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload.taskId)
      })
      .addCase(deleteTask.rejected, (_, action) => {
        console.log(action.error)
      })
  }
})

export const updateSelectedTask = taskSlice.actions.updateSelectedTask

export default taskSlice.reducer

