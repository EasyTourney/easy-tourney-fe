import { useState } from 'react'
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import CategorySchema from './category.validator'
interface AddCategoryProps {
  categories: { id: number; categoryName: string }[]
}

export function DialogAddCategory({ categories }: AddCategoryProps) {
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    formik.resetForm()
  }
  const formik = useFormik({
    initialValues: {
      categoryName: ''
    },
    validationSchema: CategorySchema(),
    onSubmit: async () => {
      try {
        setIsSaving(true)
        toast.success('A category is created successfully!')
        formik.resetForm()
      } catch (error) {
        toast.error('An error occurred while creating the catalog!')
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
      <Button variant="contained" style={{ backgroundColor: '#0094fd' }} onClick={handleClickOpen}>
        Add New
      </Button>
      <Dialog
        sx={{
          '& .MuiDialog-paper': {
            width: '400px'
          }
        }}
        open={open}
        onClose={handleClose}
        onClick={handleClickOutside}
      >
        <DialogTitle>Create Category</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              label="Category name"
              fullWidth
              id="categoryName"
              name="categoryName"
              value={formik.values.categoryName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.categoryName && Boolean(formik.errors.categoryName)}
              helperText={formik.touched.categoryName && formik.errors.categoryName}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" type="submit" disabled={isSaving}>
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  )
}
