export interface TeamDataType {
  teamId: number
  teamName: string
  tournamentId: number
  score: number | null
  updatedAt: string | null
  createdAt: string | null
}

export interface MatchDataType {
  id: string
  teamOne: TeamDataType
  teamTwo: TeamDataType
  teamOneResult: string | null
  teamTwoResult: string | null
  startTime: string
  endTime: string
  eventDateId: number
  title: string | null
  type: string
  FE_PlaceholderCard?: boolean
}
export interface ScheduleDataType {
  eventDateId: number
  startTime: string
  endTime: string
  date: string
  matchs: MatchDataType[]
}
