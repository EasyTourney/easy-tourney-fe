export interface LeaderboardRecord {
  leaderBoard: Leaderboard[]
  matches: MatchForLeaderboard[]
}
export interface Leaderboard {
  teamId: number
  teamName: string
  score: number
  playedMatch: number
  negativeResult: number
  totalResult: number
  theDifference: number
  rank: number
  last5: MatchForLeaderboard[]
}
export interface MatchForLeaderboard {
  matchId: number
  teamOneId: number
  teamOneName: string
  teamTwoId: number
  teamTwoName: string
  teamOneResult?: number
  teamTwoResult?: number
  date?: string
  startTime?: string
  endTime?: string
  teamWinId: number
}
