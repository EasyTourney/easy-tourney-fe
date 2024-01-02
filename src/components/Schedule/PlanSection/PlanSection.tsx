import { Box, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { TimePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { PlanInformationSchema } from '../../../services/validator/plan.validator'
import styles from './PlanSection.module.css'
import { LoadingButton } from '@mui/lab'
import { Autorenew } from '@mui/icons-material'
import { generateSchedule } from '../../../apis/axios/schedule/schedule'
import { useParams } from 'react-router-dom'
import { ScheduleMatchesAPIRes } from '../../../types/common'
import Swal from 'sweetalert2'

interface PlanInformationProps {
  onGenerateSchedule: () => void
}

const PlanSection = ({ onGenerateSchedule }: PlanInformationProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { tournamentId } = useParams()

  const formik = useFormik({
    initialValues: {
      duration: 0,
      betweenTime: 0,
      startTime: null as Dayjs | null,
      endTime: null as Dayjs | null
    },
    validateOnChange: false,
    validationSchema: PlanInformationSchema,
    onSubmit: async (values) => {
      try {
        const planInformation = {
          duration: values.duration,
          betweenTime: values.betweenTime,
          startTime: values.startTime ? dayjs(values.startTime).format('HH:mm:ss') : undefined,
          endTime: values.endTime ? dayjs(values.endTime).format('HH:mm:ss') : undefined
        }

        Swal.fire({
          title: 'Re-generate schedule',
          text: 'Generating a new schedule will discard all previously scheduled data! If you proceed, any existing tournament information will be lost. Do you wish to re-generate?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, re-generate!',
          allowOutsideClick: false
        }).then(async (result) => {
          setIsLoading(true)
          if (result.isConfirmed) {
            const response = (await generateSchedule(Number(tournamentId), planInformation)) as ScheduleMatchesAPIRes
            if (response.success) {
              onGenerateSchedule()
              toast.success('A schedule is generated successfully!')
            }
          }
          setIsLoading(false)
        })
      } catch (error) {
        toast.error('An error occurred while configuring plan information!')
      }
    }
  })
  return (
    <Box className={styles['plan-container']}>
      <Typography variant="h5" className={styles['plan-title']}>
        Plan Information
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Box className={styles['plan-form']}>
          <Box>
            <Box>
              <Typography className={styles['plan-sub-title']}>Match duration (minutes)</Typography>
            </Box>
            <TextField
              error={formik.touched.duration && Boolean(formik.errors.duration)}
              fullWidth
              helperText={formik.touched.duration && formik.errors.duration}
              id="duration"
              name="duration"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="number"
              value={formik.values.duration}
              InputProps={{
                inputProps: { min: 0 }
              }}
            />
          </Box>
          <Box>
            <Box component="label">
              <Typography className={styles['plan-sub-title']}>Time between matches (minutes)</Typography>
            </Box>
            <TextField
              error={formik.touched.betweenTime && Boolean(formik.errors.betweenTime)}
              fullWidth
              helperText={formik.touched.betweenTime && formik.errors.betweenTime}
              id="betweenTime"
              name="betweenTime"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="number"
              value={formik.values.betweenTime}
              InputProps={{
                inputProps: { min: 0 }
              }}
            />
          </Box>
          <Box>
            <Box component="label">
              <Typography className={styles['plan-sub-title']}>Start time of event date</Typography>
            </Box>
            <TimePicker
              ampm={false}
              defaultValue={dayjs()}
              value={formik.values.startTime || null}
              onChange={(value) => (value === null ? dayjs() : formik.setFieldValue('startTime', value))}
              slotProps={{
                textField: {
                  onBlur: formik.handleBlur,
                  error: formik.touched.startTime && Boolean(formik.errors.startTime),
                  helperText: formik.touched.startTime && formik.errors.startTime
                }
              }}
              sx={{ width: '100%' }}
            />
          </Box>
          <Box>
            <Box component="label">
              <Typography className={styles['plan-sub-title']}>End time of event date</Typography>
            </Box>
            <TimePicker
              ampm={false}
              value={formik.values.endTime || null}
              onChange={(value) => formik.setFieldValue('endTime', value)}
              slotProps={{
                textField: {
                  onBlur: formik.handleBlur,
                  error: formik.touched.endTime && Boolean(formik.errors.endTime),
                  helperText: formik.touched.endTime && formik.errors.endTime
                }
              }}
              sx={{ width: '100%' }}
            />
          </Box>
          <Box className={styles['group-btn']}>
            <LoadingButton
              className={styles['generate-btn']}
              variant="contained"
              type="submit"
              loading={isLoading}
              loadingPosition="end"
              endIcon={<Autorenew />}
            >
              {isLoading ? 'Generating...' : 'Generate'}
            </LoadingButton>
          </Box>
        </Box>
      </form>
    </Box>
  )
}

export default PlanSection
