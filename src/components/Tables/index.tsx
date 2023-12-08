import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Box, Button, Skeleton } from '@mui/material'
import { TiArrowUnsorted } from 'react-icons/ti'
import { TiArrowSortedUp } from 'react-icons/ti'
import { TiArrowSortedDown } from 'react-icons/ti'
import { memo, useEffect, useState } from 'react'
import { LiaEdit } from 'react-icons/lia'
import { RiDeleteBin2Line } from 'react-icons/ri'
import Paginations from '../Paginations'
import { ColumnTypes } from '../../types/commom'
import { useSearchParams } from 'react-router-dom'
import noItem from '../../assets/noItem.png'

interface ReusedTableProps {
  columns: ColumnTypes[]
  rows: { [key: string]: any }[]
  showActions?: boolean
  onEdit?: (rowData: { [key: string]: any }) => void
  onDelete?: (rowData: { [key: string]: any }) => void
  handleColumnSort: (id: any, status: 'asc' | 'desc' | '') => void
  total: number
  handlePageSearch: (page: number) => void
  totalCurrentPage: number
  loading: boolean
}

const TableReused = ({
  rows,
  columns,
  showActions = true,
  onEdit,
  onDelete,
  handleColumnSort,
  total,
  handlePageSearch,
  totalCurrentPage,
  loading
}: ReusedTableProps) => {
  const [sortStates, setSortStates] = useState<{ [key: string]: 'asc' | 'desc' | '' }>(
    Object.fromEntries(columns.map((column) => [column.id, '']))
  )

  const [params] = useSearchParams()
  const myPage = params.get('page')
  const totalIndex = totalCurrentPage < 10 ? totalCurrentPage - totalCurrentPage + 10 : totalCurrentPage

  const handleSortTableClick = (id: any) => {
    const currentSortType = sortStates[id]

    let nextSortType: 'asc' | 'desc' | ''

    if (currentSortType === 'asc') {
      nextSortType = 'desc'
    } else if (currentSortType === 'desc') {
      nextSortType = ''
    } else {
      nextSortType = 'asc'
    }

    const updatedSortStates = { ...sortStates, [id]: nextSortType }
    setSortStates(updatedSortStates)
    handleColumnSort(id, nextSortType)
  }

  const getColumnSortIcon = (id: any) => {
    const sortType = sortStates[id]

    if (sortType === 'asc') {
      return <TiArrowSortedDown size={15} />
    } else if (sortType === 'desc') {
      return <TiArrowSortedUp size={15} />
    } else {
      return <TiArrowUnsorted size={15} />
    }
  }
  // pagination
  const [page, setPage] = useState(1)
  useEffect(() => {
    // update when delete all records last page
    if (rows?.length === 0 && page > 1) {
      setPage(page - 1)
    }
  }, [page, rows])
  const handlePageChange = (pageNumber: number) => {
    handlePageSearch(pageNumber)
    setPage(pageNumber)
  }

  useEffect(() => {
    setPage(1)
  }, [total])

  // Loading skeleton
  const TableRowsLoader = ({ rowsNum }: any) => {
    return (
      <>
        {[...Array(rowsNum)].map((row, index) => (
          <TableRow key={index}>
            {columns.map((item, index) => (
              <TableCell component="th" scope="row" key={index}>
                <Skeleton animation="wave" variant="text" />
              </TableCell>
            ))}

            {showActions && (
              <TableCell>
                <Skeleton animation="wave" variant="text" />
              </TableCell>
            )}
          </TableRow>
        ))}
      </>
    )
  }

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead
            sx={{
              background: '#0094fd',
              '& .MuiTableHead-root': {
                padding: '8px 16px'
              }
            }}
            style={{
              WebkitTouchCallout: 'none',
              WebkitUserSelect: 'none',
              KhtmlUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
              userSelect: 'none'
            }}
          >
            <TableRow>
              {columns?.map((column) => (
                <TableCell
                  key={column.id}
                  sx={{
                    textAlign: `${column.left ? 'left' : 'center'}`,
                    color: 'white',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    borderRight: ' 1px solid rgba(224, 224, 224, 1)',
                    borderCollapse: 'collapse'
                  }}
                  style={{ width: `${column.id === column.style?.filed && column.style.width}` }}
                >
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '3px',
                      cursor: `${column.sortTable && 'pointer'}`
                    }}
                    onClick={() => {
                      if (column.sortTable && column.id === column.sortBy) {
                        handleSortTableClick(column.id)
                      }
                    }}
                  >
                    {column.label}

                    {column.sortTable && getColumnSortIcon(column.id)}
                  </Box>
                </TableCell>
              ))}
              {showActions && (
                <TableCell
                  sx={{
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    width: '100px'
                  }}
                >
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading ? (
              <TableRowsLoader rowsNum={10} />
            ) : rows?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <Box sx={{ textAlign: 'center', color: 'gray', padding: '20px 0px' }}>
                    <Box
                      component="img"
                      src={noItem}
                      alt="no-item"
                      sx={{ width: '100%', height: '250px', objectFit: 'contain' }}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              rows?.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  sx={{
                    '&:nth-of-type(even)': {
                      backgroundColor: '#f9fafd'
                    }
                  }}
                >
                  {columns?.map((column, colIndex) => (
                    <TableCell
                      key={colIndex}
                      component="td"
                      scope="row"
                      sx={{
                        textAlign: `${column.left ? 'left' : 'center'}`,
                        borderRight: ' 1px solid rgba(224, 224, 224, 1)',
                        borderCollapse: 'collapse'
                      }}
                    >
                      {totalIndex && Object.values(column).indexOf('Id') > -1
                        ? (Number(myPage) > 1 ? Number(myPage) - 1 : 0) * totalIndex + rowIndex + 1
                        : row[column.id]}
                    </TableCell>
                  ))}
                  {showActions && (
                    <TableCell
                      scope="row"
                      component="td"
                      sx={{
                        borderRight: ' 1px solid rgba(224, 224, 224, 1)',
                        borderCollapse: 'collapse'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center ', justifyContent: 'center' }}>
                        {onEdit && (
                          <Button title="Edit" onClick={() => onEdit(row)}>
                            <LiaEdit color="green" size={20} />
                          </Button>
                        )}
                        {onDelete && (
                          <Button title="Delete" onClick={() => onDelete(row)}>
                            <RiDeleteBin2Line color="red" size={20} />
                          </Button>
                        )}
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
        <Paginations totalItems={total} itemsPerPage={10} onPageChange={handlePageChange} />
      </Box>
    </Box>
  )
}

export default memo(TableReused)
