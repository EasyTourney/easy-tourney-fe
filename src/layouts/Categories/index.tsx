import Box from '@mui/material/Box'
import withBaseLogic from '../../hoc/withBaseLogic'
import TableReused from '../../components/Tables'
import Input from '../../components/Input'
import { useCallback, useState } from 'react'
import { DialogAddCategory } from '../../components/DialogAddCategory'
import { useEffect } from 'react'
import { Categories } from '../../types/category'
import { APIRes, ParamApi } from '../../types/commom'
import { createSearchParams } from 'react-router-dom'
import { getAllCategories } from '../../apis/axios/categories/category'
import useDebounce from '../../hooks/useDebounce'


const Category = ({ navigate, location }: any) => {

  const columns = [
    {
      id: 'categoryId',
      sortTable: true,
      sortBy: 'categoryId',
      label: 'Id',
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

  const [value, setValue] = useState<string | ''>('')
  const [sortType, setSortType] = useState<'asc' | 'desc' | ''>('')
  const [categories, setCategoties] = useState<Categories[] | []>([]);
  const [totalCategories, setTotalCategories] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)



  const getAll = async (param: ParamApi) => {

    const getCategories = (await getAllCategories(param)) as APIRes;
    setCategoties(getCategories.data);
    setTotalCategories(getCategories.additionalData.totalCategories);

  }

  const pageSearch = (value: number) => {
    setCurrentPage((prev) => prev = value)
  }


  const debouceSearch = useDebounce({
    value: value,
    ms: 800
  })

  const handleEdit = useCallback((rowData: { [key: string]: any }) => {
    // call api here
  }, [])

  const handleDelete = useCallback((rowData: { [key: string]: any }) => {
    //call api here
  }, [])

  const handleColumnSort = useCallback((idColumm: any, sortType: 'asc' | 'desc' | '') => {
    setSortType(sortType)
  }, [])


  useEffect(() => {
    if (debouceSearch && sortType) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ keyword: value, sortType: sortType, page: String(currentPage) }).toString()
      })
    } else if (sortType) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ sortType: sortType, page: String(currentPage) }).toString()

      })
    } else {
      navigate({
        pathname: location.pathname
      })
    }
  }, [debouceSearch, sortType, currentPage, navigate, value, location.pathname])


  useEffect(() => {
    const param: ParamApi = {
      sortType: sortType,
      page: currentPage,
      keyword: value
    }
    getAll({ ...param })
  }, [sortType, currentPage, value])


  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ alignSelf: 'flex-start', marginBottom: '10px' }}>
          <DialogAddCategory categories={[]} />
        </Box>
        <Box sx={{ alignSelf: 'flex-end' }}>
          <Input
            label="Search"
            id="outlined-search"
            placeholder="Search here..."
            handleChange={(e) => {setValue(e.target.value) 
            setCurrentPage(1)}}
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
      />
    </Box>
  )
}

export default withBaseLogic(Category)
