import { TournamentsEdit } from '../../../types/tournament'
import axios from '../../config/axios-config'

export async function editGeneralTournament(id: number, data: Partial<TournamentsEdit>) {
  const res = await axios({
    url: `/tournament/${id}/detail`,
    method: 'PUT',
    data: data
  })
  return res
}
