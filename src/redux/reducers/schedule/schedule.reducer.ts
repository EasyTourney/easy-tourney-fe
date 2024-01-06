import { createSlice } from '@reduxjs/toolkit'
import { PlanInformation } from '../../../types/plan'
import { MatchDataDuplicate, TimeNotEnough } from '../../../types/schedule.type'

interface ScheduleState {
  planInformation: PlanInformation
  totalTeams: number
  duplicateMatch: MatchDataDuplicate[] | []
  timeNotEnoughdata: TimeNotEnough
}

const initialState: ScheduleState = {
  planInformation: {
    duration: 0,
    betweenTime: 0,
    startTime: '',
    endTime: ''
  },
  duplicateMatch: [],
  totalTeams: 0,
  timeNotEnoughdata: {
    warningMessage: '',
    eventDateId: []
  }
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
    },
    setDuplicateMatch: (state, action) => {
      state.duplicateMatch = action.payload
    },
    setTimeNotEnough: (state, action) => {
      state.timeNotEnoughdata = action.payload
    }
  }
})

export const { setPlanInformation, setTotalTeams, setDuplicateMatch, setTimeNotEnough } = scheduleSlice.actions

export default scheduleSlice.reducer
