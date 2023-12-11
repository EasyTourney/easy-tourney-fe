import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../reducers'
import { categoriesSlice } from '../reducers/categories'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    category : categoriesSlice
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
