import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'
import { Alert, Autocomplete, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styles from './DialogAddOrganizerInTournament.module.css'
import { getAllOrganizers } from '../../../../../apis/axios/organizers/organizer'
import { setSelectOrganizer } from '../../../../../redux/reducers/organizers/organizers.reducer'
import { Organizer } from '../../../../../types/organizer'
import { getTournamentById } from '../../../../../apis/axios/tournaments/tournament'
import { editGeneralTournament } from '../../../../../apis/axios/tournaments/generalTournaments'
import { RootState } from '../../../../../redux/store'
import { setSelectedOrganizer } from '../../../../../redux/reducers/general/general.reducer'
import { updatedOrganizer } from '../../../../../redux/reducers/tournaments/tournaments.reducer'

interface OrganizerProps {
  open: boolean
  setOpen: (value: boolean) => void
}

const DiaLogAddOrganizerInTournamnet = ({ open, setOpen }: OrganizerProps) => {
  const dispatch = useDispatch()
  const [errorCategory, setErrorCategory] = useState<boolean>(false)
  const selectOrganizers = useSelector((state: any) => state.organizer.selectOrganizers)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const allFullNames = selectOrganizers.map((organizer: any) => organizer.fullName)
  const tournament = useSelector((state: RootState) => {
    const selectedTournament = state.tournament.general
    if (Array.isArray(selectedTournament)) {
      return selectedTournament[0] || {}
    }
    return selectedTournament
  })
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllOrganizers()
        const formattedData = response.data.map((organizer: { id: any; firstName: any; lastName: any; email: any }) => {
          const fullNameWithEmail = `${organizer.firstName} ${organizer.lastName} (${organizer.email})`
          return {
            id: organizer.id,
            fullName: fullNameWithEmail
          }
        })
        dispatch(setSelectOrganizer(formattedData))
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  const handleClose = () => {
    setOpen(false)
    formik.resetForm()
  }

  const formik = useFormik({
    initialValues: {
      organizers: ''
    },
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        const match = values.organizers.match(/^(.*) \((.*)\)$/)
        if (match) {
          const fullName = match[1]
          const selectedOrganizer = selectOrganizers.find((organizer: any) => organizer.fullName.includes(fullName))

          if (selectedOrganizer) {
            const id = selectedOrganizer.id
            const currentOrganizerIds = await getCurrentOrganizerIds(tournament.id)

            const isDuplicate = currentOrganizerIds.includes(id)

            if (!isDuplicate) {
              const updatedOrganizerIds = [...currentOrganizerIds, id]
              const organizer = await editOrganizersInTournament(tournament.id, updatedOrganizerIds)
              const organizerUpdate = organizer.organizers
              dispatch(setSelectedOrganizer(organizerUpdate))
              dispatch(updatedOrganizer(organizerUpdate))
              toast.success('Category updated successfully!')
              formik.resetForm()
              handleClose()
            } else {
              setErrorMessage('Organizer has already existed !')
            }
          } else {
            console.error('Selected organizer not found')
          }
        } else {
          console.error('Invalid organizers format')
        }
      } catch (error) {
        console.error(error)
      }
    }
  })

  useEffect(() => {
    if (open) {
      formik.resetForm()
      formik.setValues({
        organizers: ''
      })
    }
  }, [open])
  const getCurrentOrganizerIds = async (tournamentId: number): Promise<number[]> => {
    try {
      const response = await getTournamentById(tournamentId)
      if (response.data) {
        const organizers = response.data.organizers
        const organizerIds = organizers.map((organizer: any) => organizer.id)
        return organizerIds
      } else {
        console.error('Error getting current organizer IDs')
        return []
      }
    } catch (error) {
      console.error(error)
      return []
    }
  }

  const editOrganizersInTournament = async (tournamentId: number, organizerIds: number[]) => {
    try {
      const updateResponse = await editGeneralTournament(tournamentId, { organizers: organizerIds })
      if (updateResponse.data) {
        const organizerUpdate = updateResponse.data
        return organizerUpdate
      } else {
        console.error('Error updating organization information:')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleBlurCategory = () => {
    if (formik.errors.organizers) {
      setErrorCategory(false)
    }
    if (selectedValue === '' || selectedValue === null) {
      setErrorCategory(true)
    }
  }
  const handleInputChange = (event: React.ChangeEvent<object>, value: string | null) => {
    formik.setFieldValue('organizers', value && value?.trim())
  }

  const selectedValue = formik?.values?.organizers
  const isOptionExists = allFullNames?.some((option: Organizer) => option.email === selectedValue)
  return (
    <Dialog open={open} onClose={handleClose}>
      <Box sx={{ p: 2, minWidth: '300px' }}>
        <DialogTitle className={styles['dialog-title']}>Edit Organizer</DialogTitle>
        {errorMessage && (
          <Alert className={styles['alert-message']} severity="error" onClose={() => setErrorMessage(null)}>
            {errorMessage}
          </Alert>
        )}
        <form onSubmit={formik.handleSubmit}>
          <DialogContent sx={{ width: '100%' }}>
            <FormControl fullWidth className={styles['form-organizer']}>
              <Box component="label" className={styles['title']}>
                Organizer
              </Box>
              <Autocomplete
                disableClearable={formik?.values?.organizers ? false : true}
                options={allFullNames}
                onChange={(event, value) => {
                  formik.setFieldValue('organizers', value)
                }}
                onBlur={handleBlurCategory}
                value={isOptionExists ? selectedValue : null}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: `${errorCategory && '#d32f2f'}`
                  },

                  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: `${errorCategory && '#d32f2f'}`
                  },

                  '& .MuiOutlinedInput-root': {
                    padding: '2px'
                  }
                }}
                ListboxProps={{
                  style: {
                    maxHeight: '195px',
                    whiteSpace: 'pre-wrap'
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id="organizers"
                    onChange={(event) => {
                      formik.handleChange(event)
                      handleInputChange(event, event.target.value)
                    }}
                    error={
                      (selectedValue === '' || selectedValue === null) &&
                      errorCategory === false &&
                      formik.touched.organizers &&
                      Boolean(formik.errors.organizers)
                    }
                    helperText={
                      (selectedValue === '' || selectedValue === null) &&
                      errorCategory === false &&
                      formik.touched.organizers &&
                      formik.errors.organizers
                    }
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        padding: '2px'
                      },
                      '& .MuiFormHelperText-root': {
                        marginLeft: '2px'
                      }
                    }}
                  />
                )}
              />
              {errorCategory && (selectedValue === '' || selectedValue === null) ? (
                <Box component="span" className={styles['organizer-error']}>
                  Category is required
                </Box>
              ) : null}
            </FormControl>
          </DialogContent>
          <DialogActions className={styles['group-btn']}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </DialogActions>
        </form>
      </Box>
    </Dialog>
  )
}

export default DiaLogAddOrganizerInTournamnet
