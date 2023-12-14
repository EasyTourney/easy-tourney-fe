import Box from '@mui/material/Box'
import withBaseLogic from '../../hoc/withBaseLogic'
import TableReused from '../../components/Tables'
import Input from '../../components/Input'
import { useCallback, useEffect, useState } from 'react'
import { ParamApi } from '../../types/commom'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import useDebounce from '../../hooks/useDebounce'
import { mockDataTeams } from '../../data/mockData'
import { Participant } from '../../types/participant'

const Participants = ({ navigate, location }: any) => {
  const columns = [
    {
      id: 'Id',
      sortTable: false,
      label: 'No.',
      left: false,
      style: {
        filed: 'Id',
        width: '10%'
      }
    },
    {
      id: 'teamName',
      sortTable: true,
      label: 'Name',
      sortBy: 'teamName',
      left: false,
      style: {
        filed: 'name',
        width: '60%'
      }
    },
    {
      id: 'players',
      sortTable: false,
      label: 'Players',
      sortBy: 'Players',
      left: false,
      style: {
        filed: 'players',
        width: '30%'
      }
    }
  ]


  const [value, setValue] = useState<string | ''>('')
  const [sortType, setSortType] = useState<'asc' | 'desc' | ''>('')
  const [participants, setParticipants] = useState<Participant[] | []>([])
  const [totalParticipants, setTotalParticipants] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalCurrentPage, setTotalCurrentPage] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [params] = useSearchParams()
  const pageURL = Number(params.get('page'))

  // get all team from DB
  const getAll = async (param: ParamApi) => {
    const start = (10 * (currentPage - 1))
    const end = (start + 10)
    let getParticipants: Participant[] | [] = [];
    if (param.keyword !== "") {
      getParticipants = mockDataTeams.filter((team: Participant) =>
        team.teamName.toLowerCase().includes(value.toLowerCase()))
    } else {
      getParticipants = mockDataTeams
    }

    setParticipants(getParticipants.slice(start, end).sort((a: Participant, b: Participant) => {
      if (param.sortType === 'asc' && a.teamName < b.teamName) return -1
      if (param.sortType === 'desc' && a.teamName > b.teamName) return 1
      if (param.sortType === '' && a.id > b.id) return -1
      return 0
    }))

    setTotalCurrentPage(prev => prev = Math.ceil(getParticipants.length / 10))
    setTotalParticipants(getParticipants.length)

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
  }, [sortType, currentPage, debouceSearch])


  useEffect(() => {
    if (totalParticipants === undefined && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
    } else if (debouceSearch) {
      setCurrentPage((prevPage) => (prevPage = 1))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalParticipants])

  const handleEdit = useCallback((rowData: { [key: string]: any }) => {
    // call api here
  }, [])

  const handleDelete = useCallback(async (rowData: { [key: string]: any }) => {
    //call api here
  }, [])

  const handleColumnSort = useCallback((idColumm: any, sortType: 'asc' | 'desc' | '') => {
    setSortType(sortType)
  }, [])

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ alignSelf: 'flex-start', marginBottom: '10px' }}>
          {/* Add new participant button here */}
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
        rows={participants}
        onEdit={handleEdit}
        onDelete={handleDelete}
        handleColumnSort={handleColumnSort}
        total={totalParticipants}
        handlePageSearch={pageSearch}
        totalCurrentPage={totalCurrentPage}
        loading={loading}
      />
    </Box>
  )
}

export default withBaseLogic(Participants)
