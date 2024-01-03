import { configureStore } from '@reduxjs/toolkit'
import {
  authSlice,
  categoriesSlice,
  organizersSlice,
  tournamentsSlice,
  playersSlice,
  teamsSlice,
  generalSlice,
  resultsSlice,
  scheduleSlice
} from '../reducers'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categoriesSlice,
    organizer: organizersSlice,
    tournament: tournamentsSlice,
    player: playersSlice,
    team: teamsSlice,
    general: generalSlice,
    result: resultsSlice,
    schedule: scheduleSlice
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
