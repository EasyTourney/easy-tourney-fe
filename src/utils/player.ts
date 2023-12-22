import { Player, PlayerRecord } from '../types/player'

export const convertPlayer = (original: Player): PlayerRecord => {
  return {
    playerId: original.playerId.toString(),
    playerName: original.playerName,
    dateOfBirth: original.dateOfBirth ? original.dateOfBirth : '',
    phone: original.phone ? original.phone : ''
  }
}
