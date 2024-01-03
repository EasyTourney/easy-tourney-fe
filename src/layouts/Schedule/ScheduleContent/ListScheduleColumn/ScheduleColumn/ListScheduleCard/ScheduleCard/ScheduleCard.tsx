import React, { memo, useState } from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Tooltip from '@mui/material/Tooltip'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import { useSortable } from '@dnd-kit/sortable'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { CSS } from '@dnd-kit/utilities'
import { MatchDataType } from '../../../../../../../types/schedule.type'

interface ScheduleCardProps {
  card: MatchDataType
  activeDragItemId?: number | null
}
const ScheduleCard = ({ card, activeDragItemId }: ScheduleCardProps) => {
  const [showAction, setShowAction] = useState<boolean>(false)
  const [cardIdAtive, setCardIdActive] = useState<number | null>(null)
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
    data: { ...card },
    transition: {
      duration: 500,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
    }
  })

  const checkForcusCard = card.id === activeDragItemId

  const dntKitCardStyle = {
    transform: checkForcusCard ? 'rotate(4deg)' : CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '#3498db 1px solid' : ''
  }

  const handleShowAction = (cardId: number, type: string) => {
    if (type === 'MOUSE_ENTER') {
      setCardIdActive(cardId)
      setShowAction(true)
    }
    if (type === 'MOUSE_LEAVE') {
      setShowAction(false)
      setCardIdActive(null)
    }
  }

  return (
    <Card
      ref={setNodeRef}
      style={dntKitCardStyle}
      {...attributes}
      {...listeners}
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset',
        background: card?.type === 'EVENT' ? '#ffc0aa' : '#fff0ad',
        border: 'none',
        outline: 'none',
        position: 'relative'
      }}
      onMouseEnter={() => handleShowAction(Number(card.id), 'MOUSE_ENTER')}
      onMouseLeave={() => handleShowAction(Number(card.id), 'MOUSE_LEAVE')}
    >
      <CardContent
        sx={{
          p: 2,
          '&:last-child': {
            p: 2
          },
          display: card?.FE_PlaceholderCard ? 'none' : 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        {/* Match Card time */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            alignItems: 'center',
            fontSize: '0.8rem',
            width: '45px'
          }}
        >
          <Typography sx={{ fontWeight: '500', fontSize: '12.8px' }}>{card?.startTime?.slice(0, 5)}</Typography>
          <Typography sx={{ fontWeight: '500', fontSize: '12.8px' }}>{card?.endTime?.slice(0, 5)}</Typography>
        </Box>
        {/* Match Card match */}

        {card?.type === 'EVENT' ? (
          <Box sx={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 0.8 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Typography sx={{ fontWeight: '500', fontSize: '12.8px', textTransform: 'uppercase' }}>
                {card?.title}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box sx={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 0.8 }}>
            <Typography sx={{ fontWeight: '500', fontSize: '12.8px' }}>Match</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Typography sx={{ fontWeight: '500', fontSize: '12.8px' }}>{card?.teamOne?.teamName}</Typography>
              <Typography sx={{ fontSize: '12.8px' }}>vs</Typography>
              <Typography sx={{ fontWeight: '500', fontSize: '12.8px' }}>{card?.teamTwo?.teamName}</Typography>
            </Box>
          </Box>
        )}

        {/* CardActions */}

        {cardIdAtive === card?.id && showAction && (
          <Tooltip title="Options" placement="right-end">
            <CardActions disableSpacing sx={{ position: 'absolute', right: 0, top: 0, cursor: 'pointer' }}>
              <MoreHorizIcon fontSize="small" />
            </CardActions>
          </Tooltip>
        )}
      </CardContent>
    </Card>
  )
}

export default memo(ScheduleCard)
