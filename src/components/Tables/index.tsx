import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Box, Button } from '@mui/material'
import { TiArrowUnsorted } from 'react-icons/ti'
import { TiArrowSortedUp } from 'react-icons/ti'
import { TiArrowSortedDown } from 'react-icons/ti'
import { memo, useState } from 'react'
import { LiaEdit } from 'react-icons/lia'
import { RiDeleteBin2Line } from 'react-icons/ri'
import Paginations from '../Paginations'
import { ColumnTypes } from '../../types/commom'


interface ReusedTableProps {
  columns: ColumnTypes[]
  rows: { [key: string]: any }[]
  showActions?: boolean
  onEdit?: (rowData: { [key: string]: any }) => void
  onDelete?: (rowData: { [key: string]: any }) => void
  handleColumnSort: (id: any, status: 'asc' | 'desc' | '') => void
  total: number,
  handlePageSearch: (page: number) => void
}

const TableReused = ({ rows, columns, showActions = true, onEdit, onDelete, handleColumnSort, total,
  handlePageSearch }: ReusedTableProps) => {
  const [sortStates, setSortStates] = useState<{ [key: string]: 'asc' | 'desc' | '' }>(
    Object.fromEntries(columns.map((column) => [column.id, '']))
  )

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
 
  const handlePageChange = (pageNumber: number) => {
    handlePageSearch(pageNumber)
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
            {rows.length === 0 ?
              <TableRow>
                <TableCell>
                  NOT FOUND
                </TableCell>
              </TableRow>
              :
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
                      {row[column.id]}
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
              ))}
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
