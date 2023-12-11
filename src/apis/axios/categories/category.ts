import axios from '../../config/axios-config'
import { ParamApi } from '../../../types/commom'
import { CategoryName } from '../../../types/category'

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

export async function addCategory(data: CategoryName) {
  const res = await axios({
    url: '/category',
    method: 'POST',
    data
  })
  return res
}

export async function getAllCategory() {
  const res = await axios({
    url: '/category/all',
    method: 'GET'
  })
  return res
}
