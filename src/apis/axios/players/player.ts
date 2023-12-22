import axios from '../../config/axios-config'

export async function getAllPlayersInTeam(tournamentId: number, teamId: number) {
  const res = await axios({
    url: `/tournament/${tournamentId}/team/${teamId}/player`,
    method: 'GET'
  })
  return res
}

export async function deletePlayer(tournamentId: number, teamId: number, playerId: number) {
  const res = await axios({
    url: `/tournament/${tournamentId}/team/${teamId}/player/${playerId}`,
    method: 'DELETE'
  })
  return res
}
