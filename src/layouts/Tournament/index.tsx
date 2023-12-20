import Box from '@mui/material/Box'
import withBaseLogic from '../../hoc/withBaseLogic'
import TableReused from '../../components/Tables'
import Input from '../../components/Input'
import { ChangeEvent, useCallback, useState } from 'react'
import React, { useEffect } from 'react'
import { ParamApi, TournamentAPIRes } from '../../types/commom'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import useDebounce from '../../hooks/useDebounce'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { Button } from '@mui/material'
import { TournamentRecord } from '../../types/tournament'
import { MenuItem, TextField } from '@mui/material'
import { tournamentStatuses } from '../../constants/status'
import DialogAddTournament from '../../components/Dialog/Tournament/DialogAddTournament'
import { deleteTournament, getAllTournaments } from '../../apis/axios/tournaments/tournament'
import { removeEmptyFields } from '../../utils/function'
import { convertTournament } from '../../utils/tournament'
import { useDispatch, useSelector } from 'react-redux'
import { categoriesSelector } from '../../redux/reducers/categories/categories.selectors'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { getCategories } from '../../redux/reducers/categories/categories.slice'

const TournamentTable = ({ navigate, location }: any) => {
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
      id: 'title',
      sortTable: true,
      label: 'Title',
      sortBy: 'title',
      left: true,
      style: {
        filed: 'name',
        width: '1000px'
      }
    },
    {
      id: 'category',
      sortTable: true,
      label: 'Category',
      sortBy: 'category',
      left: true,
      style: {
        filed: 'name',
        width: '1000px'
      }
    },
    {
      id: 'organizers',
      sortTable: false,
      label: 'Organizers',
      sortBy: 'organizers',
      left: true,
      style: {
        filed: 'name',
        width: '1000px'
      }
    },
    {
      id: 'eventDates',
      sortTable: false,
      label: 'Event dates',
      sortBy: 'eventDates',
      left: true,
      style: {
        filed: 'name',
        width: '1000px'
      }
    },
    {
      id: 'createdAt',
      sortTable: true,
      label: 'Create at',
      sortBy: 'createdAt',
      left: true,
      style: {
        filed: 'name',
        width: '1000px'
      }
    },
    {
      id: 'status',
      sortTable: true,
      label: 'Status',
      sortBy: 'status',
      left: false,
      style: {
        filed: 'name',
        width: '1000px'
      }
    }
  ]

  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const [value, setValue] = useState<string | ''>('')
  const [sortType, setSortType] = useState<'asc' | 'desc' | ''>('')
  const [sortValue, setSortValue] = useState<string | ''>('')
  const [filterStatus, setFilterStatus] = useState<string | ''>('')
  const [filterCategory, setFilterCategory] = useState<string | ''>('')
  const [tournaments, setTournaments] = useState<TournamentRecord[] | []>([])
  const [totalTournaments, setTotalTournaments] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalCurrentPage, setTotalCurrentPage] = useState<number>(0)
  const [update, setUpdate] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [params] = useSearchParams()
  const pageURL = Number(params.get('page'))
  const { listCategory } = useSelector(categoriesSelector)
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const getAll = useCallback(async (param: ParamApi) => {
    const getTournaments = (await getAllTournaments(param)) as TournamentAPIRes

    if (getTournaments && getTournaments.data && getTournaments?.data?.length !== 0) {
      const convertedData = []
      for (const tournament of getTournaments.data) {
        convertedData.push(convertTournament(tournament))
      }
      setTournaments(convertedData)
      setTotalTournaments(getTournaments?.additionalData?.totalTournament)
      setTotalCurrentPage(convertedData.length)
    } else {
      setTournaments([])
      setTotalTournaments(0)
      setTotalCurrentPage(0)
    }
  }, [])

  const pageSearch = (value: number) => {
    setCurrentPage(() => value)
  }

  const debounceSearch = useDebounce({
    value: value,
    ms: 800
  })

  useEffect(() => {
    if (pageURL > 0) {
      setCurrentPage(pageURL)
    }
  }, [pageURL])

  useEffect(() => {
    const currentParams = {
      page: String(currentPage),
      keyword: value,
      sortType: sortType,
      sortValue: sortType && sortValue,
      filterStatus: filterStatus !== 'All' ? filterStatus : '',
      filterCategory: filterCategory
    }
    removeEmptyFields(currentParams)
    navigate({
      pathname: location.pathname,
      search: createSearchParams(currentParams).toString()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch, sortType, sortValue, currentPage, navigate, location.pathname, filterStatus, filterCategory])

  useEffect(() => {
    const param: ParamApi = {
      page: currentPage,
      keyword: value,
      sortType: sortType,
      sortValue: sortType && sortValue,
      filterStatus: filterStatus !== 'All' ? filterStatus : '',
      filterCategory: filterCategory
    }
    removeEmptyFields(param)
    getAll({ ...param })
    setLoading(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType, currentPage, debounceSearch, update, filterStatus, filterCategory])

  useEffect(() => {
    if (totalTournaments === undefined && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
    } else {
      setCurrentPage(() => 1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalTournaments])

  const handleEdit = useCallback((rowData: { [key: string]: any }) => {
    navigate(`/tournament/${rowData.id}/general`)
  }, [])

  const handleDelete = useCallback(async (rowData: { [key: string]: any }) => {
    const { id } = rowData

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
        const res = (await deleteTournament(id)) as TournamentAPIRes
        if (res.success) {
          toast.success('A tournament is deleted successfully!')
          setUpdate((prev) => !prev)
        } else {
          toast.error(res.message)
        }
      }
    })
  }, [])

  const handleColumnSort = useCallback((idColumm: any, sortType: 'asc' | 'desc' | '') => {
    setSortType(sortType)
    setSortValue(idColumm)
  }, [])

  const handleChangeFilterStatus = useCallback((event: ChangeEvent<{ value: string }>) => {
    setFilterStatus(event.target.value)
  }, [])

  const handleChangeFilterCategory = useCallback((event: ChangeEvent<{ value: string }>) => {
    setFilterCategory(event.target.value)
  }, [])

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ alignSelf: 'flex-start', marginBottom: '10px' }}>
          <Box sx={{ mt: '1rem' }}>
            <Button onClick={handleClickOpen} style={{ backgroundColor: '#24292e', color: 'white' }}>
              Add new
            </Button>
            {open && <DialogAddTournament open={open} setOpen={setOpen} />}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignSelf: 'flex-end', gap: '0.5rem' }}>
          <TextField
            id="filter"
            label="Category"
            defaultValue=""
            variant="outlined"
            select
            size="small"
            sx={{
              mb: 1,
              width: '200px'
            }}
            onChange={handleChangeFilterCategory}
          >
            <MenuItem value="">None</MenuItem>
            {listCategory.map((option: any) => (
              <MenuItem key={option.categoryId} value={option.categoryId}>
                {option.categoryName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="filter"
            label="Status"
            defaultValue="All"
            variant="outlined"
            select
            size="small"
            sx={{
              mb: 1,
              minWidth: '200px'
            }}
            onChange={handleChangeFilterStatus}
          >
            {tournamentStatuses.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
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
        rows={tournaments}
        onEdit={handleEdit}
        onDelete={handleDelete}
        handleColumnSort={handleColumnSort}
        total={totalTournaments}
        handlePageSearch={pageSearch}
        totalCurrentPage={totalCurrentPage}
        loading={loading}
      />
    </Box>
  )
}

export default withBaseLogic(TournamentTable)
