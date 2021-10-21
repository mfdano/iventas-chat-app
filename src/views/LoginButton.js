import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/core/ButtonUnstyled';
import { styled } from '@mui/system';

const LoginButtonRoot = styled('button')(`
  background-color: #20CC81;
  padding: 10px 0px;
  border-radius: 25px;
  width: 249px;
  color: #fff;
  font-weight: 600;
  font-family: Poppins;
  font-size: 18px;
  line-height: 27px;
  transition: all 200ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #00cd7e;
  }

  &.${buttonUnstyledClasses.active} {
    background-color: #00cd7e;
  }

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

function LoginButton(props) {
  return <ButtonUnstyled {...props} component={LoginButtonRoot} />;
}

export default LoginButton;