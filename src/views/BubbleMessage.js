import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/system';
import { makeStyles } from '@mui/styles';
import avatar_default from '../img/avatar_default.png';

const useStyles = makeStyles((theme) => ({
  bubblecolor:(props) => ({
    backgroundColor: props.sentbyme 
    ? theme.palette.bubble.main
    : theme.palette.bubble.secondary,
  })
}));

const BubbleMessageContainer = styled('div')(`
  width: auto;
  height: auto;
  border-radius: 20px;
  box-shadow: 0px 1.06px 1.06px rgba(0, 0, 0, 0.15);
`);

function BubbleMessage(props) {
  const classes = useStyles(props);

  const renderAvatar = () => {
    if (props.isfirst) {
      return <Avatar alt="Avatar"
      src={avatar_default}
      sx={{ width: 40, height: 40, mr: props.sentbyme ? 10 : 0, ml:  props.sentbyme ? 0 : 10}} />;
    }
  }

  return (
    <Grid direction={ props.sentbyme ? "row": "row-reverse" }
      container
      mt={ props.isfirst ? 24 : 0 }
      pl={ props.isfirst ? 0 : 48 }
      pr={ props.isfirst ? 0 : 48 }
      justifyContent="flex-start"
      alignItems="flex-start" >
      { renderAvatar() }
      <BubbleMessageContainer
        { ...props }
        className={ classes.bubblecolor }
        sx={{ maxWidth: '55%', mb: 4, pt: 12, pb: 12, pl: 20, pr: 20 }} >
        <Typography variant="caption" color="text.message" sx={{ mx: 'auto' }}>
          { props.message }
        </Typography>
      </BubbleMessageContainer>
    </Grid>
  )
}

export default BubbleMessage;