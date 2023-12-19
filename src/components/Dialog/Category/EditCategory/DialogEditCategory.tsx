import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert } from '@mui/material'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { CategorySchema } from '../../../../services/validator/category.validator'
import { Categories } from '../../../../types/category'
import { useDispatch, useSelector } from 'react-redux'
import { setCategories } from '../../../../redux/reducers/categories/categories.reducer'
import { apiEditCategory } from '../../../../apis/axios/categories/category'
interface EditCategoryProps {
  categories: Categories[]
  onOpen: boolean
  onClose: () => void
  categoryName: string
}

export function DialogEditCategory({ onOpen, onClose, categoryName }: EditCategoryProps) {
  const dispatch = useDispatch()
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const selectedCategory = useSelector((state: any) => state.category.seletedCategory)
  const category = useSelector((state: any) => state.category.categories)

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
        if (response.status === 200 && response.data.success) {
          const updatedCategory = response.data.data
          const updatedCategories = category.map((item: { categoryId: any }) =>
            item.categoryId === updatedCategory.categoryId ? updatedCategory : item
          )
          dispatch(setCategories(updatedCategories))
          toast.success('A category is updated successfully!')
          formik.resetForm()
          setError(false)
          setErrorMessage('')
          handleClose()
          setIsSaving(false)
          handleClose()
        } else {
          setError(true)
          setErrorMessage('Category name has already exist')
          setIsSaving(false)
        }
      } catch (error) {
        toast.error('A catalog failed to update!')
      }
    }
  })
  useEffect(() => {
    setIsOpen(true)
    formik.setValues({
      categoryName: categoryName
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryName, isOpen])

  const handleClose = () => {
    onClose()
    setIsOpen(false)
    formik.resetForm()
    setError(false)
    setErrorMessage('')
  }

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      if (formik.isValid) {
        handleClose()
      }
    }
  }

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          width: '400px'
        }
      }}
      open={onOpen}
      onClose={onClose}
      onClick={handleClickOutside}
    >
      <DialogTitle>Edit Category</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          {error && <Alert severity="error">{errorMessage}</Alert>}
          <TextField
            label="Category name"
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
