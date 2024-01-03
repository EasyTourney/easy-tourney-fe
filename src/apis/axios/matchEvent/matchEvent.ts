import { MatchEvent } from '../../../types/event'
import axios from '../../config/axios-config'

export async function addEvent(tournamentId: number, data: MatchEvent, eventDateId: number) {
  const res = await axios({
    url: `/tournament/${tournamentId}/event/` + eventDateId,
    method: 'POST',
    data
  })
  return res
}
