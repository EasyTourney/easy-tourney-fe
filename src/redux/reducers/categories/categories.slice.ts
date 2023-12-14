import { createAsyncThunk } from '@reduxjs/toolkit'
import { APIRes } from '../../../types/commom'
import { getAllCategory } from '../../../apis/axios/categories/category'

export const getCategories = createAsyncThunk('categories/getAll', async (data, { rejectWithValue }) => {
  const response = (await getAllCategory()) as APIRes
  if (!response) rejectWithValue(response)
  return response?.data
})