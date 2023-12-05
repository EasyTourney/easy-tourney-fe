import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Header } from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { Outlet } from 'react-router-dom'

const Public = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ display: 'flex', position: 'relative', height: '100vh' }}>
      <Sidebar />
      <Box
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', p: '24px', overflow: 'auto' }}
      >
        <Header />
        <Box style={{ overflow: 'auto' }}>
          <Outlet />
        </Box>
      </Box>
    </Container>
  )
}

export default Public
