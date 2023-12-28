import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import React from 'react'
import SidebarOrganizer from '../../components/Sidebar/organizer'
import CustomizedBreadcrumbsOrganizer from '../../components/Navigation/organizer'
import withTokenCheck from '../../hoc/withTokenCheck'
import styles from '../Template.module.css'
import TournamentHeader from '../../components/Header/Tournament/TournamentHeader'

function OrganizerTemplate() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <Box className={styles['main-container']}>
      <Box>
        <SidebarOrganizer onToggleCollapse={handleSidebarToggle} />
      </Box>
      <Box className={styles['main-content']} sx={{ marginLeft: `${sidebarCollapsed ? '7rem' : '17.5rem'}` }}>
        <Box>
          <Box className={styles['sticky-header']}>
            <CustomizedBreadcrumbsOrganizer />
            <TournamentHeader />
          </Box>
          <Box>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default withTokenCheck(OrganizerTemplate)
