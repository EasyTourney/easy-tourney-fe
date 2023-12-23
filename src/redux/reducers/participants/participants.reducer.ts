import { createSlice } from '@reduxjs/toolkit'
import { Participant } from '../../../types/participant'

interface ParticipantState {
  participants: Participant[]
  isLoading: boolean
  selectedParticipant: Participant | null
}

const initialState: ParticipantState = {
  participants: [],
  isLoading: false,
  selectedParticipant: null
}

const participantsSlice = createSlice({
  name: 'participants',
  initialState: initialState,
  reducers: {
    setParticipants: (state, action) => {
      state.participants = [...action.payload]
    },
    setSelectedParticipant: (state, action) => {
      state.selectedParticipant = action.payload
    },
    updateParticipants: (state, action) => {
      const updatedParticipant = action.payload
      const index = state.participants.findIndex((participant) => participant.teamId === updatedParticipant.teamId)
      if (index !== -1) {
        state.participants[index].teamName = updatedParticipant.teamName
      }
    }
  }
})

export const { setParticipants, setSelectedParticipant, updateParticipants } = participantsSlice.actions

export default participantsSlice.reducer
