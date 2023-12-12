import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ReorderIcon from '@mui/icons-material/Reorder'
import SortIcon from '@mui/icons-material/Sort'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import GroupIcon from '@mui/icons-material/Group'
import CategoryIcon from '@mui/icons-material/Category'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { IconButton } from '@mui/material'
import styles from './Sidebar.module.css'
import React from 'react'

type SidebarProps = {
  onToggleCollapse: () => void
}

function Sidebar({ onToggleCollapse }: SidebarProps) {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [userRole, setUserRole] = useState('')
  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role || '');
  }, []); 
  

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed)
    onToggleCollapse()
  }
  return (
    <Box className={`${styles.sidebar} ${collapsed && styles['sidebar-collapsed']}`}>
      <Box className={`${styles['sidebar-header']} ${collapsed && styles['sidebar-collapsed']}`}>
        <Box>
          {!collapsed && (
            <>
              <Box className={styles['logo-container']}>
                <Typography sx={{ color: 'white', fontSize: '25px', fontWeight: '600', paddingLeft: '30px' }}>
                  EasyTourney
                </Typography>
                <Box sx={{ marginLeft: '10px' }}>
                  <IconButton sx={{ fontSize: 30, color: 'white' }} onClick={handleToggleCollapse}>
                    <ReorderIcon sx={{ fontSize: 30 }} />
                  </IconButton>
                </Box>
              </Box>
            </>
          )}
          {collapsed && (
            <Box>
              <IconButton onClick={handleToggleCollapse}>
                <SortIcon sx={{ fontSize: '35px', color: 'white', marginReft: '10px' }} />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
      <hr className={styles['hr-line']} />
      <Box>
        <List
          sx={{
            color: '#fff'
          }}
        >
          {userRole !== 'ORGANIZER' && ( 
            <Link style={{ color: 'white', textDecoration: 'none' }} to="/category">
              <ListItem
                button
                selected={location.pathname === '/category'}
                sx={{ '&.Mui-selected': { backgroundColor: 'gray', borderRadius: '10px' } }}
              >
                <ListItemIcon sx={{ color: 'white' }}>
                  <CategoryIcon />
                </ListItemIcon>
                {!collapsed && <ListItemText className={styles['text-menu']} primary="Category" />}
              </ListItem>
            </Link>
          )}
          {userRole !== 'ORGANIZER' && ( 
            <Link style={{ color: 'white' }} to="/organizer">
              <ListItem
                button
                selected={location.pathname === '/organizer'}
                sx={{ '&.Mui-selected': { backgroundColor: 'gray', borderRadius: '10px' } }}
              >
                <ListItemIcon sx={{ color: 'white' }}>
                  <GroupIcon />
                </ListItemIcon>
                {!collapsed && <ListItemText className={styles['text-menu']} primary="Organizer" />}
              </ListItem>
            </Link>
          )}
          <Link style={{ color: 'white' }} to="/tournament">
            <ListItem
              button
              selected={location.pathname === '/tournament'}
              sx={{ '&.Mui-selected': { backgroundColor: 'gray', borderRadius: '10px' } }}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                <EmojiEventsIcon />
              </ListItemIcon>
              {!collapsed && <ListItemText className={styles['text-menu']} primary="Tournament" />}
            </ListItem>
          </Link>
        </List>
      </Box>
    </Box>
  )
}

export default Sidebar
