import { memo } from 'react'
import PaginationItem from './item'
import { useSearchParams } from 'react-router-dom'
import usePagination from '../../hooks/usePagination'
import { Box } from '@mui/material'

interface PaginationProps {
  totalCount: number
  title: string
}
function Pagination({ totalCount, title }: PaginationProps) {
  const [params] = useSearchParams()
  const currentPage = Number(params.get('page')) || 1

  const pagination = usePagination({
    totalProductCount: totalCount,
    currentPage: currentPage,
    siblingCount: 1
  })

  const range = () => {
    const currentPage = Number(params.get('page')) || 1
    const pageSize = Number(process.env.REACT_APP_LIMIT) || 10
    const startPageProduct = Math.min((currentPage - 1) * pageSize + 1, totalCount)
    const endPageProduct = Math.min(pageSize * currentPage, totalCount)

    return `${startPageProduct} - ${endPageProduct}`
  }
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      {!params.get('page') && (
        <Box component="span" sx={{ fontSize: '0.875rem', fontStyle: 'italic' }}>{`Show ${title} ${Math.min(
          totalCount,
          1
        )} - ${Math.min(Number(process.env.REACT_APP_LIMIT), totalCount) || 10} of ${totalCount}`}</Box>
      )}
      {params.get('page') && (
        <Box
          component="span"
          sx={{ fontSize: '0.875rem', fontStyle: 'italic' }}
        >{`Show ${title} ${range()} of ${totalCount}`}</Box>
      )}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {pagination?.map((el: any) => (
          <PaginationItem key={el}>{el}</PaginationItem>
        ))}
      </Box>
    </Box>
  )
}

export default memo(Pagination)
