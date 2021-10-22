import avatar_default from '../img/avatar_default.png';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BubbleChatIcon from "./BubbleChatIcon";

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