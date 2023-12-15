import { createSlice } from '@reduxjs/toolkit'
import { Categories, CategoryName } from '../../../types/category'
import { getCategories } from './categories.slice'

interface UserState {
  categories: Categories[]
  isLoading: boolean
  listCategory: CategoryName[]
  seletedCategory: any | null
}

const initialState: UserState = {
  categories: [],
  seletedCategory: null,
  isLoading: false,
  listCategory: []
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload
    },
    setSelectedCategory: (state, action) => {
      state.seletedCategory = action.payload
    },
    updateCategory: (state, action) => {
      const updatedCategory = action.payload
      const index = state.categories.findIndex((category) => category.id === updatedCategory.id)
      if (index !== -1) {
        state.categories[index] = updatedCategory
      }
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

export const { setCategories, setSelectedCategory, updateCategory } = categoriesSlice.actions

export default categoriesSlice.reducer
