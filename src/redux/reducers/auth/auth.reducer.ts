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
    }
  }
})

export const { logout } = authSlice.actions

export default authSlice.reducer
