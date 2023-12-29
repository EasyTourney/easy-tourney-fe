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

const PlanSection = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

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
        setIsLoading(true)
        const planInformation = {
          duration: values.duration,
          betweenTime: values.betweenTime,
          startTime: values.startTime ? dayjs(values.startTime).format('HH:mm') : undefined,
          endTime: values.endTime ? dayjs(values.endTime).format('HH:mm') : undefined
        }
        console.log(planInformation)
      } catch (error) {
        toast.error('An error occurred while configuring plan information!')
      } finally {
        setTimeout(() => setIsLoading(false), 3000)
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
