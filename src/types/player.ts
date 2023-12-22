export interface Player {
  playerId: number
  playerName: string
  teamId: number
  dateOfBirth?: string
  phone?: string
  createdAt?: string
  updatedAt?: string
}

export interface PlayerRecord {
  playerId: string
  playerName: string
  dateOfBirth?: string
  phone?: string
}
