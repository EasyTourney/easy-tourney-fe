import { Leaderboard, LeaderboardRecord } from './../../../types/leaderboard'
import { createSlice } from '@reduxjs/toolkit'

interface LeaderboardState {
  leaderboard: LeaderboardRecord
  tournamentStatus: string
  teamsTop1: Leaderboard[]
  teamsTop2: Leaderboard[]
  teamsTop3: Leaderboard[]
  isLoading: boolean
}

const initialState: LeaderboardState = {
  leaderboard: { leaderBoard: [], matches: [] },
  tournamentStatus: '',
  teamsTop1: [],
  teamsTop2: [],
  teamsTop3: [],
  isLoading: false
}

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: initialState,
  reducers: {
    setTournamentStatus: (state, action) => {
      state.tournamentStatus = action.payload
    },
    setLeaderboard: (state, action) => {
      state.leaderboard = action.payload
      if (
        !(state.tournamentStatus === '') &&
        !(state.tournamentStatus === 'NEED_INFORMATION') &&
        !(state.tournamentStatus === 'READY')
      ) {
        state.teamsTop1 = action.payload.leaderBoard.filter((team: { rank: number }) => team.rank === 1)
        state.teamsTop2 = action.payload.leaderBoard.filter((team: { rank: number }) => team.rank === 2)
        state.teamsTop3 = action.payload.leaderBoard.filter((team: { rank: number }) => team.rank === 3)
      } else {
        state.teamsTop1 = []
        state.teamsTop2 = []
        state.teamsTop3 = []
      }
    }
  }
})

export const { setTournamentStatus, setLeaderboard } = leaderboardSlice.actions

export default leaderboardSlice.reducer
