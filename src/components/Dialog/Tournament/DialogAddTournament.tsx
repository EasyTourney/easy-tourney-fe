import 'react-day-picker/dist/style.css'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { FormControl, FormHelperText, MenuItem, Select, TextField } from '@mui/material'
import { format, isSameDay } from 'date-fns'
import { DayClickEventHandler, DateFormatter, DayPicker } from 'react-day-picker'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { categoriesSelector } from '../../../redux/reducers/categories/categories.selectors'
import { getCategories } from '../../../redux/reducers/categories/categories.slice'
import { TournamentSchema } from '../../../services/validator/tournament.validator'
import { CategoryName } from '../../../types/category'
import { ThunkDispatch } from '@reduxjs/toolkit'

interface TournamentProps {
  open: boolean
  setOpen: (value: boolean) => void
}

const DialogAddTournament = ({ open, setOpen }: TournamentProps) => {
  const [selectedDays, setSelectedDays] = useState<Date[]>([])
  const [isSaving, setIsSaving] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  const { listCategory } = useSelector(categoriesSelector)
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const today = new Date()

  const seasonEmoji: Record<string, string> = {
    winter: '⛄️',
    spring: '🌸',
    summer: '🌻',
    autumn: '🍂'
  }

  const getSeason = (month: Date): string => {
    const monthNumber = month.getMonth()
    if (monthNumber >= 0 && monthNumber < 3) return 'winter'
    if (monthNumber >= 3 && monthNumber < 6) return 'spring'
    if (monthNumber >= 6 && monthNumber < 9) return 'summer'
    else return 'autumn'
  }

  const formatCaption: DateFormatter = (month, options) => {
    const season = getSeason(month)

    const year = month.getFullYear()
    return (
      <>
        <Box component="span" role="img" aria-label={season}>
          {seasonEmoji[season]}
        </Box>
        {format(month, 'LLLL', { locale: options?.locale })} {year}
      </>
    )
  }

  const handleDayClick: DayClickEventHandler = (day, modifiers) => {
    if (modifiers.disabled) {
      return
    }

    const newSelectedDays = [...selectedDays]

    if (modifiers.selected) {
      const index = selectedDays.findIndex((selectedDay) => isSameDay(day, selectedDay))
      newSelectedDays.splice(index, 1)
    } else {
      newSelectedDays.push(day)
    }
    setSelectedDays(newSelectedDays)
  }
  const handleResetClick = () => setSelectedDays([])

  const disabledDays = {
    before: today // Prevents selection of days before the current date
  }

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  useEffect(() => {
    if (selectedDays?.length > 0) {
      setIsSaving(false)
    }
  }, [selectedDays])

  let footer = (
    <Box component="span" sx={{ padding: '0 0.5rem', fontSize: '0.9rem' }}>
      Please pick one or more days.
    </Box>
  )

  const formik = useFormik({
    initialValues: {
      title: '',
      selectCategory: ''
    },
    validationSchema: TournamentSchema,
    onSubmit: async (value) => {
      try {
        if (selectedDays.length === 0) {
          setError(true)
        } else {
          toast.success('Tournament is created successfully!')
          formik.resetForm()

          setError(false)
          handleResetClick()
          handleClose()
          if (selectedDays) {
            const formatDate = selectedDays?.map((day) => moment(day).format('YYYY-MM-DD'))
            console.log({ value, formatDate }) // consoleLog data
          }
        }
      } catch (error) {
        toast.error('An error occurred while creating the catalog!')
      }
    }
  })
  if (selectedDays.length > 0)
    footer = (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 0.5rem' }}>
        <Box sx={{ fontSize: '0.9rem', display: 'flex', gap: '0.5rem' }}>
          You selected{' '}
          <Box component="span" sx={{ fontStyle: 'italic', color: 'red' }}>
            {selectedDays.length}
          </Box>{' '}
          days.{' '}
        </Box>
        <Button onClick={handleResetClick} title="Reset">
          {' '}
          <RestartAltOutlinedIcon />
        </Button>
      </Box>
    )
  const handleClose = () => {
    setOpen(false)
    formik.resetForm()
    setError(false)
  }
  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      if (formik.isValid) {
        handleClose()
      }
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        onClick={handleClickOutside}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          {'CREATE TOURNAMENT'}
        </DialogTitle>{' '}
        {/* search font beautiful more */}
        <form onSubmit={formik.handleSubmit}>
          <DialogContent
            sx={{
              paddingTop: '1rem !important',
              width: '400px',
              transition: 'height 0.3s ease-in-out',
              height: 'auto'
            }}
          >
            <FormControl fullWidth sx={{ mb: '1rem' }}>
              <Box component="label" sx={{ fontWeight: 'bold', paddingBottom: '0.2rem' }}>
                Title:
              </Box>
              <TextField
                id="title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                variant="outlined"
                placeholder="Enter your title"
                sx={{
                  '& .MuiOutlinedInput-input': {
                    padding: '9px 10px'
                  },
                  '& .MuiInputLabel-root': {
                    top: '-5px'
                  }
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: '1rem' }}>
              <Box component="label" sx={{ fontWeight: 'bold', paddingBottom: '0.2rem' }}>
                Category:
              </Box>
              <Select
                labelId="demo-simple-select-label"
                id="selectCategory"
                name="selectCategory"
                value={formik.values.selectCategory}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.selectCategory && Boolean(formik.errors.selectCategory)}
                displayEmpty
                sx={{
                  '& .MuiOutlinedInput-input': {
                    padding: '9px 10px'
                  }
                }}
              >
                <MenuItem value="">
                  <em>--Choose--</em>
                </MenuItem>
                {listCategory?.map((category: CategoryName) => (
                  <MenuItem value={category.categoryName} key={category.categoryId}>
                    {category.categoryName}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText sx={{ color: 'red' }}>
                {formik.touched.selectCategory && formik.errors.selectCategory}
              </FormHelperText>
            </FormControl>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Box component="label" sx={{ fontWeight: 'bold' }}>
                Event dates:{' '}
                {error && (
                  <Box component="span" sx={{ fontSize: '0.75rem', color: 'red', fontWeight: '400' }}>
                    Event dates is required
                  </Box>
                )}
              </Box>
              <DayPicker
                onDayClick={handleDayClick}
                selected={selectedDays}
                disabled={disabledDays}
                footer={footer}
                formatters={{ formatCaption }}
                fromYear={2020}
                toYear={2025}
                mode="multiple"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" disabled={isSaving} variant="contained">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default DialogAddTournament
