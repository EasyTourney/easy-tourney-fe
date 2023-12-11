import { createSlice } from '@reduxjs/toolkit'
import { Categories, CategoryName } from '../../../types/category'
import { getCategories } from './categories.slice'

interface UserState {
  categories: Categories[]
  isLoading: boolean
  listCategory: CategoryName[]
}

const initialState: UserState = {
  categories: [],
  isLoading: false,
  listCategory: []
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = [...action.payload]
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.isLoading = false
      state.listCategory = action.payload as unknown as CategoryName[]
    })

    builder.addCase(getCategories.rejected, (state, action) => {
      state.isLoading = false
      state.listCategory = []
    })
  }
})

export const { setCategories } = categoriesSlice.actions

export default categoriesSlice.reducer
