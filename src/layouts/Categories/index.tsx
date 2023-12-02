import Box from '@mui/material/Box'
import { mockDataCategory } from '../../data/mockData'
import withBaseLogic from '../../hoc/withBaseLogic'
import TableReused from '../../components/Tables'
import Input from '../../components/Input'
import { useCallback, useState } from 'react'
import { DialogAddCategory } from '../../components/DialogAddCategory'

const Category = () => {
  const [value, setValue] = useState<string | number>('')

  const columns = [
    {
      id: 'Id',
      sortTable: true,
      sortBy: 'Id',
      label: 'Id',
      left: false,
      style: {
        filed: 'Id',
        width: '100px'
      }
    },
    {
      id: 'name',
      sortTable: true,
      label: 'Name',
      sortBy: 'name',
      left: true,
      style: {
        filed: 'name',
        width: '1000px'
      }
    }
  ]

  const handleEdit = useCallback((rowData: { [key: string]: any }) => {
    // call api here
  }, [])

  const handleDelete = useCallback((rowData: { [key: string]: any }) => {
    //call api here
  }, [])

  const handleColumnSort = useCallback((idColumm: any, sortType: 'asc' | 'desc' | 'none') => {
    //call api here
  }, [])
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
            handleChange={(e) => setValue(e.target.value)}
            value={value}
          />
        </Box>
      </Box>

      <TableReused
        columns={columns}
        rows={mockDataCategory}
        onEdit={handleEdit}
        onDelete={handleDelete}
        handleColumnSort={handleColumnSort}
      />
    </Box>
  )
}

export default withBaseLogic(Category)
