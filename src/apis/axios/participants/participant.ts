import axios from '../../config/axios-config'
import { ParamApi } from '../../../types/commom'

export async function getAllParticipant(param: ParamApi, tournamentId: number) {
  const res = await axios({
    url: '/tournament/' + tournamentId + '/team',
    method: 'GET',
    params: param
  })
  return res
}
