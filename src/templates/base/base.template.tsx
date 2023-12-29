import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/admin'
import Header from '../../components/Header/General/Header'
import { useState, useEffect } from 'react'
import React from 'react'
import withTokenCheck from '../../hoc/withTokenCheck'
import styles from '../Template.module.css'

function BaseTemplate() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [userRole, setUserRole] = useState('')

  useEffect(() => {
    const storedUserRole = localStorage.getItem('userRole')
    if (storedUserRole) {
      setUserRole(storedUserRole)
    }
  }, [userRole])

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <Box className={styles['main-container']}>
      <Box>
        <Sidebar onToggleCollapse={handleSidebarToggle} />
      </Box>
      <Box className={styles['main-content']} sx={{ marginLeft: `${sidebarCollapsed ? '7rem' : '17.5rem'}` }}>
        <Box>
          <Box className={styles['sticky-header']}>
            <Header />
          </Box>
          <Box>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default withTokenCheck(BaseTemplate)
