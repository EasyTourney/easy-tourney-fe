/* eslint-disable react/react-in-jsx-scope */
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { useEffect, useState } from 'react'
import styles from './General.module.css'
import { checkLengthDescription } from '../../../utils/function'
import { mockDataEvenDates, mockDataOrganizerTournament } from '../../../data/mockData'
import TableReused from '../../../components/Tables'

const General = () => {
  const [loading, setIsLoading] = useState<boolean>(false)
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
      id: 'event',
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

  return (
    <Box className={styles['general-container']}>
      <Box className={styles['general-wrapper']}>
        <Box component="h2" className={styles['general-info']}>
          General Information
        </Box>
        {/* title */}
        <Box className={styles['general-wrapper-title']}>
          <Box className={styles['general-title-common']}>
            Title:
            <Box component="span" title="Edit">
              <BorderColorIcon className={styles['general-icon-common']} />
            </Box>
          </Box>
          <Box component="span">Tournament A</Box>
        </Box>
        {/* category */}
        <Box className={styles['general-wrapper-common']}>
          <Box className={styles['general-title-common']}>
            Category:
            <Box component="span" title="Edit">
              {' '}
              <BorderColorIcon className={styles['general-icon-common']} />
            </Box>
          </Box>
          <Box component="span">Football</Box>
        </Box>
        {/* Description */}
        <Box className={styles['general-wrapper-common']}>
          <Box className={styles['general-title-common']}>
            Description:
            <Box component="span" title="Edit">
              <BorderColorIcon className={styles['general-icon-common']} />
            </Box>
          </Box>
          <Box
            component="span"
            className={styles['general-description-content']}
            title=" 'Trong khi đó, số bài báo công bố quốc tế của Trường ĐH Mở TP.HCM tăng từ 16 bài năm 2017 Trong khi đó, số bài báo công bố quốc tế của Trường ĐH Mở TP.HCM tăng từ 16 bài năm 2017 Trong khi đó, số bài báo công bố quốc tế của Trường ĐH Mở TP.HCM tăng từ 16 bài năm 2017Trong khi đó, số bài báo công bố quốc tế của Trường ĐH Mở TP.HCM tăng từ 16 bài năm 2017Trong khi đó, số bài báo công bố quốc tế của Trường ĐH Mở TP.HCM tăng từ 16 bài năm 2017 Trong khi đó, số bài báo công bố quốc tế của Trường ĐH Mở TP.HCM tăng từ 16 bài năm 2017'"
          >
            {checkLengthDescription(
              'Trong khi đó, số bài báo công bố quốc tế của Trường ĐH Mở TP.HCM tăng từ 16 bài năm 2017 Trong khi đó, số bài báo công bố quốc tế của Trường ĐH Mở TP.HCM tăng từ 16 bài năm 2017 Trong khi đó, số bài báo công bố quốc tế của Trường ĐH Mở TP.HCM tăng từ 16 bài năm 2017Trong khi đó, số bài báo công bố quốc tế của Trường ĐH Mở TP.HCM tăng từ 16 bài năm 2017Trong khi đó, số bài báo công bố quốc tế của Trường ĐH Mở TP.HCM tăng từ 16 bài năm 2017 Trong khi đó, số bài báo công bố quốc tế của Trường ĐH Mở TP.HCM tăng từ 16 bài năm 2017',
              500
            )}
          </Box>
        </Box>
        {/* Organizer */}
        <Box className={styles['general-wrapper-common']}>
          <Box className={styles['general-title-common']}>
            Organizer:
            <Box component="span" title="Edit">
              <BorderColorIcon className={styles['general-icon-common']} />
            </Box>
          </Box>
          <Box className={styles['general-organizer-table']}>
            <TableReused
              columns={columnsOrganizer}
              rows={mockDataOrganizerTournament}
              total={mockDataOrganizerTournament.length}
              showActions={false}
              hidePagination={false}
              loading={loading}
            />
          </Box>
        </Box>

        {/* Event dates */}
        <Box className={styles['general-wrapper-common']}>
          <Box className={styles['general-title-common']}>
            Event dates:
            <Box component="span" title="Edit">
              {' '}
              <BorderColorIcon className={styles['general-icon-common']} />
            </Box>
          </Box>
          <Box className={styles['general-organizer-table']}>
            <TableReused
              columns={columnsEventDates}
              rows={mockDataEvenDates}
              total={mockDataEvenDates.length}
              showActions={false}
              hidePagination={false}
              loading={loading}
            />
          </Box>
        </Box>
        {/* Discard tournament */}
        <Box className={styles['general-wrapper-common']}>
          <Box className={styles['general-discard-content']}>Discard this tournament:</Box>
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
      </Box>
    </Box>
  )
}

export default General
