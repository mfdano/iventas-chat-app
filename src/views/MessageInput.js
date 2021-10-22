import TextareaAutosize from '@mui/material/TextareaAutosize';
import { styled } from '@mui/system';

const MessageInput = styled(TextareaAutosize)(({ theme }) => ({
  ...theme.typography.input,
  backgroundColor: theme.palette.input.background,
  width: '90%',
  height: 18,
  borderRadius: 21,
  paddingTop: 14,
  paddingBottom: 14,
  paddingLeft: 30,
  border: '1px solid rgba(0, 0, 0, 0.1)',
  '&:hover': {
    border: `1px solid ${theme.palette.primary.main}`,
  },
  '&:focus': {
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));

export default MessageInput;