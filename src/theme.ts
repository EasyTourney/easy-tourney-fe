import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const Theme = extendTheme({
  colorSchemes: {
    light: {},
    dark: {}
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            background: '#dcdde1',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            background: 'white'
          }
        },
        '.MuiDataGrid-cell:focus-within': {
          border: 'none',
          outline: 'none'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: 'none',
          borderWidth: '0.5px',
          '&:hover': {
            borderWidth: '0.5px'
          }
        }
      }
    }
  }
})

export default Theme
