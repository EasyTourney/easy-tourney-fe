import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import styles from './DialogAddParticipant.module.css'
import { Participant } from '../../../../types/participant'
import { ParticipantSchema } from '../../../../services/validator/participant.validator'
import { useParams } from 'react-router-dom'
import { AddCircle } from '@mui/icons-material'

interface DialogAddParticipantProps {
  addParticipant: (data: Participant, tournamentId: number) => Promise<any>
  onAdd: () => void
}

const DialogAddParticipant = ({ addParticipant, onAdd }: DialogAddParticipantProps) => {
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const { tournamentId } = useParams()

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
      teamName: ''
    },
    validationSchema: ParticipantSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        setIsSaving(true)
        const participantData = {
          teamId: 0,
          teamName: values.teamName,
          playerCount: 0
        }
        const response = await addParticipant(participantData, Number(tournamentId))

        if (response.success) {
          onAdd()
          toast.success('A participant is created successfully!')
          handleClose()
        } else {
          setError(true)
          setErrorMessage(response.errorMessage['Invalid Error'])
        }
      } catch (error) {
        toast.error('An error occurred while adding new participant!')
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

  return (
    <Box sx={{ textAlign: 'center', paddingTop: '10px' }}>
      <Button
        className={styles['btn-add']}
        variant="contained"
        style={{
          background: 'linear-gradient(195deg, rgb(102, 187, 106), rgb(67, 160, 71))',
          color: 'white'
        }}
        onClick={handleClickOpen}
        endIcon={<AddCircle />}
      >
        Add new
      </Button>
      <Dialog
        onClick={handleClickOutside}
        onClose={handleClose}
        open={open}
        PaperProps={{ sx: { borderRadius: '1rem' } }}
      >
        <DialogTitle className={styles['dialog-title']}>Add Participant</DialogTitle>
        {error && (
          <Alert className={styles['alert-message']} severity="error">
            {errorMessage}
          </Alert>
        )}
        <DialogContent>
          <form onSubmit={formik.handleSubmit} className={styles['participant-form']}>
            <Stack spacing={2} width={'60vw'} maxWidth={450}>
              <Box component="label" sx={{ fontWeight: '500' }}>
                Team name <span className={styles['required-marked']}>*</span>
              </Box>
              <TextField
                error={formik.touched.teamName && Boolean(formik.errors.teamName)}
                fullWidth
                helperText={formik.touched.teamName && formik.errors.teamName}
                id="teamName"
                name="teamName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.teamName}
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

export { DialogAddParticipant }
