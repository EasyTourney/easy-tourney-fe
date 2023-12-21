import { createSlice } from '@reduxjs/toolkit'
import { Participant } from '../../../types/participant'

interface ParticipantState {
  participants: Participant[]
}

const initialState: ParticipantState = {
  participants: []
}

const participantsSlice = createSlice({
  name: 'participants',
  initialState: initialState,
  reducers: {
    setParticipant: (state, action) => {
      state.participants = [...action.payload]
    }
  }
})

export const { setParticipant } = participantsSlice.actions

export default participantsSlice.reducer
