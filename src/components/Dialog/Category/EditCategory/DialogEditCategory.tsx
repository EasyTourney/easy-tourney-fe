import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert, Box } from '@mui/material'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { CategorySchema } from '../../../../services/validator/category.validator'
import { Categories } from '../../../../types/category'
import { useDispatch, useSelector } from 'react-redux'
import { apiEditCategory } from '../../../../apis/axios/categories/category'
import styles from './DialogEditCategory.module.css'
import { updateCategory } from '../../../../redux/reducers/categories/categories.reducer'

interface EditCategoryProps {
  categories: Categories[]
  onOpen: boolean
  onClose: () => void
  categoryName: string
}

export function DialogEditCategory({ onOpen, onClose, categoryName }: EditCategoryProps) {
  const dispatch = useDispatch()
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const selectedCategory = useSelector((state: any) => state.category.seletedCategory)

  const formik = useFormik({
    initialValues: {
      categoryName: categoryName
    },
    validationSchema: CategorySchema,
    onSubmit: async () => {
      try {
        setIsSaving(true)
        const updatedCategoryName = {
          categoryName: formik.values.categoryName
        }
        const response = await apiEditCategory(selectedCategory.categoryId, updatedCategoryName)
        if (response.data !== '') {
          const updatedCategory = response.data
          dispatch(updateCategory(updatedCategory))
          toast.success('A category is updated successfully!')
          handleClose()
        } else {
          setError(true)
          setErrorMessage('Category name has already exist')
        }
      } catch (error) {
        toast.error('An error occurred while updating the category!')
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
        categoryName: categoryName
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

  return (
    <Dialog open={onOpen} onClose={onClose} onClick={handleClickOutside}>
      <DialogTitle>Edit Category</DialogTitle>
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
            helperText={
              formik.touched.categoryName && typeof formik.errors.categoryName === 'string'
                ? formik.errors.categoryName
                : ''
            }
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
  )
}
