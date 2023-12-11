import { createSlice } from '@reduxjs/toolkit'
import { Categories } from '../../../types/category'

interface UserState {
  categories: Categories[]
  isLoading: boolean
}

const initialState: UserState = {
  categories: [],
  isLoading: false
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = [...action.payload]
    }
  }
})

export const { setCategories } = categoriesSlice.actions

export default categoriesSlice.reducer
