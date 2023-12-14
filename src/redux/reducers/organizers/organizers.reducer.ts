import { createSlice } from '@reduxjs/toolkit'
import { CategoryName } from '../../../types/category'
import { Organizer } from '../../../types/organizer'

interface UserState {
  organizers: Organizer[]
  isLoading: boolean
  listOrganizer: CategoryName[]
}

const initialState: UserState = {
  organizers: [],
  isLoading: false,
  listOrganizer: []
}

const organizersSlice = createSlice({
  name: 'organizers',
  initialState: initialState,
  reducers: {
    setOrganizer: (state, action) => {
      state.organizers = [...action.payload]
    }
  }
})

export const { setOrganizer } = organizersSlice.actions

export default organizersSlice.reducer
