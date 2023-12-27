import React from 'react'
import Box from '@mui/material/Box'
import ListScheduleCard from './ListScheduleCard/ListScheduleCard'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ScheduleDataType } from '../../../../../types/schedule.type'

interface ScheduleColumnProps {
  column: ScheduleDataType
}

const ScheduleColumn = ({ column }: ScheduleColumnProps) => {
  const { attributes, setNodeRef, transform, transition } = useSortable({
    id: column.eventDateId,
    data: { ...column }
  })

  const dntKitStyle = {
    transform: CSS.Translate.toString(transform),
    transition
  }

  return (
    <Box
      ref={setNodeRef}
      style={dntKitStyle}
      {...attributes}
      sx={{
        maxWidth: '220px',
        minWidth: '220px',
        background: '#333643',
        ml: 3,
        borderRadius: '6px',
        outline: 'none',
        height: 'fit-content',
        maxHeight: (theme) => `calc(100vh - 64px - 30px - ${theme.spacing(5)})`
      }}
    >
      {/* Box column header */}
      <Box
        sx={{
          height: '90px',
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          backgroundColor: '#1280c3',
          borderRadius: '6px',
          m: 1,
          position: 'relative'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1
          }}
        >
          <Box component="span" sx={{ fontSize: '0.8rem' }}>
            {column?.date}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box component="span" sx={{ fontSize: '0.7rem' }}>
              {column?.startTime} - {column?.endTime}
            </Box>
          </Box>
        </Box>
        <Box component="span" sx={{ cursor: 'pointer', position: 'absolute', right: '10px' }}>
          <ModeEditIcon fontSize="small" />
        </Box>
      </Box>
      {/* Box List Card */}
      <ListScheduleCard cards={column?.matchs} />
      {/* Box footer */}
      <Box
        sx={{
          height: '56px',
          p: 1.2,
          display: 'flex',
          justifyContent: 'center',
          color: 'white',
          alignItems: 'center'
        }}
      >
        <Button
          startIcon={<AddIcon />}
          sx={{
            width: '100%',
            background: 'white',
            color: 'black',
            '& .MuiButton-startIcon': { marginRight: 0 },
            '&:hover': {
              color: '#fff',
              background: '#504d4d'
            }
          }}
        >
          Event
        </Button>
      </Box>
    </Box>
  )
}

export default ScheduleColumn
