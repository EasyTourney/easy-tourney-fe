import { createSlice } from '@reduxjs/toolkit'
import { PlayerRecord } from '../../../types/player'

interface PlayerState {
  players: PlayerRecord[]
  isLoading: boolean
  selectedTeamId: number
}

const initialState: PlayerState = {
  players: [],
  isLoading: false,
  selectedTeamId: -1
}

const playersSlice = createSlice({
  name: 'players',
  initialState: initialState,
  reducers: {
    setPlayers: (state, action) => {
      state.players = [...action.payload]
    },
    setSelectedTeamId: (state, action) => {
      state.selectedTeamId = action.payload
    }
  }
})

export const { setPlayers, setSelectedTeamId } = playersSlice.actions

export default playersSlice.reducer
