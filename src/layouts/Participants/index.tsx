import React from 'react'
import Box from '@mui/material/Box'
import withBaseLogic from '../../hoc/withBaseLogic'
import TableReused from '../../components/Tables'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ParamApi, ParticipantAPIRes, ParticipantByIdAPIRes } from '../../types/commom'
import { createSearchParams, useParams, useSearchParams } from 'react-router-dom'
import {
  addParticipant,
  deleteParticipant,
  getAllParticipant,
  getParticipantById,
  putParticipantById
} from '../../apis/axios/participants/participant'
import { useDispatch, useSelector } from 'react-redux'
import { setParticipants, setSelectedParticipant } from '../../redux/reducers/participants/participants.reducer'
import { DialogEditParticipant } from '../../components/Dialog/Participant/EditParticipant'
import { setPlayers, setSelectedTeamId } from '../../redux/reducers/players/players.reducer'
import DialogViewPlayerList from '../../components/Dialog/Player/ViewPlayer/DialogViewPlayerList'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { DialogAddParticipant } from '../../components/Dialog/Participant/AddParticipant'

const Participants = ({ navigate, location }: any) => {
  const columns = [
    {
      id: 'Id',
      sortTable: false,
      label: 'No.',
      left: false,
      style: {
        filed: 'Id',
        width: '10%'
      }
    },
    {
      id: 'teamName',
      sortTable: false,
      label: 'Name',
      sortBy: 'teamName',
      left: false,
      style: {
        filed: 'teamName',
        width: '60%'
      }
    },
    {
      id: 'playerCount',
      sortTable: false,
      label: 'Players',
      sortBy: 'playerCount',
      left: false,
      style: {
        filed: 'playerCount',
        width: '30%'
      }
    }
  ]

  const participants = useSelector((state: any) => state.participant.participants)

  const [isOpenPlayerDialog, setIsOpenPlayerDialog] = useState<boolean>(false)
  const [totalParticipants, setTotalParticipants] = useState<number>(0)
  const [totalCurrentPage, setTotalCurrentPage] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [update, setUpdate] = useState<boolean>(false)
  const [params] = useSearchParams()
  const pageURL = Number(params.get('page'))
  const [currentPage, setCurrentPage] = useState<number>(pageURL | 1)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false)
  const { tournamentId } = useParams()
  const dispatch = useDispatch()
  const isSetPageURL = useRef(false)

  // get all team from DB
  const getAll = async (param: ParamApi, tournamentId: number) => {
    const getParticipants = (await getAllParticipant(param, tournamentId)) as ParticipantAPIRes
    if (getParticipants.data) {
      dispatch(setParticipants([...getParticipants.data]))
      setTotalCurrentPage(getParticipants?.total)
      setTotalParticipants(getParticipants?.additionalData?.totalTeamOfTournament)
    }
  }

  const pageSearch = (value: number) => {
    setCurrentPage(() => value)
    isSetPageURL.current = false
  }

  useEffect(() => {
    if (isSetPageURL.current === false) {
      setCurrentPage(pageURL)
      isSetPageURL.current = true
    }
  }, [pageURL])

  useEffect(() => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams({ page: String(currentPage) }).toString()
    })

    const param: ParamApi = {
      page: currentPage
    }
    getAll({ ...param }, Number(tournamentId))
    setLoading(true)
  }, [currentPage, update])

  useEffect(() => {
    if (totalParticipants === undefined && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
    }
  }, [totalParticipants])

  const handleOpenPlayerDialog = useCallback((rowData: { [key: string]: any }) => {
    dispatch(setPlayers([]))
    dispatch(setSelectedTeamId(rowData.teamId))
    setIsOpenPlayerDialog(true)
  }, [])

  const handleEdit = useCallback(
    async (rowData: { [key: string]: any }) => {
      try {
        const selectedParticipant = (await getParticipantById(
          rowData['teamId'],
          Number(tournamentId)
        )) as ParticipantByIdAPIRes
        dispatch(setSelectedParticipant(selectedParticipant.data))
        setIsEditDialogOpen(true)
      } catch (err) {
        console.error('Error fetching participant', err)
      }
    },
    [dispatch]
  )

  const handleDelete = useCallback((rowData: { [key: string]: any }) => {
    const { teamId } = rowData

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      allowOutsideClick: false
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = (await deleteParticipant(teamId, Number(tournamentId))) as ParticipantAPIRes
        if (res.success) {
          toast.success('A team is deleted successfully!')
          setUpdate((prev) => !prev)
        } else {
          toast.error(res.message)
        }
      }
    })
  }, [])

  return (
    <Box sx={{ backgroundColor: 'white', padding: '1rem', borderRadius: '1rem', marginTop: '1rem' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ alignSelf: 'flex-start', marginBottom: '10px' }}>
          <DialogAddParticipant
            addParticipant={addParticipant}
            onAdd={() => {
              setUpdate((prev) => !prev)
            }}
          />
        </Box>
        <DialogEditParticipant
          editParticipant={putParticipantById}
          onOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false)
          }}
        />
      </Box>
      <TableReused
        columns={columns}
        rows={participants}
        onOpenPlayerDialog={handleOpenPlayerDialog}
        onEdit={handleEdit}
        onDelete={handleDelete}
        total={totalParticipants}
        handlePageSearch={pageSearch}
        totalCurrentPage={totalCurrentPage}
        loading={loading}
      />
      {isOpenPlayerDialog && (
        <DialogViewPlayerList onOpen={isOpenPlayerDialog} onClose={() => setIsOpenPlayerDialog(false)} />
      )}
    </Box>
  )
}

export default withBaseLogic(Participants)
