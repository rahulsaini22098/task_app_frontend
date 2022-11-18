import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import axios from '../../utilities/axios'
import { SignUpTypes } from '../../components/Authentication/SignUp'
import { SignInTypes } from '../../components/Authentication/SignIn'

import { GetUser } from './../../utilities/helperfunction'

interface ProfilePicturePayload{
  formData: FormData,
  token: string
}

const initialState: GetUser = {
  token: null,
  user: null
}

const signUpUser = createAsyncThunk(
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

const signInUser = createAsyncThunk(
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

const updateProfilePicture = createAsyncThunk(
  'user/updateProfilePicture',
  async (payload: ProfilePicturePayload, action) => {
    const { formData, token } = payload
  
    try {
      const res = await axios.post('/user/profilepicture/upload', formData, {
        headers: {
          'content-type': 'multipart/form-data',
          'authorization': `Bearer ${token}`
        }
      })

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
      .addCase(updateProfilePicture.fulfilled, (state, action) => {
        if(state.user !== null){
          state.user['profile_picture'] = action.payload.profile_picture
          localStorage.setItem('user', JSON.stringify(state.user))
        }
      })
      .addCase(updateProfilePicture.rejected, (_, action) => {
        console.log(action.error)
      })
  }
})

const { setUserLogin, userSignOut } = userSlice.actions

export {
  signUpUser, 
  signInUser, 
  updateProfilePicture,
  setUserLogin, 
  userSignOut 
}

export default userSlice.reducer