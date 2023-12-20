import axios from '../../config/axios-config'
import { ParamApi } from '../../../types/commom'

export async function getAllTournaments(param: ParamApi) {
  const res = await axios({
    url: '/tournament',
    method: 'GET',
    params: param
  })
  return res
}
