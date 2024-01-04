import React, { memo, useState } from 'react'
import moment from 'moment'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import ListScheduleCard from './ListScheduleCard/ListScheduleCard'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ScheduleDataType } from '../../../../../types/schedule.type'
import EditTimeEvent from '../../../../../components/Dialog/Schedule/EditTimeEvent/EditTimeEvent'

interface ScheduleColumnProps {
  column: ScheduleDataType
  render: () => void
}

const ScheduleColumn = ({ column, render }: ScheduleColumnProps) => {
  const { attributes, setNodeRef, transform, transition } = useSortable({
    id: column.eventDateId,
    data: { ...column }
  })

  const [editEvent, setEditEvent] = useState<boolean>(false)
  const [eventDateId, setEventDateId] = useState<number>()

  const dntKitStyle = {
    transform: CSS.Translate.toString(transform),
    transition
  }

  const handleEditEvenTime = (eventDateId: number) => {
    setEventDateId(eventDateId)
    setEditEvent(true)
  }

  return (
    <Box
      ref={setNodeRef}
      style={dntKitStyle}
      {...attributes}
      sx={{
        maxWidth: '240px',
        minWidth: '240px',
        background: '#333643',
        ml: 3,
        borderRadius: '6px',
        outline: 'none',
        height: 'fit-content',
        maxHeight: (theme) => `calc(100vh - 72px - 88px - ${theme.spacing(5)})`
      }}
    >
      {/* Show popup edit eventime */}
      {editEvent && (
        <EditTimeEvent editEvent={editEvent} setEditEvent={setEditEvent} eventDateId={eventDateId} render={render} />
      )}
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
          <Box component="span" sx={{ fontSize: '0.9rem' }}>
            {moment(column?.date, 'YYYY/MM/DD').format('ddd, DD/MM/YYYY')}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box component="span" sx={{ fontSize: '0.9rem' }}>
              {column?.startTime?.slice(0, 5)} - {column?.endTime?.slice(0, 5)}
            </Box>
          </Box>
        </Box>
        <Box
          component="span"
          sx={{ cursor: 'pointer', position: 'absolute', right: '10px' }}
          onClick={() => handleEditEvenTime(column?.eventDateId)}
        >
          <Tooltip title="Edit" placement="top">
            <ModeEditIcon fontSize="small" />
          </Tooltip>
        </Box>
      </Box>
      {/* Box List Card */}
      <ListScheduleCard cards={column?.matches} />
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
        <Tooltip title="Add new event" arrow>
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
        </Tooltip>
      </Box>
    </Box>
  )
}

export default memo(ScheduleColumn)
