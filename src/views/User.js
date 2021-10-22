import '../css/user.css';
import avatar_default from '../img/avatar_default.png';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import Contact from "./Contact";
import UserProfile from "./UserProfile";
import BubbleMessage from "./BubbleMessage";
import MessageInput from "./MessageInput";
import SendIcon from "./SendIcon";


function User() {
  return (
    <div className="User">
      <Grid container direction="row" sx={{ height: '100vh' }}>
        <Grid item lg={2} sx={{ bgcolor: 'background.secondary' }} container>
          <UserProfile />
        </Grid>
        <Grid item lg={8} sx={{ bgcolor: 'background.default' }} direction="column" container>
          <Grid sx={{ pl: 48, pr: 53, pt: 12, pb: 10 , height: '8vh' }} direction="row" container bgcolor="primary.main">
            <Avatar alt="Avatar" src={avatar_default} sx={{ width: 52, height: 52 }} />
            <Typography variant="body1" color="text.light" sx={{ ml: 32, mt: 13 }}>Lucía Gonzáles</Typography>
          </Grid>
          <Grid
            sx={{ height: '82vh' }}
            direction="column"
            container>
              <Box sx={{pl: 48, pr: 53, pt: 20, height: '100%' }}
                style={{ overflowY: 'auto', overflowX: 'hidden' }}>
                <BubbleMessage sentbyme={1} isfirst={1} message="Hola" />
                <BubbleMessage sentbyme={0} isfirst={1} message="Hola" />
                <BubbleMessage sentbyme={1} isfirst={1} message="Lorem Ipsum is simply dummy text of the printing and typesetting industry." />
                <BubbleMessage sentbyme={1} isfirst={0} message="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
                <BubbleMessage sentbyme={0} isfirst={1} message="It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged." />
                <BubbleMessage sentbyme={0} isfirst={0} message="It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged." />
                <BubbleMessage sentbyme={0} isfirst={0} message="It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged." />
                <BubbleMessage sentbyme={1} isfirst={1} message="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
                <BubbleMessage sentbyme={1} isfirst={0} message="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
                <BubbleMessage sentbyme={1} isfirst={0} message="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
                <BubbleMessage sentbyme={0} isfirst={1} message="It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged." />
                <BubbleMessage sentbyme={0} isfirst={0} message="It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged." />
                <BubbleMessage sentbyme={0} isfirst={0} message="It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged." />
              </Box>
          </Grid>
          <Divider light />
          <Grid sx={{ pl: 22, pr: 0, pt: 20, pb: 20 , height: '9vh' }}
            direction="row"
            container
            bgcolor="background.secondary">
              <MessageInput placeholder="Escribe un mensaje..." />
              <SendIcon sx={{ width: 45, height: 45, ml: 10 }} style={{ cursor: 'pointer'}} />
          </Grid>
        </Grid>
        <Grid item lg={2} sx={{ bgcolor: 'background.secondary' }} container>
          <Contact />
        </Grid>
      </Grid>
    </div>
  );
}

export default User;
