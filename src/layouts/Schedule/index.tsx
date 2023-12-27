import React from 'react'
import ScheduleContent from './ScheduleContent/ScheduleContent'
import { Box } from '@mui/material'

function Schedule() {
  return (
    <Box sx={{ height: '85vh', width: '100%', display: 'flex' }}>
      <ScheduleContent />
    </Box>
  )
}

export default Schedule
