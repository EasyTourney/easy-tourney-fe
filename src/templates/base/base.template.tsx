import { Box, Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import { Header } from '../../components/Header'
import { Suspense, useState } from 'react'
import CustomizedBreadcrumbs from '../../components/Navigation'
import React from 'react'

function BaseTemplate() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

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
          sm={sidebarCollapsed ? 1 : 4}
          md={sidebarCollapsed ? 1 : 3.4}
          lg={sidebarCollapsed ? 0.7 : 2.3}
          xl={sidebarCollapsed ? 0.4 : 2}
        >
          <Sidebar onToggleCollapse={handleSidebarToggle} />
        </Grid>
        <Grid
          item
          xs={sidebarCollapsed ? 10 : 9.8}
          sm={sidebarCollapsed ? 11 : 8}
          md={sidebarCollapsed ? 11 : 8.6}
          lg={sidebarCollapsed ? 11.3 : 9.7}
          xl={sidebarCollapsed ? 11.6 : 10}
          style={{ transition: 'all 0.3s ease' }}
        >
          <Box>
            <Header />
            <Box sx={{ marginTop: '20px' }}>
              <CustomizedBreadcrumbs />
            </Box>
            <Box sx={{ marginRight: '15px' }}>
              <Suspense fallback={<>Loading...</>}>
                <Outlet />
              </Suspense>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default BaseTemplate
