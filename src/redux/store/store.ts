import { configureStore } from '@reduxjs/toolkit'
import { authSlice, categoriesSlice, organizersSlice, participantsSlice } from '../reducers'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categoriesSlice,
    organizer: organizersSlice,
    participant: participantsSlice
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
