/* eslint-disable react/react-in-jsx-scope */
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useCallback, useEffect, useState } from 'react'
import styles from './General.module.css'
import { checkLengthDescription, convertDateFormat } from '../../../utils/function'
import TableReused from '../../../components/Tables'
import { useParams } from 'react-router'
import { getTournamentById } from '../../../apis/axios/tournaments/tournament'
import DialogEditTournamentTitle from '../../../components/Dialog/Tournament/General/EditTitle/DialogEditTitle'
import DialogEditDescription from '../../../components/Dialog/Tournament/General/EditDescription/DialogEditDescription'
import DiaLogEditCategoryInTournamnet from '../../../components/Dialog/Tournament/General/EditCategory/DialogEditCategory'
import DialogEditOrganizerTournament from '../../../components/Dialog/Tournament/General/EditOrganizer/DialogEditOrganizerTournament'
import DialogEditEventDateTournament from '../../../components/Dialog/Tournament/General/EditEventDate/DialogEditEventDateTournament'
import { useDispatch, useSelector } from 'react-redux'
import {
  setSelectedCategory,
  setSelectedDescription,
  setSelectedEventDate,
  setSelectedOrganizer,
  setSelectedTitle
} from '../../../redux/reducers/general/general.reducer'
import { setGeneral } from '../../../redux/reducers/tournaments/tournaments.reducer'
import { MdEditSquare } from 'react-icons/md'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

const General = () => {
  const dispatch = useDispatch()
  const [loading, setIsLoading] = useState<boolean>(false)
  const tournamentData = useSelector((state: any) => state.tournament.general)
  const [openTitle, setOpenTitle] = useState(false)
  const [openDescription, setOpenDescription] = useState(false)
  const [openCategory, setOpenCategory] = useState(false)
  const [openOrganizer, setOpenOrganizer] = useState(false)
  const [openEventDate, setOpenEventDate] = useState(false)
  const generalTournamnet = useSelector((state: any) => state.tournament.general)
  const [isDiscarded, setIsDiscarded] = useState<boolean>(false)

  const handleClickOpenTitle = useCallback(() => {
    setOpenTitle(true)
    dispatch(setSelectedTitle(generalTournamnet.title))
  }, [dispatch, generalTournamnet?.title, setOpenTitle])

  const handleEditCategory = useCallback(() => {
    setOpenCategory(true)
    dispatch(setSelectedCategory(generalTournamnet.category.categoryName))
  }, [dispatch, generalTournamnet.category?.categoryName, setOpenCategory])

  const handleEditDescription = useCallback(() => {
    setOpenDescription(true)
    dispatch(setSelectedDescription(generalTournamnet.description))
  }, [dispatch, generalTournamnet.description, setOpenDescription])

  const handleEditOrganizer = useCallback(() => {
    setOpenOrganizer(true)
    dispatch(setSelectedOrganizer(generalTournamnet.organizers))
  }, [dispatch, generalTournamnet.organizers, setOpenOrganizer])
  const handleEditEventDate = useCallback(() => {
    setOpenEventDate(true)
    dispatch(setSelectedEventDate(generalTournamnet.eventDates))
  }, [dispatch, generalTournamnet.eventDates, setOpenEventDate])

  const columnsOrganizer = [
    {
      id: 'Id',
      sortTable: false,
      label: 'No.',
      left: false,
      style: {
        filed: 'Id',
        width: '40px'
      }
    },
    {
      id: 'fullName',
      sortTable: false,
      label: 'Full Name',
      left: false,
      style: {
        filed: 'fullName',
        width: '400px'
      }
    },
    {
      id: 'email',
      sortTable: false,
      label: 'Email',
      left: false,
      style: {
        filed: 'email',
        width: '400px'
      }
    }
  ]

  const columnsEventDates = [
    {
      id: 'Id',
      sortTable: false,
      label: 'No.',
      left: false,
      style: {
        filed: 'Id',
        width: '40px'
      }
    },
    {
      id: 'date',
      sortTable: false,
      label: 'Dates',
      left: false,
      style: {
        filed: 'event',
        width: '800px'
      }
    }
  ]

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true)
    }, 1000)
  }, [loading])

  const param: { tournamentId?: string } = useParams()
  useEffect(() => {
    const fetchTournamentData = async () => {
      const response = await getTournamentById(Number(param.tournamentId))
      dispatch(setGeneral(response.data))
    }

    if (param.tournamentId) {
      fetchTournamentData()
    }
  }, [param.tournamentId])
  const handleDiscard = useCallback(async (rowData: { [key: string]: any }) => {
    const tournamentId = Number(location.pathname.split('/')[2])
    console.log(rowData)
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, discard it!',
      allowOutsideClick: false,
      customClass: {
        container: 'swal2-container'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        toast.success(tournamentId)
        setIsDiscarded(true)
      }
    })
  }, [])
  if (!tournamentData) {
    return <div>Loading...</div>
  } else {
    const isFinishedOrDiscarded = tournamentData.status === 'FINISHED' || tournamentData.status === 'DISCARDED'
    const eventDates = convertDateFormat(tournamentData.eventDates)
    return (
      <Box className={styles['general-container']}>
        <Box className={styles['general-wrapper']}>
          <Box className={styles['general-info']}>General Information</Box>
          {/* title */}
          <Box className={styles['general-wrapper-title']}>
            <Box className={styles['general-title-common']}>
              Title
              {!isDiscarded && (
                <Button
                  title="Edit"
                  sx={{
                    backgroundColor: 'white',
                    minWidth: '1rem',
                    padding: '0.25rem'
                  }}
                  onClick={handleClickOpenTitle}
                >
                  <MdEditSquare color="green" size={20} />
                </Button>
              )}
            </Box>
            <Box component="span">{tournamentData.title}</Box>
          </Box>
          {/* category */}
          <Box className={styles['general-wrapper-common']}>
            <Box className={styles['general-title-common']}>
              Category
              {!isDiscarded && (
                <Button
                  title="Edit"
                  sx={{
                    backgroundColor: 'white',
                    minWidth: '1rem',
                    padding: '0.25rem'
                  }}
                  onClick={handleEditCategory}
                >
                  <MdEditSquare color="green" size={20} />
                </Button>
              )}
            </Box>
            <Box component="span">
              {' '}
              {tournamentData && tournamentData.category && tournamentData.category.categoryName}
            </Box>
          </Box>
          {/* Description */}
          <Box className={styles['general-wrapper-common']}>
            <Box className={styles['general-title-common']}>
              Description
              <Button
                title="Edit"
                sx={{
                  backgroundColor: 'white',
                  minWidth: '1rem',
                  padding: '0.25rem'
                }}
                onClick={handleEditDescription}
              >
                <MdEditSquare color="green" size={20} />
              </Button>
            </Box>
            <Box component="span" className={styles['general-description-content']} title={tournamentData.description}>
              {checkLengthDescription(tournamentData.description, 500)}
            </Box>
          </Box>
          {/* Organizer */}
          <Box className={styles['general-wrapper-common']}>
            <Box className={styles['general-title-common']}>
              Organizer
              {!isDiscarded && (
                <Button
                  title="Edit"
                  sx={{
                    backgroundColor: 'white',
                    minWidth: '1rem',
                    padding: '0.25rem'
                  }}
                  onClick={handleEditOrganizer}
                >
                  <MdEditSquare color="green" size={20} />
                </Button>
              )}
            </Box>
            <Box className={styles['general-organizer-table']}>
              {tournamentData?.organizers ? (
                <TableReused
                  columns={columnsOrganizer}
                  rows={tournamentData.organizers}
                  total={tournamentData.organizers.length}
                  showActions={false}
                  hidePagination={false}
                  loading={loading}
                />
              ) : (
                <div>No organizers available</div>
              )}
            </Box>
          </Box>
          {/* Event dates */}
          <Box className={styles['general-wrapper-common']}>
            <Box className={styles['general-title-common']}>
              Event dates
              {!isDiscarded && (
                <Button
                  disabled={isDiscarded}
                  title="Edit"
                  sx={{
                    backgroundColor: 'white',
                    minWidth: '1rem',
                    padding: '0.25rem'
                  }}
                  onClick={handleEditEventDate}
                >
                  <MdEditSquare color="green" size={20} />
                </Button>
              )}
            </Box>
            <Box className={styles['general-eventdates-table']}>
              <TableReused
                columns={columnsEventDates}
                rows={eventDates ?? []}
                total={(eventDates ?? []).length}
                showActions={false}
                hidePagination={false}
                loading={loading}
              />
            </Box>
          </Box>
          {/* Discard tournament */}
          {!isFinishedOrDiscarded && (
            <Box className={styles['general-wrapper-common']}>
              <Box className={styles['general-discard-content']}>Discard this tournament</Box>
              <Box className={styles['general-wrapper-discard']}>
                <Typography className={styles['general-text-warning']}>
                  Once you discard this tournament, there is no going back. Please be certain.
                </Typography>
                <Button onClick={handleDiscard} className={styles['general-btn-discard']}>
                  <Typography component="h2" className={styles['general-discard-text']}>
                    Discard
                  </Typography>
                </Button>
              </Box>
            </Box>
          )}
        </Box>
        <DialogEditTournamentTitle open={openTitle} setOpen={setOpenTitle}></DialogEditTournamentTitle>
        <DialogEditDescription open={openDescription} setOpen={setOpenDescription}></DialogEditDescription>
        <DiaLogEditCategoryInTournamnet open={openCategory} setOpen={setOpenCategory}></DiaLogEditCategoryInTournamnet>
        <DialogEditOrganizerTournament open={openOrganizer} setOpen={setOpenOrganizer}></DialogEditOrganizerTournament>
        <DialogEditEventDateTournament open={openEventDate} setOpen={setOpenEventDate}></DialogEditEventDateTournament>
      </Box>
    )
  }
}

export default General
