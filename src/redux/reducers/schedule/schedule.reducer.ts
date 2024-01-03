import { createSlice } from '@reduxjs/toolkit'
import { PlanInformation } from '../../../types/plan'

interface ScheduleState {
  planInformation: PlanInformation
  totalTeams: number
}

const initialState: ScheduleState = {
  planInformation: {
    duration: 0,
    betweenTime: 0,
    startTime: '',
    endTime: ''
  },
  totalTeams: 0
}

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: initialState,
  reducers: {
    setPlanInformation: (state, action) => {
      state.planInformation = action.payload
    },
    setTotalTeams: (state, action) => {
      state.totalTeams = action.payload
    }
  }
})

export const { setPlanInformation, setTotalTeams } = scheduleSlice.actions

export default scheduleSlice.reducer
