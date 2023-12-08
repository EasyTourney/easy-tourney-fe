import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import theme from './theme'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <CssVarsProvider theme={theme}>
          <CssBaseline />
          <App />
        </CssVarsProvider>
      </BrowserRouter>
    </LocalizationProvider>
  </Provider>
)
