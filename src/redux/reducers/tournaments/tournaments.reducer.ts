import { createSlice } from '@reduxjs/toolkit'
import { TournamentRecord } from '../../../types/tournament'

interface TournamentState {
  tournaments: TournamentRecord[]
  isLoading: boolean
}

const initialState: TournamentState = {
  tournaments: [],
  isLoading: false
}

const tournamentsSlice = createSlice({
  name: 'tournaments',
  initialState: initialState,
  reducers: {
    setTournaments: (state, action) => {
      state.tournaments = [...action.payload]
    }
  }
})

export const { setTournaments } = tournamentsSlice.actions

export default tournamentsSlice.reducer
