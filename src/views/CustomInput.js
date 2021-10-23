import TextField from '@mui/material/TextField';

import { styled } from '@mui/system';

const CssTextField = styled(TextField)(({ theme }) => ({
  '& label.Mui-focused': {
    color: 'green'
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green'
  },
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.input.default,
    borderRadius: '0px',
    padding: '10px 22px',
    height: '40px',
    ...theme.typography.input2,
    '& fieldset': {
      borderColor: 'white'
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main
    }
  }
}));

function CustomInput(props) {
  return <CssTextField {...props} />
}

export default CustomInput;
