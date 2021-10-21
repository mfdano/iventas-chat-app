import avatar_default from '../img/avatar_default.png';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SvgIcon from '@mui/material/SvgIcon';


function BubbleChatIcon(props) {
  return (
    <SvgIcon {...props} width="99" height="94" viewBox="0 0 99 94" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M62.639 0.769554C82.3977 0.769554 98.4211 16.8596 98.4211 36.7178C98.4211 56.5682 82.3977 72.6583 62.639 72.6583H40.6918L19.603 94.0003V68.4007C8.36644 62.3407 0.733643 50.4149 0.733643 36.7178C0.733643 16.8519 16.7494 0.769554 36.5158 0.769554H62.639Z" fill="#00CD7E" stroke="#00CD7E" strokeLinecap="round" strokeLinejoin="round"/>
    </SvgIcon>
  );
}

function UserProfile() {
  return (
    <Grid container direction="column">
      <Avatar alt="Avatar" src={avatar_default} sx={{ width: 104, height: 104,  mx: 'auto', mt: 64 }} />
      <Typography variant="body1" color="text.main" sx={{ mt: 18,  mx: 'auto' }}>Alejandro García</Typography>
      <Typography variant="body2" color="text.main" sx={{ mt: 3, mb: 74, mx: 'auto' }}>55 2026 0240</Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ pl: 50,  height: 100, bgcolor: 'list.item' }}>
            <ListItemIcon>
              <BubbleChatIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="subtitle2" color="text.main">Chat</Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Grid>
  );
}

export default UserProfile;