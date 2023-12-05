import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { Divider } from '@mui/material'
import { Logout } from '@mui/icons-material'
import styles from './Header.module.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/reducers/auth'

const Header: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

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

  return (
    <Box>
      <AppBar position="static" className={styles['main-app-header']}>
        <Toolbar className={styles['toolbar']}>
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
                Hello, Nguyen Huu Huy
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

export default Header
