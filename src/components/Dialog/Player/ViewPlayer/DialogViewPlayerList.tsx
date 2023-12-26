import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import styles from './DialogViewPlayerList.module.css'
import { useDispatch, useSelector } from 'react-redux'
import TableReused from '../../../../components/Tables'
import Swal from 'sweetalert2'
import { setPlayers } from '../../../../redux/reducers/players/players.reducer'
import { deletePlayer, getAllPlayersInTeam } from '../../../../apis/axios/players/player'
import { PlayerAPIRes } from '../../../../types/commom'
import { useLocation } from 'react-router-dom'
import { convertPlayer } from '../../../../utils/player'
import { AddCircle } from '@mui/icons-material'

interface DialogProps {
  onOpen: boolean
  onClose: () => void
}

const DialogViewPlayerList = ({ onOpen, onClose }: DialogProps) => {
  const columns = [
    {
      id: 'id',
      sortTable: false,
      sortBy: 'Id',
      label: 'No.',
      left: false,
      style: {
        filed: 'Id',
        width: '5%'
      }
    },
    {
      id: 'playerName',
      sortTable: false,
      label: 'Full Name',
      sortBy: 'playerName',
      left: false,
      style: {
        filed: 'playerName',
        width: '30%'
      }
    },
    {
      id: 'phone',
      sortTable: false,
      label: 'Phone number',
      sortBy: 'phone',
      left: false,
      style: {
        filed: 'phone',
        width: '25%'
      }
    },
    {
      id: 'dateOfBirth',
      sortTable: false,
      label: 'Date of birth',
      sortBy: 'dateOfBirth',
      left: false,
      style: {
        filed: 'dateOfBirth',
        width: '20%'
      }
    }
  ]

  const players = useSelector((state: any) => state.player.players)
  const [totalPlayers, setTotalPlayers] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [update, setUpdate] = useState<boolean>(false)
  const dispatch = useDispatch()
  const location = useLocation()
  const selectedTeamId = useSelector((state: any) => state.player.selectedTeamId)

  // get all players from DB
  const getAll = useCallback(async () => {
    const tournamentId = Number(location.pathname.split('/')[2])
    const getPlayers = (await getAllPlayersInTeam(tournamentId, selectedTeamId)) as PlayerAPIRes
    if (getPlayers && getPlayers.data) {
      const convertedData = []
      for (const player of getPlayers.data) {
        convertedData.push(convertPlayer(player))
      }
      dispatch(setPlayers([...convertedData]))
      setTotalPlayers(convertedData.length)
    } else {
      dispatch(setPlayers([]))
      setTotalPlayers(0)
    }
  }, [])

  const handleEdit = useCallback(
    async (rowData: { [key: string]: any }) => {
      alert(rowData)
    },
    [dispatch]
  )

  const handleDelete = useCallback((rowData: { [key: string]: any }) => {
    const tournamentId = Number(location.pathname.split('/')[2])
    const { playerId } = rowData //get organizerId

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      allowOutsideClick: false,
      customClass: {
        container: 'swal2-container'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = (await deletePlayer(tournamentId, selectedTeamId, playerId)) as PlayerAPIRes
        if (res.success) {
          toast.success('A player is deleted successfully!')
          setUpdate((prev) => !prev)
        } else {
          toast.error(res.message)
        }
      }
    })
  }, [])

  useEffect(() => {
    getAll()
    setLoading(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update])

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <Dialog
      onClick={handleClickOutside}
      onClose={onClose}
      open={onOpen}
      PaperProps={{
        sx: {
          borderRadius: '1rem',
          width: '50vw!important',
          maxWidth: 'none!important'
        }
      }}
      scroll="paper"
      maxWidth="xl"
      sx={{ zIndex: 1000 }}
    >
      <DialogTitle className={styles['dialog-title']}>Players</DialogTitle>
      <DialogContent className={styles['dialog-container']}>
        <Button
          className={styles['add-player-btn']}
          variant="contained"
          style={{
            background: 'linear-gradient(195deg, rgb(102, 187, 106), rgb(67, 160, 71))',
            color: 'white'
          }}
          endIcon={<AddCircle />}
        >
          Add new
        </Button>
        <TableReused
          columns={columns}
          rows={players}
          onEdit={handleEdit}
          onDelete={handleDelete}
          total={totalPlayers}
          loading={loading}
          hidePagination={false}
        />
      </DialogContent>
      <DialogActions className={styles['group-btn']}>
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default memo(DialogViewPlayerList)
