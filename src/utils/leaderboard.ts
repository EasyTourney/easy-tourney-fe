import { LeaderboardRecord } from '../types/leaderboard'

export const convertLeaderboardRecord = (original: LeaderboardRecord): LeaderboardRecord => {
  for (const team of original.leaderBoard) {
    if (team.score === null) {
      team.score = 0
    }
    if (team.theDifference === null) {
      team.theDifference = 0
    }
    if (team.totalResult === null) {
      team.totalResult = 0
    }
    team.negativeResult = team.totalResult - team.theDifference
    const matchList = []
    for (const match of original.matches) {
      if ((match.teamOneId === team.teamId || match.teamTwoId === team.teamId) && match.teamWinId !== -1) {
        matchList.push(match)
      }
    }
    team.playedMatch = matchList.length
    if (matchList.length < 5) {
      while (matchList.length < 5) {
        matchList.push({
          matchId: -1,
          teamOneId: -1,
          teamOneName: '',
          teamTwoId: -1,
          teamTwoName: '',
          teamOneResult: -1,
          teamTwoResult: -1,
          date: '',
          startTime: '',
          endTime: '',
          teamWinId: -1
        })
      }
    } else if (matchList.length > 5) {
      matchList.splice(5)
    }
    console.log(matchList)
    team.last5 = matchList
  }

  return {
    leaderBoard: original.leaderBoard,
    matches: original.matches
  }
}
