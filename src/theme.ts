import { createTheme } from '@mui/material/styles'

const Theme = createTheme({
  palette: {
    // Config global color here
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '0.5rem',
          width: '32vw !important',
          maxWidth: '500px !important'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '&.MuiTextField-root': {
            marginTop: '0.25rem !important'
          },
          '& .MuiInputBase-input': {
            padding: '0.8rem 1rem'
          },
          '&.login-textfield .MuiInputBase-input': {
            padding: '1rem 1rem'
          }
        }
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            padding: '0'
          },
          '& .MuiOutlinedInput-root .MuiAutocomplete-input': {
            padding: '0.8rem 1rem'
          }
        }
      }
    },
    MuiStack: {
      styleOverrides: {
        root: {
          '&.MuiStack-root': {
            spacing: '2',
            width: '100% !important'
          }
        }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          '&.MuiDialogTitle-root.MuiTypography-root': {
            fontSize: '1.7rem !important',
            textAlign: 'center'
          }
        }
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          '&.MuiDialogContent-root': {
            padding: '0 24px 20px !important'
          }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiDialogContent-root': {
            fontFamily: 'Poppins, sans-serif !important'
          }
        }
      }
    }
  }
})

export default Theme
