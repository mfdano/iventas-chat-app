import ButtonUnstyled from '@mui/core/ButtonUnstyled';
import { styled } from '@mui/system';

const LoginButtonRoot = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.primary.secondary,
  padding: '10px 0px',
  borderRadius: '25px',
  width: '249px',
  color: '#fff',
  fontWeight: 600,
  fontFamily: 'Poppins',
  fontSize: '18px',
  lineHeight: '27px',
  transition: 'all 200ms ease',
  cursor: 'pointer',
  border: 'none',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
  '&:active': {
    backgroundColor: theme.palette.primary.main,
  },
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
}));

/*
  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: 0 0 0 0 rgba(0, 127, 255, 0);
  }
`);
*/



function LoginButton(props) {
  return <ButtonUnstyled {...props} component={LoginButtonRoot} />;
}

export default LoginButton;