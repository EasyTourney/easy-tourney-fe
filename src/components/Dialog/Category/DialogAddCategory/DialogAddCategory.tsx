import React, { useState } from 'react'
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert } from '@mui/material'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { CategorySchema } from '../../../../services/validator/category.validator'
import { CategoryName } from '../../../../types/category'
import { useDispatch, useSelector } from 'react-redux'
import { setCategories } from '../../../../redux/reducers/categories/categories.reducer'
import styles from './DialogAddCategory.module.css'
interface DialogAddCategoryProps {
  addCategory: (data: CategoryName) => Promise<any>
}

export function DialogAddCategory({ addCategory }: DialogAddCategoryProps) {
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const category = useSelector((state: any) => state.category.categories)
  const dispatch = useDispatch()
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
      categoryName: ''
    },
    validationSchema: CategorySchema,
    onSubmit: async (values) => {
      try {
        setIsSaving(true)
        const categoryData = {
          categoryId: 0,
          categoryName: values.categoryName,
          createdAt: new Date().toISOString(),
          updatedAt: null,
          deletedAt: null,
          deleted: false
        }
        const response = await addCategory(categoryData)

        if (response.success) {
          const newCategory = response.data
          const updatedCategories = [newCategory, ...category].slice(0, 10)
          dispatch(setCategories(updatedCategories))
          toast.success('A category is created successfully!')
          handleClose()
        } else {
          setError(true)
          setErrorMessage(response.errorMessage['Invalid Error'])
        }
      } catch (error) {
        toast.error('An error occurred while creating the category!')
        setError(false)
        setErrorMessage('')
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
    <Box sx={{ textAlign: 'center', paddingTop: '30px' }}>
      <Button
        className={styles['btn-add']}
        variant="contained"
        style={{ backgroundColor: '#24292e' }}
        onClick={handleClickOpen}
      >
        Add New
      </Button>
      <Dialog open={open} onClose={handleClose} onClick={handleClickOutside}>
        <DialogTitle>Create Category</DialogTitle>
        {error && (
          <Alert className={styles['alert-message']} severity="error">
            {errorMessage}
          </Alert>
        )}
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Box component="label" sx={{ fontWeight: 'bold' }}>
              Category Name <span className={styles['required-marked']}>*</span>
            </Box>
            <TextField
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
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={isSaving}>
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  )
}
