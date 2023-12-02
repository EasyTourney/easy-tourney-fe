import { AxiosResponse } from 'axios'
import { Categories } from './category'

export interface APIRes extends AxiosResponse {
  success: boolean
  data: Categories[]
  total: number
  additionalData: {
    totalCategories: number
  }
  message: string
}

export interface ColumnTypes {
  id: string
  sortTable?: boolean
  label: string
  left?: boolean
  sortBy?: string
  style?: {
    filed: string
    width: string
  }
}
