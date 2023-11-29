import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import theme from './theme'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <App />
    </CssVarsProvider>
  </BrowserRouter>
)
