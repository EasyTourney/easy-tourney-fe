import { Box, Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import { Suspense, useState } from 'react'
import React from 'react'
import Loader from '../../components/Loader'
import SidebarOganizer from '../../components/Sidebar/oganizer'
import CustomizedBreadcrumbsOganizer from '../../components/Navigation/oganizer'

function OrganizerTemplate() {
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
          sm={sidebarCollapsed ? 1 : 4.7}
          md={sidebarCollapsed ? 1 : 3.4}
          lg={sidebarCollapsed ? 0.7 : 2.3}
          xl={sidebarCollapsed ? 0.6 : 2}
        >
          <SidebarOganizer onToggleCollapse={handleSidebarToggle} />
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
            <Box sx={{ marginTop: '20px' }}>
              <CustomizedBreadcrumbsOganizer />
            </Box>
            <Box sx={{ marginRight: '15px' }}>
              <Suspense
                fallback={
                  <>
                    <Loader />
                  </>
                }
              >
                <Outlet />
              </Suspense>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default OrganizerTemplate
