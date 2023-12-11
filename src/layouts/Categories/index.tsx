import Box from '@mui/material/Box'
import withBaseLogic from '../../hoc/withBaseLogic'
import TableReused from '../../components/Tables'
import Input from '../../components/Input'
import { useCallback, useEffect, useState } from 'react'
import { APIRes, ParamApi } from '../../types/commom'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { apiDeleteCategory, getAllCategories, addCategory } from '../../apis/axios/categories/category'
import useDebounce from '../../hooks/useDebounce'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { setCategories } from '../../redux/reducers/categories/categories.reducer'
import { DialogAddCategory } from '../../components/DialogAddCategory'

const Category = ({ navigate, location }: any) => {
  const columns = [
    {
      id: 'Id',
      sortTable: false,
      label: 'No.',
      left: false,
      style: {
        filed: 'Id',
        width: '100px'
      }
    },
    {
      id: 'categoryName',
      sortTable: true,
      label: 'Name',
      sortBy: 'categoryName',
      left: true,
      style: {
        filed: 'name',
        width: '1000px'
      }
    }
  ]

  const dispatch = useDispatch()
  const [value, setValue] = useState<string | ''>('')
  const [sortType, setSortType] = useState<'asc' | 'desc' | ''>('')
  const categories = useSelector((state: any) => state.category.categories)
  const [totalCategories, setTotalCategories] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [update, setUpdate] = useState<boolean>(false)
  const [totalCurrentPage, setTotalCurrentPage] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [params] = useSearchParams()
  const pageURL = Number(params.get('page'))

  // get all organizer from DB
  const getAll = async (param: ParamApi) => {
    const getCategories = (await getAllCategories(param)) as APIRes

    dispatch(setCategories([...getCategories.data]))
    setTotalCurrentPage(getCategories?.total)
    setTotalCategories(getCategories.additionalData.totalCategories)
  }

  const pageSearch = (value: number) => {
    setCurrentPage((prev) => (prev = value))
  }

  //delaying the execution of function search
  const debouceSearch = useDebounce({
    value: value,
    ms: 800
  })

  useEffect(() => {
    if (pageURL > 0) {
      setCurrentPage(pageURL)
    }
  }, [pageURL])

  useEffect(() => {
    if (debouceSearch && sortType) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ keyword: value, sortType: sortType, page: String(currentPage) }).toString()
      })
    } else {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ sortType: sortType, page: String(currentPage) }).toString()
      })
    }

    const param: ParamApi = {
      sortType: sortType,
      page: currentPage,
      keyword: value
    }

    getAll({ ...param })
    setLoading(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType, currentPage, debouceSearch, update])

  useEffect(() => {
    if (totalCategories === undefined && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
    } else if (debouceSearch) {
      setCurrentPage((prevPage) => (prevPage = 1))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCategories])

  const handleEdit = useCallback((rowData: { [key: string]: any }) => {
    // call api here
  }, [])

  const handleDelete = useCallback(async (rowData: { [key: string]: any }) => {
    const { categoryId } = rowData //get categoryId

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      allowOutsideClick: false
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = (await apiDeleteCategory(categoryId)) as APIRes
        if (res.success) {
          toast.success('A category was deleted successfully !!!')
          setUpdate((prev) => !prev)
        } else {
          toast.error(res.message)
        }
      }
    })
  }, [])

  const handleColumnSort = useCallback((idColumm: any, sortType: 'asc' | 'desc' | '') => {
    setSortType(sortType)
  }, [])

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ alignSelf: 'flex-start', marginBottom: '10px' }}>
          <DialogAddCategory addCategory={addCategory} />
        </Box>
        <Box sx={{ alignSelf: 'flex-end' }}>
          <Input
            label="Search"
            id="outlined-search"
            placeholder="Search here..."
            handleChange={(e) => {
              setValue(e.target.value)
              setCurrentPage(1)
            }}
            value={value}
          />
        </Box>
      </Box>

      <TableReused
        columns={columns}
        rows={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
        handleColumnSort={handleColumnSort}
        total={totalCategories}
        handlePageSearch={pageSearch}
        totalCurrentPage={totalCurrentPage}
        loading={loading}
      />
    </Box>
  )
}

export default withBaseLogic(Category)
