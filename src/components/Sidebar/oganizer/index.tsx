import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ReorderIcon from '@mui/icons-material/Reorder'
import SortIcon from '@mui/icons-material/Sort'
import WysiwygIcon from '@mui/icons-material/Wysiwyg'
import GroupsIcon from '@mui/icons-material/Groups'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { IconButton } from '@mui/material'
import styles from './SibarOganizer.module.css'
import React from 'react'

type SidebarProps = {
  onToggleCollapse: () => void
}

function SidebarOganizer({ onToggleCollapse }: SidebarProps) {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (windowWidth < 610) {
      setCollapsed(true)
    } else {
      setCollapsed(false)
    }
  }, [windowWidth])

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
                <Typography
                  className={styles['customTypography']}
                  sx={{ color: 'white', fontSize: '25px', fontWeight: '600' }}
                >
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
          <Link style={{ color: 'white', textDecoration: 'none' }} to="/tournament/general">
            <ListItem
              button
              selected={location.pathname === '/tournament/general'}
              sx={{ '&.Mui-selected': { backgroundColor: 'gray', borderRadius: '10px' } }}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                <WysiwygIcon />
              </ListItemIcon>
              {!collapsed && <ListItemText className={styles['text-menu']} primary="General" />}
            </ListItem>
          </Link>
          <Link style={{ color: 'white' }} to="/tournament/participant">
            <ListItem
              button
              selected={location.pathname === '/tournament/participant'}
              sx={{ '&.Mui-selected': { backgroundColor: 'gray', borderRadius: '10px' } }}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                <GroupsIcon />
              </ListItemIcon>
              {!collapsed && <ListItemText className={styles['text-menu']} primary="Participant" />}
            </ListItem>
          </Link>
          <Link style={{ color: 'white' }} to="/tournament/schedule">
            <ListItem
              button
              selected={location.pathname === '/tournament/schedule'}
              sx={{ '&.Mui-selected': { backgroundColor: 'gray', borderRadius: '10px' } }}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                <CalendarMonthIcon />
              </ListItemIcon>
              {!collapsed && <ListItemText className={styles['text-menu']} primary="Schedule" />}
            </ListItem>
          </Link>
          <Link style={{ color: 'white' }} to="/tournament/result">
            <ListItem
              button
              selected={location.pathname === '/tournament/result'}
              sx={{ '&.Mui-selected': { backgroundColor: 'gray', borderRadius: '10px' } }}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                <ContentPasteIcon />
              </ListItemIcon>
              {!collapsed && <ListItemText className={styles['text-menu']} primary="Result" />}
            </ListItem>
          </Link>
        </List>
      </Box>
    </Box>
  )
}

export default SidebarOganizer
