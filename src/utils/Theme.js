import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#00cd7e',
      secondary: '#20CC81'
    },
    secondary: {
      main: '#E5E5E5',
      subtitle: '#757575'
    },
    background: {
      default: '#f3f4f8',
      secondary: '#f6f8fc',
      text: '#ffffff'
    },
    button: {
      main: '#20CC81',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: 'Source Sans Pro',
    h1: {
      fontFamily: 'Poppins',
      fontSize: 57,
      fontWeight: 400,
      lineHeight: 1.24,
    },
    h2: {
      fontFamily: 'Montserrat',
      fontSize: 40,
      fontWeight: 700,
      lineHeight: 1.54,
    },
    h3: {
      fontFamily: 'Montserrat',
      fontSize: 40,
      fontWeight: 700,
      lineHeight: 1.2,
    },
    subtitle1: {
      fontFamily: 'Inter',
      fontSize: 16,
      fontWeight: 700,
      lineHeight: 1.54,
    },
    button: {
      fontFamily: 'Poppins',
    },
  },
  spacing: 1
});

export default Theme;