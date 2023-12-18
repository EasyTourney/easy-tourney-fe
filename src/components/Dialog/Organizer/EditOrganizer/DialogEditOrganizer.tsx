import {
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
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import styles from './DialogEditOrganizer.module.css'
import { Email, Phone } from '@mui/icons-material'
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
  const organizers = useSelector((state: RootState) => state.organizer.organizers)
  const dispatch = useDispatch()
  const selectedOrganizer = useSelector((state: RootState) => state.organizer.selectedOrganizer)

  useEffect(() => {
    formik.setValues({
      firstName: selectedOrganizer?.firstName || '',
      lastName: selectedOrganizer?.lastName || '',
      email: selectedOrganizer?.email || '',
      phoneNumber: selectedOrganizer?.phoneNumber || '',
      dateOfBirth: selectedOrganizer?.dateOfBirth ? dayjs(selectedOrganizer.dateOfBirth) : null
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizers, selectedOrganizer])

  const handleClose = () => {
    onClose()
    formik.resetForm()
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: null as Dayjs | null
    },
    validationSchema: OrganizerSchema,
    validateOnChange: false,
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
            dateOfBirth: response.data.dateOfBirth ? dayjs(response.data.dateOfBirth).format('DD/MM/YYYY') : '--'
          }
          dispatch(updateOrganizer(updatedOrganizer))
          toast.success('An organizer is updated successfully!')
        } else {
          toast.error(response.errorMessage['Invalid Error'])
        }
        formik.resetForm()
      } catch (error) {
        toast.error('An error occurred while updating organizer!')
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
    <Dialog
      onClick={handleClickOutside}
      onClose={handleClose}
      open={onOpen}
      PaperProps={{ sx: { borderRadius: '1rem' } }}
    >
      <DialogTitle className={styles['dialog-title']}>EDIT ORGANIZER</DialogTitle>
      <Divider />
      <DialogContent>
        <form onSubmit={formik.handleSubmit} className={styles['organizer-form']}>
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
