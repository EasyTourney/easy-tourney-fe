import { useEffect, useState } from 'react'
import {  Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { CategorySchema } from '../../../../services/validator/category.validator'
import { Categories } from '../../../../types/category'
import { useDispatch, useSelector } from 'react-redux'
import { updateCategory } from '../../../../redux/reducers/categories/categories.reducer'

interface EditCategoryProps {
  categories: Categories[]
  onOpen: boolean
  onClose: () => void
  categoryName: string
}

export function DialogEditCategory({ categories, onOpen, onClose, categoryName }: EditCategoryProps) {
  const dispatch = useDispatch()
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const selectedCategory = useSelector((state: any) => state.category.seletedCategory)

  const formik = useFormik({
    initialValues: {
      categoryName: categoryName
    },
    validationSchema: CategorySchema,
    onSubmit: async () => {
      try {
        setIsSaving(true)
        formik.resetForm()
        dispatch(updateCategory({ ...selectedCategory, categoryName: formik.values.categoryName }))
        toast.success('Category name is updated successfully!')
      } catch (error) {
        toast.error('An error occurred while updating the category!')
      } finally {
        setIsSaving(false)
        handleClose()
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