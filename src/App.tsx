import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { ToastContainer } from 'react-toastify'
import { Suspense } from 'react'
import { Box } from '@mui/material'
import { GlobalStyle } from './styles/GlobalStyle'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <Box>
      <Suspense fallback={<>Loading...</>}>
        <GlobalStyle>
          <ToastContainer style={{ fontSize: '15px' }} autoClose={1000} draggable />
          <RouterProvider router={router}></RouterProvider>
        </GlobalStyle>
      </Suspense>
    </Box>
  )
}

export default App
