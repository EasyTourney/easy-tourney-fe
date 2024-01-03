import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import styles from './Result.module.css'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllResult } from '../../apis/axios/tournaments/result'
import { Tooltip } from '@mui/material'
import { setResult, setSelectedGoal } from '../../redux/reducers/result/result.reducer'
import { DialogEditScore } from '../../components/Dialog/Result/DialogEditScore'
import moment from 'moment'
import { getTournamentById } from '../../apis/axios/tournaments/tournament'
import { setGeneral } from '../../redux/reducers/tournaments/tournaments.reducer'
import { useParams } from 'react-router-dom'
import noresult from '../../assets/no.png'

const Result = () => {
  const dispatch = useDispatch()
  const param: { tournamentId?: string } = useParams()
  const pathSegments = location.pathname.split('/').filter((segment) => segment !== '')
  const result = useSelector((state: any) => state.result.resultMatch)
  const [openScore, setOpenScore] = useState(false)
  const general = useSelector((state: any) => state.tournament.general)
  const isDiscarded = general.status === 'DISCARDED'

  const handleEditScore = (match: any) => {
    setOpenScore(true)
    dispatch(setSelectedGoal(match))
  }
  const isMatchNotPlayed = (date: any) => {
    const matchDate = moment(date).toDate()
    const currentDate = new Date()

    return matchDate > currentDate
  }

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const tournamentId = Number(pathSegments[1])
        const result = await getAllResult(tournamentId)
        const sortedResult = result.data.map((day: any) => ({
          ...day,
          matches: day.matches.sort((a: any, b: any) => {
            const timeA: any = moment(`${day.date} ${a.startTime}`)
            const timeB: any = moment(`${day.date} ${b.startTime}`)
            return timeA.toDate() - timeB.toDate()
          })
        }))

        sortedResult.sort((a: any, b: any) => {
          const dateA: any = moment(a.date)
          const dateB: any = moment(b.date)
          return dateA.toDate() - dateB.toDate()
        })
        dispatch(setResult(result.data))
      } catch (error) {
        console.error(error)
      }
    }
    fetchResult()
  }, [])

  useEffect(() => {
    const fetchTournamentData = async () => {
      const response = await getTournamentById(Number(param.tournamentId))
      dispatch(setGeneral(response.data))
    }

    if (param.tournamentId) {
      fetchTournamentData()
    }
  }, [param.tournamentId])

  return (
    <Box className={styles['result-container']}>
      <Box className={styles['result-wrapper']}>
        <Box className={styles['result-info']}>Result</Box>
        <Box className={styles['result-container']}>
          <Box className={styles['result-content']}>
            {result?.length > 0 ? (
              result.map((day: any, index: any) => (
                <Box id="content" key={index} className={styles['result-item']}>
                  <Box className={styles['result-header']}>
                    <Box className={styles['result-date']}>{moment(day.date).format('dddd, MMMM D, YYYY')}</Box>
                  </Box>
                  {day?.matches?.map((match: any, matchIndex: any) => (
                    <Box
                      key={matchIndex}
                      className={`${styles['result-match']} ${matchIndex === 1 ? styles['special-background'] : ''}`}
                    >
                      <Box className={styles['result-time']}>
                        <time>{moment(match.startTime, 'HH:mm:ss').format('HH:mm')}</time>
                        <time>{moment(match.endTime, 'HH:mm:ss').format('HH:mm')}</time>
                      </Box>
                      <Box className={styles['match']}>
                        <Box className={styles['team-left']}>{match.teamOneName}</Box>
                        <Tooltip title={isMatchNotPlayed(day.date) || isDiscarded ? '' : 'Edit score'} placement="top">
                          <Box
                            onClick={() => {
                              if (!isMatchNotPlayed(day.date) && !isDiscarded) {
                                handleEditScore(match)
                              }
                            }}
                            className={`${styles['score']} ${
                              isMatchNotPlayed(day.date) || isDiscarded ? styles['not-played'] : ''
                            }`}
                          >
                            <span className={styles.scoreA}>{match.teamOneResult}</span>-
                            <span className={styles.scoreB}>{match.teamTwoResult}</span>
                          </Box>
                        </Tooltip>
                        <Box className={styles['team-right']}>{match.teamTwoName}</Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              ))
            ) : (
              <Box className={styles['no-match-message']}>
                <img width="200px" height="200px" src={noresult} alt="" />
                <Box sx={{ margin: '10px 0' }}>
                  There are no match results. Please create a match schedule in advance.
                </Box>
              </Box>
            )}
          </Box>
        </Box>
        <DialogEditScore open={openScore} setOpen={setOpenScore} />
      </Box>
    </Box>
  )
}

export default Result
