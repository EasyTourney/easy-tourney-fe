import axios from '../../config/axios-config'
import { ParamApi } from '../../../types/commom'

export async function getAllCategories(param: ParamApi) {
  const res = await axios({
    url: '/category',
    method: 'GET',
    params: param
  })
  return res
}

export async function apiDeleteCategory(id: number) {
  const res = await axios({
    url: `/category/${id}`,
    method: 'DELETE'
  })
  return res
}
