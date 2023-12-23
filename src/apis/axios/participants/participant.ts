import axios from '../../config/axios-config'
import { ParamApi } from '../../../types/commom'
import { Participant } from '../../../types/participant'

export async function getAllParticipant(param: ParamApi, tournamentId: number) {
  const res = await axios({
    url: '/tournament/' + tournamentId + '/team',
    method: 'GET',
    params: param
  })
  return res
}

export async function deleteParticipant(id: number, tournamentId: number) {
  const res = await axios({
    url: '/tournament/' + tournamentId + `/team/${id}`,
    method: 'DELETE'
  })
  return res
}

export async function addParticipant(data: Participant, tournamentId: number) {
  const res = await axios({
    url: '/tournament/' + tournamentId + '/team',
    method: 'POST',
    data
  })
  return res
}

export async function getParticipantById(id: number, tournamentId: number) {
  const res = await axios({
    url: '/tournament/' + tournamentId + `/team/${id}`,
    method: 'GET'
  })
  return res
}

export async function putParticipantById(data: Participant, tournamentId: number) {
  const res = await axios({
    url: '/tournament/' + tournamentId + `/team/${data.teamId}`,
    method: 'PUT',
    data: data
  })
  return res
}
