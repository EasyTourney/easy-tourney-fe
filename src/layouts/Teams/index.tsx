import React from 'react'
import Box from '@mui/material/Box'
import withBaseLogic from '../../hoc/withBaseLogic'
import TableReused from '../../components/Tables'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ParamApi, TeamAPIRes, TeamByIdAPIRes } from '../../types/common'
import { createSearchParams, useParams, useSearchParams } from 'react-router-dom'
import { addTeam, deleteTeam, getAllTeam, getTeamById, putTeamById } from '../../apis/axios/teams/team'
import { useDispatch, useSelector } from 'react-redux'
import { setTeams, setSelectedTeam } from '../../redux/reducers/teams/teams.reducer'
import { DialogEditTeam } from '../../components/Dialog/Team/EditTeam'
import { setPlayers, setSelectedTeamId } from '../../redux/reducers/players/players.reducer'
import DialogViewPlayerList from '../../components/Dialog/Player/ViewPlayer/DialogViewPlayerList'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { DialogAddTeam } from '../../components/Dialog/Team/AddTeam'

const Teams = ({ navigate, location }: any) => {
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

  const teams = useSelector((state: any) => state.team.teams)

  const [isOpenPlayerDialog, setIsOpenPlayerDialog] = useState<boolean>(false)
  const [totalTeams, setTotalTeams] = useState<number>(0)
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
    const getTeams = (await getAllTeam(param, tournamentId)) as TeamAPIRes
    if (getTeams.data) {
      dispatch(setTeams([...getTeams.data]))
      setTotalCurrentPage(getTeams?.total)
      setTotalTeams(getTeams?.additionalData?.totalTeamOfTournament)
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
    if (totalTeams === undefined && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
    }
  }, [totalTeams])

  const handleOpenPlayerDialog = useCallback((rowData: { [key: string]: any }) => {
    dispatch(setPlayers([]))
    dispatch(setSelectedTeamId(rowData.teamId))
    setIsOpenPlayerDialog(true)
  }, [])

  const handleEdit = useCallback(
    async (rowData: { [key: string]: any }) => {
      try {
        const selectedTeam = (await getTeamById(rowData['teamId'], Number(tournamentId))) as TeamByIdAPIRes
        dispatch(setSelectedTeam(selectedTeam.data))
        setIsEditDialogOpen(true)
      } catch (err) {
        console.error('Error fetching team', err)
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
        const res = (await deleteTeam(teamId, Number(tournamentId))) as TeamAPIRes
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
      <Box sx={{ fontWeight: '500', fontSize: '2rem', textAlign: 'center' }}>Participant</Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ alignSelf: 'flex-start', marginBottom: '10px' }}>
          <DialogAddTeam
            addTeam={addTeam}
            onAdd={() => {
              setUpdate((prev) => !prev)
            }}
          />
        </Box>
        <DialogEditTeam
          editTeam={putTeamById}
          onOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false)
          }}
        />
      </Box>

      <TableReused
        columns={columns}
        rows={teams}
        onOpenPlayerDialog={handleOpenPlayerDialog}
        onEdit={handleEdit}
        onDelete={handleDelete}
        total={totalTeams}
        handlePageSearch={pageSearch}
        totalCurrentPage={totalCurrentPage}
        loading={loading}
      />
      {isOpenPlayerDialog && (
        <DialogViewPlayerList
          onAddPlayer={() => {
            setUpdate((prev) => !prev)
          }}
          onOpen={isOpenPlayerDialog}
          onClose={() => setIsOpenPlayerDialog(false)}
          onDelete={() => {
            setUpdate((prev) => !prev)
          }}
        />
      )}
    </Box>
  )
}

export default withBaseLogic(Teams)
