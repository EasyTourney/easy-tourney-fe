import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { TimePicker } from '@mui/x-date-pickers'
import { useFormik } from 'formik'
import { Alert, Box, Typography } from '@mui/material'
import styles from './EditTimeEvent.module.css'
import dayjs, { Dayjs } from 'dayjs'
import { toast } from 'react-toastify'
import { ScheduleSchema } from '../../../../services/validator/schedule.validator'
import { EditEventTimeApi } from '../../../../apis/axios/schedule/schedule'
import { useParams } from 'react-router-dom'
import { ScheduleTimeEventAPIRes } from '../../../../types/common'
interface EditTimeEventProps {
  editEvent: boolean
  setEditEvent: (value: boolean) => void
  eventDateId?: number
  render: () => void
}

const EditTimeEvent = ({ editEvent, setEditEvent, eventDateId, render }: EditTimeEventProps) => {
  const { tournamentId } = useParams()
  const [error, setError] = React.useState<string>()
  const handleClose = () => {
    setEditEvent(false)
  }

  const formik = useFormik({
    initialValues: {
      startTimeEventDate: null as Dayjs | null,
      endTimeEventDate: null as Dayjs | null
    },
    validationSchema: ScheduleSchema,
    onSubmit: async (values) => {
      try {
        const planInformation = {
          startTime: values.startTimeEventDate ? dayjs(values.startTimeEventDate).format('HH:mm') : undefined,
          endTime: values.endTimeEventDate ? dayjs(values.endTimeEventDate).format('HH:mm') : undefined
        }
        const res = (await EditEventTimeApi(
          Number(tournamentId),
          planInformation,
          Number(eventDateId)
        )) as ScheduleTimeEventAPIRes
        if (res?.success) {
          toast.success('Edit event time success !')
          render()
          handleClose()
        } else {
          setError(res?.errorMessage['Invalid Error'])
        }
      } catch (error) {
        toast.error('An error occurred while configuring plan information!')
      }
    }
  })

  return (
    <Dialog
      open={editEvent}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Edit time event'}</DialogTitle>
      {error && (
        <Alert className={styles['alert-message']} severity="error">
          {error}
        </Alert>
      )}

      <DialogContent className={styles['dialog-content-wrapper']}>
        <form onSubmit={formik.handleSubmit} className={styles['edit-time-event-form']}>
          <Box>
            <Box component="label">
              <Typography className={styles['edit-time-event-title']}>Start time of event date</Typography>
            </Box>
            <TimePicker
              ampm={false}
              defaultValue={dayjs()}
              value={formik.values.startTimeEventDate || null}
              onChange={(value) => (value === null ? dayjs() : formik.setFieldValue('startTimeEventDate', value))}
              slotProps={{
                textField: {
                  onBlur: formik.handleBlur,
                  error: formik.touched.startTimeEventDate && Boolean(formik.errors.startTimeEventDate),
                  helperText: formik.touched.startTimeEventDate && formik.errors.startTimeEventDate
                }
              }}
              sx={{
                width: '100%',
                '& .MuiFormHelperText-root': {
                  marginLeft: 0
                }
              }}
            />
          </Box>
          <Box>
            <Box component="label">
              <Typography className={styles['edit-time-event-title']}>End time of event date</Typography>
            </Box>
            <TimePicker
              ampm={false}
              value={formik.values.endTimeEventDate || null}
              onChange={(value) => formik.setFieldValue('endTimeEventDate', value)}
              slotProps={{
                textField: {
                  onBlur: formik.handleBlur,
                  error: formik.touched.endTimeEventDate && Boolean(formik.errors.endTimeEventDate),
                  helperText: formik.touched.endTimeEventDate && formik.errors.endTimeEventDate
                }
              }}
              sx={{
                width: '100%',
                '& .MuiFormHelperText-root': {
                  marginLeft: 0
                }
              }}
            />
          </Box>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button style={{ marginLeft: '12px' }} variant="contained" type="submit">
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditTimeEvent
