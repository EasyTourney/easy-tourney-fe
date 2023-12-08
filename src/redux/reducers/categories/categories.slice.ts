import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAllCategories } from '../../../apis/axios/categories/category'
import { APIRes } from '../../../types/commom'

export const getCategories = createAsyncThunk('user/todoList', async (data, { rejectWithValue }) => {
  //   const response = ( await getAllCategories({...param})) as APIRes
  // if (!response) rejectWithValue(response)
  // return response
})
