import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


interface Tasks {
    id: number,
    todo: string,
    completed: string,
    userId: number  
  }

interface RequestTypes{
  todos: Tasks[],
  total: number,
}
  
interface InfiniteScrollState extends RequestTypes{
    hasMore: boolean,
    loading: boolean
}

const initialState: InfiniteScrollState = {
  todos: [],
  total: 0,
  hasMore: true,
  loading: false
}

interface FetchTaskPayload {
  skipCount: number,
  controller: AbortController
}

export const fetchTask = createAsyncThunk(
  'infiniteScroll/fetchTask',
  async (payload: FetchTaskPayload, action) => {
    try {
      const res = await axios.get<RequestTypes>(`https://dummyjson.com/todos/?limit=20&skip=${payload.skipCount}`, {
        signal: payload.controller.signal
      })

      return res.data
    } catch (error) {
      return action.rejectWithValue(error)
    }
  }
)
  
export const infinitScrollSlice = createSlice({
  name: 'infiniteScroll',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => { 
    builder
      .addCase(fetchTask.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        const { todos, total } = action.payload

        state.todos.push(...todos)
        state.total = total

        if(todos.length == 0){
          state.hasMore = false
        }

        state.loading = false

      })
      .addCase(fetchTask.rejected, (_, action) => {
        console.log(action.error)  
      })
  }
})

export default infinitScrollSlice.reducer