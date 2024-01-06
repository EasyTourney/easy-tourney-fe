import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { Chip, Divider, Typography } from '@mui/material'
import { AutoMode, Cached, CheckCircleOutline, HelpOutline, HighlightOff, Logout } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../redux/reducers'
import { getLocalStorage } from '../../../utils/localStorage'
import styles from '../Header.module.css'
import { RootState } from '../../../redux/store'

const TournamentHeader: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const pathSegments = location.pathname.split('/').filter((segment) => segment !== '')
  const general = useSelector((state: any) => state.tournament.general)
  const { status } = useSelector((state: RootState) => state.tournament.general)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [userInfo, setUserInfo] = React.useState<any>(null)

  React.useEffect(() => {
    const storedUserInfo = getLocalStorage('user')
    if (storedUserInfo) {
      setUserInfo(storedUserInfo)
    }
  }, [])

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleLogout = () => {
    setAnchorEl(null)
    dispatch(logout())
    navigate('/login')
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const capitalizeFirstLetter = (str: any) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <Box>
      <AppBar position="static" className={styles['main-app-header']}>
        <Toolbar className={styles['toolbar']}>
          <Box className={styles['title']}>
            <Typography
              variant="h5"
              gutterBottom
              className={styles['typography-header']}
              style={{ marginTop: pathSegments.length > 1 ? '2.2rem' : '0' }}
            >
              {pathSegments.length > 0 ? general.title : capitalizeFirstLetter(pathSegments[pathSegments.length - 1])}
              {status === 'NEED_INFORMATION' ? (
                <Chip
                  sx={{ marginLeft: '1rem', marginBottom: '0.25rem' }}
                  color="warning"
                  variant="filled"
                  icon={<HelpOutline color="warning" />}
                  label={status.replace('_', ' ')}
                />
              ) : status === 'READY' ? (
                <Chip
                  sx={{ marginLeft: '1rem', marginBottom: '0.25rem' }}
                  color="primary"
                  variant="filled"
                  icon={<AutoMode color="primary" />}
                  label={status.replace('_', ' ')}
                />
              ) : status === 'IN_PROGRESS' ? (
                <Chip
                  sx={{ marginLeft: '1rem', marginBottom: '0.25rem' }}
                  color="secondary"
                  variant="filled"
                  icon={<Cached color="secondary" />}
                  label={status.replace('_', ' ')}
                />
              ) : status === 'FINISHED' ? (
                <Chip
                  sx={{ marginLeft: '1rem', marginBottom: '0.25rem' }}
                  color="success"
                  variant="filled"
                  icon={<CheckCircleOutline color="success" />}
                  label={status.replace('_', ' ')}
                />
              ) : status === 'DISCARDED' ? (
                <Chip
                  sx={{ marginLeft: '1rem', marginBottom: '0.25rem' }}
                  color="error"
                  variant="filled"
                  icon={<HighlightOff color="error" />}
                  label={status.replace('_', ' ')}
                />
              ) : (
                <></>
              )}
            </Typography>
          </Box>
          <Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem className={styles['menu-info-item']} onClick={handleClose} disabled>
                Hello {userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : 'Guest'}
              </MenuItem>
              <Divider className={styles['menu-divider']} />
              <MenuItem className={styles['menu-list-item']} onClick={handleLogout}>
                <Logout />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default TournamentHeader
