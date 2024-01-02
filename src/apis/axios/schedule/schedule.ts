import { DragDropData } from '../../../types/schedule.type'
import axios from '../../config/axios-config'

export async function getAllSheduleMatches(id: number) {
  const res = await axios({
    url: `/generate/${id}`,
    method: 'GET'
  })
  return res
}

export async function dragDropApi(id: number, data: DragDropData) {
  const res = await axios({
    url: `/tournament/${id}/match/dragAndDrop`,
    method: 'PUT',
    data
  })
  return res
}
