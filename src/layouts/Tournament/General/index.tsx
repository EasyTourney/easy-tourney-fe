/* eslint-disable react/react-in-jsx-scope */
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import styles from './General.module.css'
import { checkLengthDescription, convertDateFormat } from '../../../utils/function'
import TableReused from '../../../components/Tables'
import { useParams } from 'react-router'
import { getTournamentById } from '../../../apis/axios/tournaments/tournament'
import { Tournament } from '../../../types/tournament'
import { MdEditSquare } from 'react-icons/md'

const General = () => {
  const [loading, setIsLoading] = useState<boolean>(false)
  const [tournamentData, setTournamentData] = useState<Tournament>()
  const columnsOrganizer = [
    {
      id: 'id',
      sortTable: false,
      label: 'No.',
      left: false,
      style: {
        filed: 'id',
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
      setTournamentData(response.data)
    }

    if (param.tournamentId) {
      fetchTournamentData()
    }
  }, [param.tournamentId])
  if (!tournamentData) {
    return <div>Loading...</div>
  } else {
    const isFinishedOrDiscarded = tournamentData.status === 'FINISHED' || tournamentData.status === 'DISCARDED'
    const eventDates = convertDateFormat(tournamentData.eventDates)
    return (
      <Box className={styles['general-container']}>
        <Box className={styles['general-wrapper']}>
          <Box component="h2" className={styles['general-info']}>
            General Information
          </Box>
          {/* title */}
          <Box className={styles['general-wrapper-title']}>
            <Box className={styles['general-title-common']}>
              Title
              <Button
                title="Edit"
                sx={{
                  backgroundColor: 'white',
                  minWidth: '1rem',
                  padding: '0.25rem'
                }}
              >
                <MdEditSquare color="green" size={20} />
              </Button>
            </Box>
            <Box component="span">{tournamentData.title}</Box>
          </Box>
          {/* category */}
          <Box className={styles['general-wrapper-common']}>
            <Box className={styles['general-title-common']}>
              Category
              <Button
                title="Edit"
                sx={{
                  backgroundColor: 'white',
                  minWidth: '1rem',
                  padding: '0.25rem'
                }}
              >
                <MdEditSquare color="green" size={20} />
              </Button>
            </Box>
            <Box component="span">{tournamentData.category.categoryName}</Box>
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
              <Button
                title="Edit"
                sx={{
                  backgroundColor: 'white',
                  minWidth: '1rem',
                  padding: '0.25rem'
                }}
              >
                <MdEditSquare color="green" size={20} />
              </Button>
            </Box>
            <Box className={styles['general-organizer-table']}>
              <TableReused
                columns={columnsOrganizer}
                rows={tournamentData?.organizers}
                total={tournamentData?.organizers.length}
                showActions={false}
                hidePagination={false}
                loading={loading}
              />
            </Box>
          </Box>

          {/* Event dates */}
          <Box className={styles['general-wrapper-common']}>
            <Box className={styles['general-title-common']}>
              Event dates
              <Button
                title="Edit"
                sx={{
                  backgroundColor: 'white',
                  minWidth: '1rem',
                  padding: '0.25rem'
                }}
              >
                <MdEditSquare color="green" size={20} />
              </Button>
            </Box>
            <Box className={styles['general-eventdates-table']}>
              <TableReused
                columns={columnsEventDates}
                rows={eventDates}
                total={eventDates.length}
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
                <Button className={styles['general-btn-discard']}>
                  <Typography component="h2" className={styles['general-discard-text']}>
                    Discard
                  </Typography>
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    )
  }
}

export default General
