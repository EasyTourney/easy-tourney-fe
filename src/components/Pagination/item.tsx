import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { Box } from '@mui/material'

interface ItemProps {
  children: number
}

function PaginationItem({ children }: ItemProps) {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  const handlePagination = () => {
    const param = Array.from(params.entries())

    for (let i of params.entries()) {
      param.push(i)
    }

    const queries: { [key: string]: string } = {}

    for (let i of param) queries[i[0]] = i[1]
    if (Number(children)) {
      queries.page = children.toString()
    }
    navigate({
      pathname: `/categories`,
      search: createSearchParams(queries).toString()
    })
  }
  return (
    <Box
      component="button"
      sx={{
        width: '36px',
        height: '36px',
        color: 'gray',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '50%',
        outline: 'none',
        backgroundColor: 'white',
        border: '1px solid rgb(222, 226, 230)',
        cursor: 'pointer',
        ...(Number(children)
          ? {
              alignItems: 'center',
              '&:hover': {
                backgroundColor: 'rgb(129 187 249)',
                borderColor: 'rgb(222, 226, 230)'
              }
            }
          : {
              alignItems: 'flex-end',
              paddingBottom: 1
            }),
        ...(Number(params.get('page')) === Number(children) || (!params.get('page') && children === 1)
          ? {
              borderRadius: '50%',
              backgroundColor: 'rgb(53,143,238)',
              color: 'white'
            }
          : {})
      }}
      onClick={handlePagination}
      disabled={!Number(children)}
    >
      {children}
    </Box>
  )
}

export default PaginationItem
