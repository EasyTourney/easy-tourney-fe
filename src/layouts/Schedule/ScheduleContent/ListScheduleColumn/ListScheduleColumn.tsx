import Box from '@mui/material/Box'
import React, { memo } from 'react'
import ScheduleColumn from './ScheduleColumn/ScheduleColumn'
import { ScheduleDataType } from '../../../../types/schedule.type'

interface ListScheduleColumnProps {
  columnData: ScheduleDataType[]
}

const ListScheduleColumn = ({ columnData }: ListScheduleColumnProps) => {
  return (
    <Box
      sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: 'auto',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        borderRadius: '1rem',
        '&::-webkit-scrollbar-track': { m: 3 }
      }}
    >
      {columnData?.map((column: ScheduleDataType) => <ScheduleColumn key={column?.eventDateId} column={column} />)}
      <Box sx={{ mx: 2 }}></Box>
    </Box>
  )
}

export default memo(ListScheduleColumn)
