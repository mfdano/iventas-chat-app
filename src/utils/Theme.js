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
      secondary: '#f6f8fc'
    },
    button: {
      main: '#20CC81',
      contrastText: '#fff',
    },
    text: {
      main: '#2C2E50',
      headerdetail: 'rgba(145, 147, 166, 1)',
      textdetails: 'rgba(44, 46, 80, 1)',
      message: '#000000',
      light: '#ffffff'
    },
    list: {
      item: 'rgba(0, 153, 255, 0.05)'
    },
    bubble: {
      main: '#ffffff',
      secondary: '#ECFFF7'
    },
    input: {
      background: '#ffffff'
    }
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
    h4: {
      fontFamily: 'Poppins',
      fontSize: 14,
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h5: {
      fontFamily: 'Poppins',
      fontSize: 12,
      fontWeight: 500,
      lineHeight: 1.2,
    },
    subtitle1: {
      fontFamily: 'Inter',
      fontSize: 16,
      fontWeight: 700,
      lineHeight: 1.54,
    },
    subtitle2: {
      fontFamily: 'Poppins',
      fontSize: 14,
      fontWeight: 600,
      lineHeight: 1.2,
    },
    body1: {
      fontFamily: 'Poppins',
      fontSize: 18,
      fontWeight: 700,
      lineHeight: 1.24,
    },
    body2: {
      fontFamily: 'Poppins',
      fontSize: 16,
      fontWeight: 500,
      lineHeight: 1.24,
    },
    caption: {
      fontFamily: 'Poppins',
      fontSize: 14,
      fontWeight: 400,
      lineHeight: '18px',
    },
    input: {
      fontFamily: 'Poppins',
      fontSize: 15,
      fontWeight: 500,
      lineHeight: 1.24,
    },
    button: {
      fontFamily: 'Poppins',
    },
  },
  spacing: 1
});

export default Theme;