import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  InputAdornment,
  Stack,
  TextField
} from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import styles from './DialogAddOrganizer.module.css'
import { Email, Phone } from '@mui/icons-material'
import { OrganizerSchema } from '../../../../services/validator/organizer.validator'
import { DatePicker } from '@mui/x-date-pickers'
import { useDispatch, useSelector } from 'react-redux'
import { Organizer } from '../../../../types/organizer'
import { setOrganizer } from '../../../../redux/reducers/organizers/organizers.reducer'
import { RootState } from '../../../../redux/store'
import moment from 'moment'

interface DialogAddOrganizerProps {
  addOrganizer: (data: Organizer) => Promise<any>
}

const DialogAddOrganizer = ({ addOrganizer }: DialogAddOrganizerProps) => {
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const organizer = useSelector((state: RootState) => state.organizer.organizers)
  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    formik.resetForm()
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: ''
    },
    validationSchema: OrganizerSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        setIsSaving(true)
        const organizerData = {
          id: 0,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          dateOfBirth: values?.dateOfBirth !== '' ? values.dateOfBirth : undefined
        }
        const response = await addOrganizer(organizerData)

        if (response.success) {
          const newOrganizer = {
            ...response.data,
            totalTournament: 0,
            fullName: response.data.firstName + ' ' + response.data.lastName,
            dateOfBirth: moment(response.data.dateOfBirth).format('DD/MM/YYYY'),
            createdAt: moment(response.data.createdAt).format('DD/MM/YYYY HH:mm A')
          }
          const updatedOrganizers = [newOrganizer, ...organizer].slice(0, 10)
          dispatch(setOrganizer(updatedOrganizers))
          toast.success('An organizer is created successfully!')
        } else {
          toast.error('An error occurred while adding new organizer!')
        }
        formik.resetForm()
      } catch (error) {
        toast.error('An error occurred while adding new organizer!')
      } finally {
        setIsSaving(false)
        handleClose()
      }
    }
  })

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      if (formik.isValid) {
        handleClose()
      }
    }
  }

  return (
    <Box sx={{ textAlign: 'center', paddingTop: '30px' }}>
      <Button variant="contained" onClick={handleClickOpen} className={styles['add-organizer-btn']}>
        Add new organizer
      </Button>
      <Dialog
        onClick={handleClickOutside}
        onClose={handleClose}
        open={open}
        PaperProps={{ sx: { borderRadius: '1rem' } }}
      >
        <DialogTitle className={styles['dialog-title']}>ADD ORGANIZER</DialogTitle>
        <Divider />
        <DialogContent>
          <form onSubmit={formik.handleSubmit} className={styles['organiser-form']}>
            <Stack spacing={2} width={'60vw'} maxWidth={450}>
              <TextField
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                fullWidth
                helperText={formik.touched.firstName && formik.errors.firstName}
                id="firstName"
                label="First name"
                name="firstName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
            </Stack>
            <Stack spacing={2} width={'60vw'} maxWidth={450}>
              <TextField
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                fullWidth
                helperText={formik.touched.lastName && formik.errors.lastName}
                id="lastName"
                label="Last name"
                name="lastName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.lastName}
              />
            </Stack>
            <Stack spacing={2} width={'60vw'} maxWidth={450}>
              <TextField
                error={formik.touched.email && Boolean(formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                id="email"
                label="Email"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  )
                }}
              />
            </Stack>
            <Stack spacing={2} width={'60vw'} maxWidth={450}>
              <TextField
                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                fullWidth
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                id="phoneNumber"
                label="Phone number"
                name="phoneNumber"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  )
                }}
              />
            </Stack>
            <Stack spacing={2} width={'60vw'} maxWidth={450}>
              <DatePicker
                label="Date of birth"
                format="DD/MM/YYYY"
                disableFuture
                value={formik.values.dateOfBirth || undefined}
                onChange={(date) => formik.setFieldValue('dateOfBirth', date)}
              />
            </Stack>
            <DialogActions className={styles['group-btn']}>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" type="submit" disabled={isSaving}>
                Add
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export { DialogAddOrganizer }
