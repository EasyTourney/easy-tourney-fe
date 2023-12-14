import { Box, Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/admin'
import { Header } from '../../components/Header'
import {  useState, useEffect } from 'react'
import React from 'react'
import withTokenCheck from '../../hoc/withTokenCheck'

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
    <Box>
      <Grid container spacing={2}>
        <Grid
          sx={{ height: '100vh', transition: 'all 0.3s ease' }}
          item
          xs={sidebarCollapsed ? 2 : 2.2}
          sm={sidebarCollapsed ? 1 : 4.7}
          md={sidebarCollapsed ? 1 : 3.4}
          lg={sidebarCollapsed ? 0.7 : 2.3}
          xl={sidebarCollapsed ? 0.6 : 2}
        >
          <Sidebar onToggleCollapse={handleSidebarToggle} />
        </Grid>
        <Grid
          item
          xs={sidebarCollapsed ? 10 : 9.8}
          sm={sidebarCollapsed ? 11 : 7.3}
          md={sidebarCollapsed ? 11 : 8.6}
          lg={sidebarCollapsed ? 11.3 : 9.7}
          xl={sidebarCollapsed ? 11.4 : 10}
          style={{ transition: 'all 0.3s ease' }}
        >
          <Box>
            <Header />
            <Box sx={{ marginRight: '15px' }}>
              <Outlet />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default withTokenCheck(BaseTemplate) 
