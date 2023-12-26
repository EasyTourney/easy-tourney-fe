import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import styles from './DialogAddOrganizer.module.css'
import { OrganizerSchema } from '../../../../services/validator/organizer.validator'
import { DatePicker } from '@mui/x-date-pickers'
import { Organizer } from '../../../../types/organizer'
import dayjs from 'dayjs'
import { AddCircle } from '@mui/icons-material'

interface DialogAddOrganizerProps {
  addOrganizer: (data: Organizer) => Promise<any>
  onAdd: () => void
}

const DialogAddOrganizer = ({ addOrganizer, onAdd }: DialogAddOrganizerProps) => {
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleClickOpen = () => {
    setError(false)
    setErrorMessage('')
    formik.resetForm()
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: null
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
          dateOfBirth: values.dateOfBirth ? dayjs(values.dateOfBirth).format('YYYY-MM-DD') : undefined
        }
        const response = await addOrganizer(organizerData)

        if (response.success) {
          onAdd()
          toast.success('An organizer is created successfully!')
          handleClose()
        } else {
          setError(true)
          setErrorMessage(response.errorMessage['Invalid Error'])
        }
      } catch (error) {
        toast.error('An error occurred while adding new organizer!')
        handleClose()
      } finally {
        setIsSaving(false)
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

  const disableToday = (date: any) => {
    return dayjs(date).isSame(dayjs().startOf('day'))
  }

  return (
    <Box sx={{ textAlign: 'center', paddingTop: '1rem' }}>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        style={{
          background: 'linear-gradient(195deg, rgb(102, 187, 106), rgb(67, 160, 71))',
          color: 'white'
        }}
        endIcon={<AddCircle />}
      >
        Add new
      </Button>
      <Dialog onClick={handleClickOutside} onClose={handleClose} open={open}>
        <DialogTitle className={styles['dialog-title']}>Create Organizer</DialogTitle>
        {error && (
          <Alert className={styles['alert-message']} severity="error">
            {errorMessage}
          </Alert>
        )}
        <DialogContent>
          <form onSubmit={formik.handleSubmit} className={styles['organizer-form']}>
            <Stack>
              <Box component="label" sx={{ fontWeight: '500' }}>
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
              <Box component="label" sx={{ fontWeight: '500' }}>
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
              <Box component="label" sx={{ fontWeight: '500' }}>
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
              <Box component="label" sx={{ fontWeight: '500' }}>
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
              <Box component="label" sx={{ fontWeight: '500' }}>
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
                    helperText: formik.errors.dateOfBirth,
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
    </Box>
  )
}

export { DialogAddOrganizer }
