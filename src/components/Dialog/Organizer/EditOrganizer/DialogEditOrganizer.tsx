import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import styles from './DialogEditOrganizer.module.css'
import { OrganizerSchema } from '../../../../services/validator/organizer.validator'
import { DatePicker } from '@mui/x-date-pickers'
import { useDispatch, useSelector } from 'react-redux'
import { Organizer } from '../../../../types/organizer'
import { updateOrganizer } from '../../../../redux/reducers/organizers/organizers.reducer'
import { RootState } from '../../../../redux/store'
import dayjs, { Dayjs } from 'dayjs'

interface DialogEditOrganizerProps {
  editOrganizer: (data: Organizer) => Promise<any>
  onOpen: boolean
  onClose: () => void
}

const DialogEditOrganizer = ({ editOrganizer, onOpen, onClose }: DialogEditOrganizerProps) => {
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const dispatch = useDispatch()
  const selectedOrganizer = useSelector((state: RootState) => state.organizer.selectedOrganizer)

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: null as Dayjs | null
    },
    validationSchema: OrganizerSchema,
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
        setIsSaving(true)
        const organizerData = {
          id: selectedOrganizer?.id || -1,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          dateOfBirth: values.dateOfBirth ? dayjs(values.dateOfBirth).format('YYYY-MM-DD') : undefined
        }
        const response = await editOrganizer(organizerData)

        if (response.success) {
          const updatedOrganizer = {
            ...response.data,
            fullName: response.data.firstName + ' ' + response.data.lastName,
            dateOfBirth: response.data.dateOfBirth ? dayjs(response.data.dateOfBirth).format('DD/MM/YYYY') : ''
          }
          dispatch(updateOrganizer(updatedOrganizer))
          toast.success('An organizer is updated successfully!')
          handleClose()
        } else {
          setError(true)
          setErrorMessage(response.errorMessage['Invalid Error'])
        }
      } catch (error) {
        toast.error('An error occurred while updating organizer!')
        handleClose()
      } finally {
        setIsSaving(false)
      }
    }
  })

  useEffect(() => {
    if (onOpen) {
      setError(false)
      setErrorMessage('')
      formik.resetForm()
      formik.setValues({
        firstName: selectedOrganizer?.firstName || '',
        lastName: selectedOrganizer?.lastName || '',
        email: selectedOrganizer?.email || '',
        phoneNumber: selectedOrganizer?.phoneNumber || '',
        dateOfBirth: selectedOrganizer?.dateOfBirth ? dayjs(selectedOrganizer.dateOfBirth) : null
      })
    }
  }, [onOpen])

  const handleClose = () => {
    onClose()
  }

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      if (formik.isValid) {
        handleClose()
      }
    }
  }

  const disableToday = (date: any) => {
    return dayjs(date).isSame(dayjs().startOf('day'))
  }

  return (
    <Dialog onClick={handleClickOutside} onClose={handleClose} open={onOpen}>
      <DialogTitle className={styles['dialog-title']}>Edit Organizer</DialogTitle>
      {error && (
        <Alert className={styles['alert-message']} severity="error">
          {errorMessage}
        </Alert>
      )}
      <DialogContent>
        <form onSubmit={formik.handleSubmit} className={styles['organizer-form']}>
          <Stack>
            <Box component="label" sx={{ fontWeight: 'bold' }}>
              First name <span className={styles['required-marked']}>*</span>
            </Box>
            <TextField
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              fullWidth
              helperText={formik.touched.firstName && formik.errors.firstName}
              id="firstName"
              name="firstName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
          </Stack>
          <Stack>
            <Box component="label" sx={{ fontWeight: 'bold' }}>
              Last name <span className={styles['required-marked']}>*</span>
            </Box>
            <TextField
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              fullWidth
              helperText={formik.touched.lastName && formik.errors.lastName}
              id="lastName"
              name="lastName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
          </Stack>
          <Stack>
            <Box component="label" sx={{ fontWeight: 'bold' }}>
              Email <span className={styles['required-marked']}>*</span>
            </Box>
            <TextField
              error={formik.touched.email && Boolean(formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              id="email"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </Stack>
          <Stack>
            <Box component="label" sx={{ fontWeight: 'bold' }}>
              Phone number <span className={styles['required-marked']}>*</span>
            </Box>
            <TextField
              error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
              fullWidth
              helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
              id="phoneNumber"
              name="phoneNumber"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phoneNumber}
            />
          </Stack>
          <Stack>
            <Box component="label" sx={{ fontWeight: 'bold' }}>
              Date of birth
            </Box>
            <DatePicker
              format="DD/MM/YYYY"
              disableFuture
              shouldDisableDate={disableToday}
              value={formik.values.dateOfBirth || null}
              onChange={(date: any) => {
                formik.setFieldValue('dateOfBirth', date)
              }}
              slotProps={{
                textField: {
                  error: !!formik.errors.dateOfBirth,
                  helperText: formik.errors.dateOfBirth ? String(formik.errors.dateOfBirth) : undefined,
                  onBlur: formik.handleBlur
                }
              }}
            />
          </Stack>
          <DialogActions className={styles['group-btn']}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={isSaving}>
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { DialogEditOrganizer }
