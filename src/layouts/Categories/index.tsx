import Box from '@mui/material/Box'
import { mockDataCategory } from '../../data/mockData'
import withBaseLogic from '../../hoc/withBaseLogic'
import TableReused from '../../components/Tables'
import Input from '../../components/Input'
import { useCallback, useState } from 'react'

const Category = () => {
  const [value, setValue] = useState<string | number>('')

  const columnsTest = [
    {
      id: 'Id',
      sortTable: false,
      label: 'Id'
    },
    {
      id: 'name',
      sortTable: true,
      label: 'Name'
    }
  ]

  const handleEdit = useCallback((rowData: { [key: string]: any }) => {
    // call api here
  }, [])

  const handleDelete = useCallback((rowData: { [key: string]: any }) => {
    //call api here
    console.log(rowData)
  }, [])

  const handleNameColumnSort = useCallback((sortType: 'asc' | 'desc' | 'none') => {
    //call api here
  }, [])
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'end', m: '1rem' }}>
        <Input
          label="Search"
          id="outlined-search"
          placeholder="Search here..."
          handleChange={(e) => setValue(e.target.value)}
          value={value}
        />
      </Box>

      <TableReused
        columns={columnsTest}
        rows={mockDataCategory}
        onEdit={handleEdit}
        onDelete={handleDelete}
        handleNameColumnSort={handleNameColumnSort}
      />
    </Box>
  )
}

export default withBaseLogic(Category)
