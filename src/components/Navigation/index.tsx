import { emphasize, styled } from '@mui/material/styles'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Chip from '@mui/material/Chip'
import HomeIcon from '@mui/icons-material/Home'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Link, useLocation } from 'react-router-dom'

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor = theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[800]
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06)
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12)
    }
  }
}) as typeof Chip
const capitalizeFirstLetter = (str: any) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const CustomizedBreadcrumbs = () => {
  const location = useLocation()
  const pathSegments = location.pathname.split('/').filter((segment) => segment !== '')

  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb component={Link} to="/" label="Home" icon={<HomeIcon fontSize="small" />} />

        {pathSegments.map((segment, index) => {
          const isLastSegment = index === pathSegments.length - 1
          const to = `/${pathSegments.slice(0, index + 1).join('/')}`
          return (
            <StyledBreadcrumb
              key={segment}
              component={Link}
              to={to}
              label={isLastSegment ? capitalizeFirstLetter(segment) : undefined}
              icon={isLastSegment ? undefined : <ExpandMoreIcon />}
            />
          )
        })}
      </Breadcrumbs>
    </div>
  )
}

export default CustomizedBreadcrumbs
