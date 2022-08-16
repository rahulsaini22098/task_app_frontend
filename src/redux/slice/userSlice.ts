import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import axios from '../../utilities/axios'
import { SignUpTypes } from '../../components/Authentication/SignUp'
import { SignInTypes } from '../../components/Authentication/SignIn'

import { GetUser } from './../../utilities/helperfunction'

const initialState: GetUser = {
  token: null,
  user: null
}

export const signUpUser = createAsyncThunk(
  'user/signup',
  async (values: SignUpTypes, action) => {
    try {
      await axios.post('/user/signup', values)

      return values
    } catch (error) {
      return action.rejectWithValue(error)
    }
  }
)

export const signInUser = createAsyncThunk(
  'user/signIn',
  async (values: SignInTypes, action) => {
    try {
      const res = await axios.post('/user/login', values)

      return res.data
    } catch (error) {
      return action.rejectWithValue(error)
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserLogin: (state, action: PayloadAction<GetUser>) => {
      state.token = action.payload.token,
      state.user = action.payload.user
    },

    userSignOut: (state) => {
      state.token = null
      state.user = null
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.fulfilled, () => {
        console.log('user create')
      })
      .addCase(signUpUser.rejected, (_, action) => {
        console.log(action.error)
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        localStorage.setItem('user', JSON.stringify(action.payload.user))
        localStorage.setItem('token', action.payload.token || null)
        state.token = action.payload.token
        state.user = action.payload.user
      })
      .addCase(signInUser.rejected, (_, action) => {
        console.log(action.error)
      })
  }
})

export const { setUserLogin, userSignOut } = userSlice.actions

export default userSlice.reducer