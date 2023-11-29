import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Box, Button, Pagination } from '@mui/material'
import { test } from '../../data/mockData'
import { TiArrowUnsorted } from 'react-icons/ti'
import { TiArrowSortedUp } from 'react-icons/ti'
import { TiArrowSortedDown } from 'react-icons/ti'
import { memo, useEffect, useState } from 'react'
import { LiaEdit } from 'react-icons/lia'
import { RiDeleteBin2Line } from 'react-icons/ri'

interface ReusedTableProps {
  columns: test[]
  rows: { [key: string]: any }[]
  showActions?: boolean
  onEdit?: (rowData: { [key: string]: any }) => void
  onDelete?: (rowData: { [key: string]: any }) => void
  handleNameColumnSort: (status: 'asc' | 'desc' | 'none') => void
}

const TableReused = ({
  rows,
  columns,
  showActions = true,
  onEdit,
  onDelete,
  handleNameColumnSort
}: ReusedTableProps) => {
  const [nameSortType, setNameSortType] = useState<'asc' | 'desc' | 'none'>('none')

  const handleNameColumnClick = () => {
    let nextSortType: 'asc' | 'desc' | 'none'

    if (nameSortType === 'asc') {
      nextSortType = 'desc'
    } else if (nameSortType === 'desc') {
      nextSortType = 'none'
    } else {
      nextSortType = 'asc'
    }
    setNameSortType(nextSortType)
    handleNameColumnSort(nextSortType)
  }

  const getNameSortIcon = () => {
    if (nameSortType === 'asc') {
      return <TiArrowSortedDown size={15} />
    } else if (nameSortType === 'desc') {
      return <TiArrowSortedUp size={15} />
    } else {
      return <TiArrowUnsorted size={15} />
    }
  }
  const [page, setPage] = useState(1)
  const rowsPerPage = 5
  const [paginatedRows, setPaginatedRows] = useState<{ [key: string]: any }[]>([])
  useEffect(() => {
    const startIndex = (page - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    const newPaginatedRows = rows?.slice(startIndex, endIndex) || []
    setPaginatedRows(newPaginatedRows)
  }, [page, rows])
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table
          size="small"
          sx={{
            '& .MuiTableCell-sizeSmall': {
              padding: '8px 16px'
            }
          }}
        >
          <TableHead
            sx={{
              background: '#0094fd',
              '& .MuiTableHead-root': {
                padding: '8px 16px'
              }
            }}
          >
            <TableRow>
              {columns?.map((column) => (
                <TableCell
                  key={column.id}
                  sx={{
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}
                  style={{ width: `${column.id === 'name' ? '560px' : column.id === 'Id' ? '273px' : ''}` }}
                >
                  <Box
                    component="span"
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '3px',
                      cursor: `${column.sortTable && 'pointer'}`
                    }}
                    onClick={() => column.id && handleNameColumnClick()}
                  >
                    {column.label}

                    {column.id && column.sortTable && getNameSortIcon()}
                  </Box>
                </TableCell>
              ))}
              {showActions && (
                <TableCell
                  sx={{
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}
                >
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows?.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns?.map((column, colIndex) => (
                  <TableCell key={colIndex} component="th" scope="row" sx={{ textAlign: 'center' }}>
                    {row[column.id]}
                  </TableCell>
                ))}
                {showActions && (
                  <TableCell sx={{ textAlign: 'center' }}>
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
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: '3rem', display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination
          count={Math.ceil(rows?.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          showFirstButton
          showLastButton
          color="primary"
        />
      </Box>
    </Box>
  )
}

export default memo(TableReused)
