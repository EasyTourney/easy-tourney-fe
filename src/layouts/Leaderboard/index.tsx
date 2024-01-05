import React, { useRef } from 'react'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Avatar,
  Divider,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material'
import styled from '@emotion/styled'
import { getLeaderboard } from '../../apis/axios/leaderboard/leaderboard'
import { useDispatch, useSelector } from 'react-redux'
import { setLeaderboard, setTournamentStatus } from '../../redux/reducers/leaderboard/leaderboard.reducer'
import { RootState } from '../../redux/store'
import { convertLeaderboardRecord } from '../../utils/leaderboard'
import dayjs from 'dayjs'
import { checkLengthTeam } from '../../utils/function'
import styles from './Leaderboard.module.css'
import noItem from '../../assets/noItem.png'
import trophy1 from '../../assets/trophy1.png'
import trophy2 from '../../assets/trophy2.png'
import trophy3 from '../../assets/trophy3.png'
import { getTournamentById } from '../../apis/axios/tournaments/tournament'
import { setGeneral } from '../../redux/reducers/tournaments/tournaments.reducer'

const Leaderboard = () => {
  const [loading, setIsLoading] = useState<boolean>(false)
  const dispatch = useDispatch()
  const leaderboardData = useSelector((state: RootState) => state.leaderboard.leaderboard)
  const teamsTop1 = useSelector((state: RootState) => state.leaderboard.teamsTop1)
  const teamsTop2 = useSelector((state: RootState) => state.leaderboard.teamsTop2)
  const teamsTop3 = useSelector((state: RootState) => state.leaderboard.teamsTop3)
  const tournament = useSelector((state: RootState) => state.tournament.general)
  const param: { tournamentId?: string } = useParams()
  const isInitialized = useRef(false)

  const columnsLeaderboard = [
    {
      id: 'pos',
      sortTable: false,
      label: 'POS',
      left: false,
      style: {
        filed: 'Position',
        width: '40px'
      }
    },
    {
      id: 'team',
      sortTable: false,
      label: 'TEAM',
      left: true,
      style: {
        filed: 'Team',
        width: '800px'
      }
    },
    {
      id: 'played',
      sortTable: false,
      label: 'MP',
      left: false,
      style: {
        filed: 'Match Played',
        width: '70px'
      }
    },
    {
      id: 'goalsFor',
      sortTable: false,
      label: 'GF',
      left: false,
      style: {
        filed: 'Goals For',
        width: '70px'
      }
    },
    {
      id: 'goalsAgainst',
      sortTable: false,
      label: 'GA',
      left: false,
      style: {
        filed: 'Goals Against',
        width: '70px'
      }
    },
    {
      id: 'goalDifference',
      sortTable: false,
      label: 'GD',
      left: false,
      style: {
        filed: 'Goal Difference',
        width: '70px'
      }
    },
    {
      id: 'point',
      sortTable: false,
      label: 'PTS',
      left: false,
      style: {
        filed: 'Points',
        width: '70px'
      }
    },
    {
      id: 'last5',
      sortTable: false,
      label: 'LAST 5',
      left: false,
      style: {
        filed: 'Last 5 Matches',
        width: '400px'
      }
    }
  ]

  const getAll = async (tournamentId: number) => {
    if (!isInitialized.current) {
      dispatch(setTournamentStatus(tournament.status))
      const leaderboardResponse = await getLeaderboard(tournamentId)

      if (leaderboardResponse.data) {
        const convertedData = convertLeaderboardRecord(leaderboardResponse.data)
        dispatch(setLeaderboard(convertedData))
        setIsLoading(true)
      } else {
        dispatch(setLeaderboard({ leaderBoard: [], matches: [] }))
      }

      isInitialized.current = true
    }
  }

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      getAll(Number(param.tournamentId))
      const response = await getTournamentById(Number(param.tournamentId))
      dispatch(setGeneral(response.data))
    }
    if (param.tournamentId) {
      fetchLeaderboardData()
    }
  }, [param.tournamentId])

  const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(even)': {
      backgroundColor: '#f9fafd'
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0
    }
  }))
  // Loading skeleton
  const TableRowsLoader = ({ rowsNum }: any) => {
    return (
      <>
        {[...Array(rowsNum)].map((row, index) => (
          <TableRow key={index}>
            {columnsLeaderboard.map((item, index) => (
              <TableCell component="th" scope="row" key={index}>
                <Skeleton animation="wave" variant="text" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </>
    )
  }

  return (
    <Box className={styles['page-wrapper']}>
      <Box className={styles['page-title']}>Leaderboard</Box>
      {/* FINAL RESULT SECTION */}
      <Box
        className={styles['card-container']}
        sx={{
          visibility: !loading ? 'hidden' : 'visible',
          opacity: !loading ? 0 : 1
        }}
      >
        {/* CARD TOP 1 */}
        <Box
          className={styles[teamsTop2?.length === 0 ? 'card-wrapper2-nothover' : 'card-wrapper2']}
          style={{
            opacity: teamsTop2?.length === 0 ? 0.4 : 1
          }}
        >
          {/* POSITION */}
          <Typography className={styles['position-label2']}>2</Typography>
          {/* TROPHY */}
          <Avatar className={styles['trophy-wrapper2']} src={trophy2} />
          {/* TEAM NAME */}
          {teamsTop2?.map((team) => (
            <Typography className={styles['team-name2']}>
              <Tooltip title={`${team.teamName}`} placement="left">
                <span> {checkLengthTeam(team.teamName)}</span>
              </Tooltip>
            </Typography>
          ))}
          {/* DETAIL */}
          <Box className={styles['detail-container2']}>
            <Box className={styles['detail-wrapper2']}>
              <Typography className={styles['detail-label2']}>Goal Difference</Typography>
              <Typography className={styles['detail-value2']}>{teamsTop2[0]?.theDifference}</Typography>
            </Box>
            <Divider />
            <Box className={styles['detail-wrapper2']}>
              <Typography className={styles['detail-label2']}>Goals For</Typography>
              <Typography className={styles['detail-value2']}>{teamsTop2[0]?.totalResult}</Typography>
            </Box>
            <Divider />
            <Box className={styles['detail-wrapper2']}>
              <Typography className={styles['detail-label2']}>Goals Against</Typography>
              <Typography className={styles['detail-value2']}>{teamsTop2[0]?.negativeResult}</Typography>
            </Box>
          </Box>
          <Box className={styles['point-container']}>
            <Typography className={styles['point-value2']}>{teamsTop2[0]?.score}</Typography>
            <Typography className={styles['point-label2']}>POINTS:</Typography>
          </Box>
        </Box>
        {/* CARD TOP 2 */}
        <Box
          className={styles[teamsTop1?.length === 0 ? 'card-wrapper1-nothover' : 'card-wrapper1']}
          style={{
            opacity: teamsTop1?.length === 0 ? 0.4 : 1
          }}
        >
          {/* POSITION */}
          <Typography className={styles['position-label1']}>1</Typography>
          {/* CROWN */}
          <Avatar
            className={styles['crown-wrapper']}
            src={
              'https://images.vexels.com/media/users/3/235462/isolated/preview/a14a3501e63681ff7dfcfbafc89c1b96-simple-flat-golden-crown.png'
            }
          />
          {/* TROPHY */}
          <Avatar className={styles['trophy-wrapper1']} src={trophy1} />
          {/* TEAM NAME */}
          {teamsTop1?.map((team) => (
            <Typography className={styles['team-name1']}>
              <Tooltip title={`${team.teamName}`} placement="left">
                <span> {checkLengthTeam(team.teamName)}</span>
              </Tooltip>
            </Typography>
          ))}
          {/* DETAIL */}
          <Box className={styles['detail-container1']}>
            <Box className={styles['detail-wrapper1']}>
              <Typography className={styles['detail-label1']}>Goal Difference</Typography>
              <Typography className={styles['detail-value1']}>{teamsTop1[0]?.theDifference}</Typography>
            </Box>
            <Divider />
            <Box className={styles['detail-wrapper1']}>
              <Typography className={styles['detail-label1']}>Goals For</Typography>
              <Typography className={styles['detail-value1']}>{teamsTop1[0]?.totalResult}</Typography>
            </Box>
            <Divider />
            <Box className={styles['detail-wrapper1']}>
              <Typography className={styles['detail-label1']}>Goals Against</Typography>
              <Typography className={styles['detail-value1']}>{teamsTop1[0]?.negativeResult}</Typography>
            </Box>
          </Box>
          <Box className={styles['point-container']}>
            <Typography className={styles['point-value1']}>{teamsTop1[0]?.score}</Typography>
            <Typography className={styles['point-label1']}>POINTS:</Typography>
          </Box>
        </Box>
        {/* CARD TOP 3 */}
        <Box
          className={styles[teamsTop3?.length === 0 ? 'card-wrapper3-nothover' : 'card-wrapper3']}
          style={{
            opacity: teamsTop3?.length === 0 ? 0.4 : 1
          }}
        >
          {/* POSITION */}
          <Typography className={styles['position-label3']}>3</Typography>
          {/* TROPHY */}
          <Avatar className={styles['trophy-wrapper3']} src={trophy3} />
          {/* TEAM NAME */}
          {teamsTop3?.map((team) => (
            <Typography className={styles['team-name3']}>
              <Tooltip title={`${team.teamName}`} placement="right">
                <span> {checkLengthTeam(team.teamName)}</span>
              </Tooltip>
            </Typography>
          ))}
          {/* DETAIL */}
          <Box className={styles['detail-container3']}>
            <Box className={styles['detail-wrapper3']}>
              <Typography className={styles['detail-label3']}>Goal Difference</Typography>
              <Typography className={styles['detail-value3']}>{teamsTop3[0]?.theDifference}</Typography>
            </Box>
            <Divider />
            <Box className={styles['detail-wrapper3']}>
              <Typography className={styles['detail-label3']}>Goals For</Typography>
              <Typography className={styles['detail-value3']}>{teamsTop3[0]?.totalResult}</Typography>
            </Box>
            <Divider />
            <Box className={styles['detail-wrapper3']}>
              <Typography className={styles['detail-label3']}>Goals Against</Typography>
              <Typography className={styles['detail-value3']}>{teamsTop3[0]?.negativeResult}</Typography>
            </Box>
          </Box>
          <Box className={styles['point-container']}>
            <Typography className={styles['point-value3']}>{teamsTop3[0]?.score}</Typography>
            <Typography className={styles['point-label3']}>POINTS:</Typography>
          </Box>
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 232px)' }}>
        <Table sx={{ minWidth: 650 }} stickyHeader={true} size="small">
          <TableHead
            sx={{
              background: ' linear-gradient(195deg, #3562A6, #0E1E5B)'
            }}
            style={{
              WebkitTouchCallout: 'none',
              WebkitUserSelect: 'none',
              KhtmlUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
              userSelect: 'none'
            }}
          >
            <TableRow>
              {columnsLeaderboard.map((column) => (
                <TableCell
                  className={styles['table-header-cell']}
                  key={column.id}
                  style={{ width: `${column.style.width}`, textAlign: `${column.left ? 'left' : 'center'}` }}
                  sx={{
                    padding: column.left ? '6px 16px !important' : '0 !important'
                  }}
                >
                  <Tooltip title={`${column.style.filed}`} placement="top">
                    <span>{column.label}</span>
                  </Tooltip>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading ? (
              // LOADING
              <TableRowsLoader rowsNum={10} />
            ) : leaderboardData.leaderBoard?.length === 0 ? (
              // NO ITEM
              <TableRow>
                <TableCell colSpan={columnsLeaderboard?.length + 1}>
                  <Box className={styles['noitem-container']}>
                    <Box className={styles['noitem-wrapper']} component="img" src={noItem} alt="no-item" />
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              // TABLE DATA
              leaderboardData.leaderBoard.map((row, index) => (
                <StyledTableRow key={index}>
                  {/* POSITION */}
                  <TableCell className={styles['position-cell']} align="center">
                    {tournament.status === 'IN_PROGRESS' && row.rank === 1 ? (
                      <>
                        <Box
                          className={styles['position-indicator']}
                          style={{
                            backgroundColor: '#ffe72d'
                          }}
                        ></Box>
                        <Typography variant="body2" align="center" className={styles['position-value']}>
                          <Tooltip title={`${row.rank}`} placement="right">
                            <span>{row.rank}</span>
                          </Tooltip>
                        </Typography>
                      </>
                    ) : tournament.status === 'IN_PROGRESS' && row.rank === 2 ? (
                      <>
                        <Box
                          className={styles['position-indicator']}
                          style={{
                            backgroundColor: '#427D9D'
                          }}
                        ></Box>
                        <Typography variant="body2" align="center" className={styles['position-value']}>
                          <Tooltip title={`${row.rank}`} placement="right">
                            <span>{row.rank}</span>
                          </Tooltip>
                        </Typography>
                      </>
                    ) : tournament.status === 'IN_PROGRESS' && row.rank === 3 ? (
                      <>
                        <Box
                          className={styles['position-indicator']}
                          style={{
                            backgroundColor: '#f6945a'
                          }}
                        ></Box>
                        <Typography variant="body2" align="center" className={styles['position-value']}>
                          <Tooltip title={`${row.rank}`} placement="right">
                            <span>{row.rank}</span>
                          </Tooltip>
                        </Typography>
                      </>
                    ) : tournament.status === 'NEED_INFORMATION' || tournament.status === 'READY' ? (
                      <Tooltip title={`${index + 1}`} placement="right">
                        <span>{index + 1}</span>
                      </Tooltip>
                    ) : (
                      <Tooltip title={`${row.rank}`} placement="right">
                        <span>{row.rank}</span>
                      </Tooltip>
                    )}
                  </TableCell>
                  {/* TEAM NAME */}
                  <TableCell align="left" className={styles['teamname-cell']}>
                    <Tooltip title={`${row.teamName}`} placement="right">
                      <span>{row.teamName}</span>
                    </Tooltip>
                  </TableCell>
                  {/* PLAYED MATCHES */}
                  <TableCell align="center" style={{}}>
                    <Tooltip title={`${row.playedMatch}`} placement="right">
                      <span>{row.playedMatch}</span>
                    </Tooltip>
                  </TableCell>
                  {/* GOALS FOR */}
                  <TableCell align="center" style={{}}>
                    <Tooltip title={`${row.totalResult}`} placement="right">
                      <span>{row.totalResult}</span>
                    </Tooltip>
                  </TableCell>
                  {/* GOALS AGAINST */}
                  <TableCell align="center" style={{}}>
                    <Tooltip title={`${row.negativeResult}`} placement="right">
                      <span>{row.negativeResult}</span>
                    </Tooltip>
                  </TableCell>
                  {/* GOAL DIFF */}
                  <TableCell align="center" style={{}}>
                    <Tooltip title={`${row.theDifference}`} placement="right">
                      <span>{row.theDifference}</span>
                    </Tooltip>
                  </TableCell>
                  {/* POINTS */}
                  <TableCell align="center" className={styles['point-cell']}>
                    <Tooltip title={`${row.score}`} placement="right">
                      <span>{row.score}</span>
                    </Tooltip>
                  </TableCell>
                  {/* LAST 5 */}
                  <TableCell align="center" style={{}}>
                    <Box className={styles['last5-container']}>
                      {row.last5.map((last5, index) => (
                        <Box key={index} className={styles['last5-tooltip-container']}>
                          {/* LAST 5 MATCHES TOOLTIP */}
                          {last5.teamWinId !== -1 && (
                            <Box className={styles['last5-tooltip-wrapper']}>
                              {/* DATE */}
                              <Box>
                                <Typography className={styles['last5-tooltip-date']}>
                                  <Tooltip title={`${dayjs(last5.date).format('dddd DD MMMM YYYY')}`} placement="top">
                                    <span>{dayjs(last5.date).format('ddd D MMM YYYY')}</span>
                                  </Tooltip>
                                </Typography>
                                <Box className={styles['last5-tooltip-date-padding']}></Box>
                              </Box>
                              {/* SCORE */}
                              <Box className={styles['last5-tooltip-score-container']}>
                                <Box className={styles['last5-tooltip-score-wrapper']}>
                                  <Typography
                                    className={styles['last5-tooltip-score-teamname']}
                                    style={{
                                      fontWeight: last5.teamWinId === last5.teamOneId ? '600' : '400'
                                    }}
                                  >
                                    <Tooltip title={`${last5.teamOneName}`} placement="left">
                                      <span> {checkLengthTeam(last5.teamOneName)}</span>
                                    </Tooltip>
                                  </Typography>
                                  <Typography
                                    className={styles['last5-tooltip-score-value']}
                                    style={{
                                      fontWeight: last5.teamWinId === last5.teamOneId ? '600' : '400'
                                    }}
                                  >
                                    <Tooltip title={`${last5.teamOneResult}`} placement="right">
                                      <span> {last5.teamOneResult}</span>
                                    </Tooltip>
                                    {last5.teamOneId === last5.teamWinId && (
                                      <Box className={styles['last5-tooltip-score-arrow']}></Box>
                                    )}
                                  </Typography>
                                </Box>
                                <Box className={styles['last5-tooltip-score-wrapper']}>
                                  <Typography
                                    className={styles['last5-tooltip-score-teamname']}
                                    style={{
                                      fontWeight: last5.teamWinId === last5.teamTwoId ? '600' : '400'
                                    }}
                                  >
                                    <Tooltip title={`${last5.teamTwoName}`} placement="left">
                                      <span> {checkLengthTeam(last5.teamTwoName)}</span>
                                    </Tooltip>
                                  </Typography>
                                  <Typography
                                    className={styles['last5-tooltip-score-value']}
                                    style={{
                                      fontWeight: last5.teamWinId === last5.teamTwoId ? '600' : '400'
                                    }}
                                  >
                                    <Tooltip title={`${last5.teamTwoResult}`} placement="right">
                                      <span> {last5.teamTwoResult}</span>
                                    </Tooltip>
                                    {last5.teamTwoId === last5.teamWinId && (
                                      <Box className={styles['last5-tooltip-score-arrow']}></Box>
                                    )}
                                  </Typography>
                                </Box>
                              </Box>
                              {/* TAIL */}
                              <Box className={styles['last5-tooltip-tail-wrapper']}>
                                <Box className={styles['last5-tooltip-tail']}></Box>
                              </Box>
                            </Box>
                          )}
                          {/* LAST 5 ITEMS */}
                          <Box
                            key={index}
                            className={styles['last5-item']}
                            sx={{
                              backgroundColor:
                                row.teamId === last5.teamWinId
                                  ? '#00db74'
                                  : last5.teamWinId === 0
                                    ? '#c3b3c5'
                                    : last5.teamWinId > 0
                                      ? '#e0005e'
                                      : '#cccccc'
                            }}
                          >
                            <Typography key={index} className={styles['last5-item-text']}>
                              {row.teamId === last5.teamWinId
                                ? 'W'
                                : last5.teamWinId === 0
                                  ? 'D'
                                  : last5.teamWinId > 0
                                    ? 'L'
                                    : '-'}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </TableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Leaderboard
