import { Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ScheduleContent from './ScheduleContent/ScheduleContent'
import PlanSection from '../../components/Schedule/PlanSection/PlanSection'
import { useParams } from 'react-router-dom'
import { getTournamentById } from '../../apis/axios/tournaments/tournament'
import { setGeneral } from '../../redux/reducers/tournaments/tournaments.reducer'
import { useDispatch } from 'react-redux'

function Schedule() {
  const dispatch = useDispatch()
  const param: { tournamentId?: string } = useParams()
  const [update, setUpdate] = useState<boolean>(false)

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
    <Box sx={{ marginTop: '2rem', overflowX: 'auto' }}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <ScheduleContent isGenerated={update} />
        </Grid>
        <Grid item xs={3}>
          <PlanSection
            onGenerateSchedule={() => {
              setUpdate((prev) => !prev)
            }}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Schedule
