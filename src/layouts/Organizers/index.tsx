import Box from '@mui/material/Box'
import withBaseLogic from '../../hoc/withBaseLogic'
import TableReused from '../../components/Tables'
import Input from '../../components/Input'
import { useCallback, useState } from 'react'
import { useEffect } from 'react'
import { OrganizerAPIRes, ParamApi } from '../../types/commom'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import useDebounce from '../../hooks/useDebounce'
import { addOrganizer, apiDeleteOrganizer, getAllOrganizer } from '../../apis/axios/organizers/organizer'
import moment from 'moment'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { DialogAddOrganizer } from '../../components/Dialog/Organizer/AddOrganizer'
import { useDispatch, useSelector } from 'react-redux'
import { setOrganizer } from '../../redux/reducers/organizers/organizers.reducer'

const Organizers = ({ navigate, location }: any) => {
  const columns = [
    {
      id: 'Id',
      sortTable: false,
      sortBy: 'Id',
      label: 'No.',
      left: false,
      style: {
        filed: 'Id',
        width: '5%'
      }
    },
    {
      id: 'fullName',
      sortTable: true,
      label: 'Full Name',
      sortBy: 'fullName',
      left: false,
      style: {
        filed: 'fullName',
        width: '30%'
      }
    },
    {
      id: 'email',
      sortTable: true,
      label: 'Email',
      sortBy: 'email',
      left: false,
      style: {
        filed: 'email',
        width: '25%'
      }
    },
    {
      id: 'phoneNumber',
      sortTable: false,
      label: 'Phone number',
      sortBy: 'phoneNumber',
      left: false,
      style: {
        filed: 'phoneNumber',
        width: '10%'
      }
    },
    {
      id: 'dateOfBirth',
      sortTable: false,
      label: 'Date of birth',
      sortBy: 'dateOfBirth',
      left: false,
      style: {
        filed: 'dateOfBirth',
        width: '15%'
      }
    },
    {
      id: 'totalTournament',
      sortTable: true,
      label: 'Total tournaments',
      sortBy: 'totalTournament',
      left: false,
      style: {
        filed: 'totalTournament',
        width: '5%'
      }
    },
    {
      id: 'createdAt',
      sortTable: true,
      label: 'Created At',
      sortBy: 'createdAt',
      left: false,
      style: {
        filed: 'createdAt',
        width: '10%'
      }
    }
  ]

  const [value, setValue] = useState<string | ''>('')
  const [sortType, setSortType] = useState<'asc' | 'desc' | ''>('')
  const [sortValue, setSortValue] = useState<string | ''>('')
  const organizers = useSelector((state: any) => state.organizer.organizers)
  const [totalOrganizer, setTotalOrganizer] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalCurrentPage, setTotalCurrentPage] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [update, setUpdate] = useState<boolean>(false)
  const [params] = useSearchParams()
  const pageURL = Number(params.get('page'))
  const dispatch = useDispatch()

  // get all organizer from DB
  const getAll = async (param: ParamApi) => {
    const getOrganizers = (await getAllOrganizer(param)) as OrganizerAPIRes
    if (getOrganizers?.data.length !== 0) {
      const formattedData = getOrganizers?.data.map((e) => {
        if (e.dateOfBirth === null) {
          return { ...e, createdAt: moment(e.createdAt).format('DD/MM/YYYY'), dateOfBirth: '--' }
        }
        return {
          ...e,
          createdAt: moment(e.createdAt).format('DD/MM/YYYY'),
          dateOfBirth: moment(e.dateOfBirth).format('DD/MM/YYYY')
        }
      })
      dispatch(setOrganizer([...formattedData]))
    } else {
      dispatch(setOrganizer([...getOrganizers.data]))
    }
    setTotalCurrentPage(getOrganizers?.total)
    setTotalOrganizer(getOrganizers?.additionalData?.totalOrganizer)
  }

  const pageSearch = (value: number) => {
    setCurrentPage((prev) => (prev = value))
  }

  //delaying the execution of function search
  const debouceSearch = useDebounce({
    value: value,
    ms: 800
  })

  const handleEdit = useCallback((rowData: { [key: string]: any }) => {
    //call api here
  }, [])

  const handleDelete = useCallback((rowData: { [key: string]: any }) => {
    const { id } = rowData //get organizerId

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
        const res = (await apiDeleteOrganizer(id)) as OrganizerAPIRes
        console.log(res)
        if (res.success) {
          toast.success('An organizer is deleted successfully!')
          setUpdate((prev) => !prev)
        } else {
          toast.error(res.message)
        }
      }
    })
  }, [])

  const handleColumnSort = useCallback((idColumm: any, sortType: 'asc' | 'desc' | '') => {
    setSortType(sortType)
    if (idColumm === 'createdAt') {
      setSortValue('created_at')
    } else if (idColumm === 'phoneNumber') {
      setSortValue('phone_number')
    } else {
      setSortValue(idColumm)
    }
  }, [])

  useEffect(() => {
    if (pageURL > 0) {
      setCurrentPage(pageURL)
    }
  }, [pageURL])

  useEffect(() => {
    //create URL search params
    if (debouceSearch) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ keyword: value, sortType: sortType, page: String(currentPage) }).toString()
      })
    } else if (sortType !== '' && sortValue) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ sortValue: sortValue, sortType: sortType, page: String(currentPage) }).toString()
      })
    } else {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ page: String(currentPage) }).toString()
      })
    }

    const param: ParamApi = {
      sortType: sortType,
      page: currentPage,
      keyword: value,
      sortValue: sortValue
    }

    getAll({ ...param })
    setLoading(true)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouceSearch, sortType, currentPage, update, sortValue])

  useEffect(() => {
    // update the current page when delete the last organizer on the current page
    if (totalOrganizer === undefined && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
      // update the current page when starting a search
    } else if (debouceSearch) {
      setCurrentPage((prevPage) => (prevPage = 1))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalOrganizer])

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ alignSelf: 'flex-start', marginBottom: '10px' }}>
          <DialogAddOrganizer addOrganizer={addOrganizer} />
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
        rows={organizers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        handleColumnSort={handleColumnSort}
        total={totalOrganizer}
        handlePageSearch={pageSearch}
        totalCurrentPage={totalCurrentPage}
        loading={loading}
      />
    </Box>
  )
}

export default withBaseLogic(Organizers)
