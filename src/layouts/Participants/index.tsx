import React from 'react'
import Box from '@mui/material/Box'
import withBaseLogic from '../../hoc/withBaseLogic'
import TableReused from '../../components/Tables'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ParamApi, ParticipantAPIRes } from '../../types/commom'
import { createSearchParams, useParams, useSearchParams } from 'react-router-dom'
import { getAllParticipant } from '../../apis/axios/participants/participant'
import { useDispatch, useSelector } from 'react-redux'
import { setParticipant } from '../../redux/reducers/participants/participants.reducer'
import { setPlayers, setSelectedTeamId } from '../../redux/reducers/players/players.reducer'
import DialogViewPlayerList from '../../components/Dialog/Player/ViewPlayer/DialogViewPlayerList'

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
      id: 'team_name',
      sortTable: false,
      label: 'Name',
      sortBy: 'team_name',
      left: false,
      style: {
        filed: 'team_name',
        width: '60%'
      }
    },
    {
      id: 'player_count',
      sortTable: false,
      label: 'Players',
      sortBy: 'player_count',
      left: false,
      style: {
        filed: 'player_count',
        width: '30%'
      }
    }
  ]

  const participants = useSelector((state: any) => state.participant.participants)

  const [isOpenPlayerDialog, setIsOpenPlayerDialog] = useState<boolean>(false)
  const [totalParticipants, setTotalParticipants] = useState<number>(0)
  const [totalCurrentPage, setTotalCurrentPage] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [params] = useSearchParams()
  const pageURL = Number(params.get('page'))
  const [currentPage, setCurrentPage] = useState<number>(pageURL | 1)
  const { tournamentId } = useParams()
  const dispatch = useDispatch()
  const isSetPageURL = useRef(false)

  // get all team from DB
  const getAll = async (param: ParamApi, tournamentId: number) => {
    const getParticipants = (await getAllParticipant(param, tournamentId)) as ParticipantAPIRes
    if (getParticipants.data) {
      dispatch(setParticipant([...getParticipants.data]))
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, isOpenPlayerDialog])

  useEffect(() => {
    if (totalParticipants === undefined && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
    } else {
      setCurrentPage(() => 1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalParticipants])

  const handleOpenPlayerDialog = useCallback((rowData: { [key: string]: any }) => {
    dispatch(setPlayers([]))
    dispatch(setSelectedTeamId(rowData.team_id))
    setIsOpenPlayerDialog(true)
  }, [])

  const handleEdit = useCallback((rowData: { [key: string]: any }) => {
    alert(rowData)
  }, [])

  const handleDelete = useCallback(async (rowData: { [key: string]: any }) => {
    alert(rowData)
  }, [])

  return (
    <Box
      sx={{
        paddingTop: '20px'
      }}
    >
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
