import * as React from 'react';
import InputUnstyled from '@mui/core/InputUnstyled';
import { styled } from '@mui/system';

const StyledInputElement = styled('input')(`
  width: 100%;
  font-size: 16px;
  font-family: Source Sans Pro;
  font-weight: 400;
  line-height: 1.4375em;
  background: #F6F8FC;
  border: 1px solid #fff;
  padding: 10px 20px;
  color: #979797;
  transition: width 300ms ease;

  &:hover {
    border: 1px solid;
    background: #ffffff;
    border-color: #00cd7e;
  }


  &:focus {
    outline: none;
    transition: width 200ms ease-out;
  }
`);

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  return (
    <InputUnstyled components={{ Input: StyledInputElement }} {...props} ref={ref} />
  );
});

export default CustomInput;
