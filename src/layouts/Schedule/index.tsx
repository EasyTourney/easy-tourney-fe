import { Box, Grid } from '@mui/material'
import React from 'react'
import ScheduleContent from './ScheduleContent/ScheduleContent'
import PlanSection from '../../components/Schedule/PlanSection/PlanSection'

function Schedule() {
  return (
    <Box sx={{ marginTop: '1rem', overflowX: 'auto' }}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <ScheduleContent />
        </Grid>
        <Grid item xs={3}>
          <PlanSection />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Schedule
