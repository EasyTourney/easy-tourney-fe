import { createSlice } from '@reduxjs/toolkit'
import { IUserData } from '../../../types/auth.types'

export type AuthState = {
  isLoggedIn: boolean
  accessToken?: string
  userInfo?: IUserData
}

const initialState: AuthState = {
  isLoggedIn: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    logout: (state: AuthState) => {
      localStorage.removeItem('token')
      state.isLoggedIn = false
      state.accessToken = undefined
      state.userInfo = undefined
    },
    login: (state: AuthState, action) => {
      localStorage.setItem('token', action.payload.token)
      state.isLoggedIn = true
      state.accessToken = action.payload.token
      state.userInfo = action.payload.userInfo
    }
  }
})

export const { logout, login } = authSlice.actions

export default authSlice.reducer
