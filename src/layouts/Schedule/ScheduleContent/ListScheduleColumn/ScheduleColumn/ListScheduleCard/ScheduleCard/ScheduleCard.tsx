import React, { memo, useEffect, useState } from 'react'
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
import { checkLengthTeamOfMatch } from '../../../../../../../utils/function'
import { Chip, IconButton, Menu, MenuItem } from '@mui/material'
import { DialogEditEvent } from '../../../../../../../components/Dialog/MatchEvent/EditEvent'
import { editEvent } from '../../../../../../../apis/axios/matchEvent/matchEvent'
import { MatchEvent } from '../../../../../../../types/event'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getTournamentById } from '../../../../../../../apis/axios/tournaments/tournament'
import { setGeneral } from '../../../../../../../redux/reducers/tournaments/tournaments.reducer'

interface ScheduleCardProps {
  card: MatchDataType
  activeDragItemId?: number | null
  render: () => void
}
const ScheduleCard = ({ card, activeDragItemId, render }: ScheduleCardProps) => {
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

  const event: MatchEvent =
    card?.type === 'EVENT' ? { title: card?.title, timeDuration: card?.timeDuration } : { title: null, timeDuration: 0 }

  const checkForcusCard = card.id === activeDragItemId
  const [isOpenDialogEditEvent, setIsOpenDialogEditEvent] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

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

  const { tournamentId } = useParams()
  const dispatch = useDispatch()
  const tournamentStatus = useSelector((state: any) => state.tournament.general.status)

  useEffect(() => {
    const fetchTournamentData = async () => {
      const response = await getTournamentById(Number(tournamentId))
      dispatch(setGeneral(response.data))
    }

    if (tournamentId) {
      fetchTournamentData()
    }
  }, [tournamentId])

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
              <Typography sx={{ maxWidth: '100px', fontWeight: '500', fontSize: '12.8px', textTransform: 'uppercase' }}>
                <Tooltip title={card?.title}>
                  <Chip
                    sx={{
                      backgroundColor: 'transparent',
                      whiteSpace: 'nowrap'
                    }}
                    label={card?.title}
                  />
                </Tooltip>
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box sx={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 0.8 }}>
            <Typography sx={{ fontWeight: '500', fontSize: '12.8px' }}>Match</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Tooltip title={card?.teamOne?.teamName} placement="top">
                <Typography sx={{ fontWeight: '500', fontSize: '12.8px', width: '59px' }}>
                  {checkLengthTeamOfMatch(card?.teamOne?.teamName, 7)}
                </Typography>
              </Tooltip>
              <Typography sx={{ fontSize: '12.8px' }}>vs</Typography>
              <Tooltip title={card?.teamTwo?.teamName} placement="top">
                <Typography sx={{ fontWeight: '500', fontSize: '12.8px', width: '59px' }}>
                  {checkLengthTeamOfMatch(card?.teamTwo?.teamName, 7)}
                </Typography>
              </Tooltip>
            </Box>
          </Box>
        )}

        {/* CardActions */}

        {cardIdAtive === card?.id && showAction && (
          <Tooltip title={!open && !isOpenDialogEditEvent ? 'Options' : ''} placement="right-start">
            <CardActions disableSpacing sx={{ position: 'absolute', right: 0, top: 0, cursor: 'pointer' }}>
              {card?.type === 'EVENT' && tournamentStatus !== 'FINISHED' && tournamentStatus !== 'DISCARDED' ? (
                <Box>
                  <IconButton
                    id="option-button"
                    aria-controls={open ? 'option-button' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                  <Menu
                    id="option-button"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left'
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => {
                        setIsOpenDialogEditEvent(true)
                        handleClose()
                      }}
                    >
                      Edit
                    </MenuItem>
                    <MenuItem onClick={handleClose}>Delete</MenuItem>
                  </Menu>
                </Box>
              ) : (
                <MoreHorizIcon fontSize="small" />
              )}
            </CardActions>
          </Tooltip>
        )}
        <DialogEditEvent
          editEvent={editEvent}
          onOpen={isOpenDialogEditEvent}
          onClose={() => {
            setIsOpenDialogEditEvent(false)
          }}
          eventId={Number(card?.id)}
          render={render}
          event={event}
        />
      </CardContent>
    </Card>
  )
}

export default memo(ScheduleCard)
