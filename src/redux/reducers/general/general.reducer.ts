import { createSlice } from '@reduxjs/toolkit'

interface GeneralState {
  selectedTitle: string
  selectedCategory: string
  selectedDes: string
  selectedOrganizer: []
  selectedEventDate: []
}

const initialState: GeneralState = {
  selectedTitle: '',
  selectedCategory: '',
  selectedDes: '',
  selectedOrganizer: [],
  selectedEventDate: []
}
const generalSlice = createSlice({
  name: 'generals',
  initialState: initialState,
  reducers: {
    setSelectedTitle: (state, action) => {
      state.selectedTitle = action.payload
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload
    },
    setSelectedDescription: (state, action) => {
      state.selectedDes = action.payload
    },
    setSelectedOrganizer: (state, action) => {
      state.selectedOrganizer = action.payload
    },
    setSelectedEventDate: (state, action) => {
      state.selectedEventDate = action.payload
    }
  }
})

export const {
  setSelectedTitle,
  setSelectedCategory,
  setSelectedDescription,
  setSelectedOrganizer,
  setSelectedEventDate
} = generalSlice.actions

export default generalSlice.reducer
