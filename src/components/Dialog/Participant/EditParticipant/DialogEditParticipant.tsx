import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import styles from './DialogEditParticipant.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { Participant } from '../../../../types/participant'
import { ParticipantSchema } from '../../../../services/validator/participant.validator'
import { updateParticipants } from '../../../../redux/reducers/participants/participants.reducer'
import { useParams } from 'react-router-dom'

interface DialogEditParticipantProps {
  editParticipant: (data: Participant, tournamentId: number) => Promise<any>
  onOpen: boolean
  onClose: () => void
}

const DialogEditParticipant = ({ editParticipant, onOpen, onClose }: DialogEditParticipantProps) => {
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const dispatch = useDispatch()
  const selectedParticipant = useSelector((state: RootState) => state.participant.selectedParticipant)
  const { tournamentId } = useParams()

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
          teamId: selectedParticipant?.teamId || -1,
          teamName: values.teamName,
          playerCount: selectedParticipant?.playerCount || 0
        }
        const response = await editParticipant(participantData, Number(tournamentId))

        if (response.success) {
          const newParticipant = {
            ...response.data
          }
          dispatch(updateParticipants(newParticipant))
          toast.success('A participant is updated successfully!')
          onClose()
        } else {
          setError(true)
          setErrorMessage(response.errorMessage['Invalid Error'])
        }
      } catch (error) {
        toast.error('An error occurred while updating participant!')
        onClose()
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
        teamName: selectedParticipant?.teamName || ''
      })
    }
  }, [onOpen])

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      if (formik.isValid) {
        onClose()
      }
    }
  }

  return (
    <Dialog onClick={handleClickOutside} onClose={onClose} open={onOpen} PaperProps={{ sx: { borderRadius: '1rem' } }}>
      <DialogTitle className={styles['dialog-title']}>Edit Participant</DialogTitle>
      {error && (
        <Alert className={styles['alert-message']} severity="error">
          {errorMessage}
        </Alert>
      )}
      <DialogContent>
        <form onSubmit={formik.handleSubmit} className={styles['participant-form']}>
          <Stack spacing={2} width={'60vw'} maxWidth={450}>
            <Box component="label" sx={{ fontWeight: 'bold' }}>
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
            <Button variant="outlined" onClick={onClose}>
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

export { DialogEditParticipant }
