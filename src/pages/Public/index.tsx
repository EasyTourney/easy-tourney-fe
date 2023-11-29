import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { Outlet } from 'react-router-dom'

const Public = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ display: 'flex', position: 'relative' }}>
      <Sidebar />
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', p: '24px' }}>
        <Header />
        <Outlet />
      </Box>
    </Container>
  )
}

export default Public
