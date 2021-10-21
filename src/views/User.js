import '../css/user.css';

import Grid from '@mui/material/Grid';
import Contact from "./Contact";
import UserProfile from "./UserProfile";


function User() {
  return (
    <div className="User">
      <Grid container direction="row" className="main-container">
        <Grid item lg={2} sx={{ bgcolor: 'background.default' }} container>
          <UserProfile />
        </Grid>
        <Grid item lg={8} sx={{ bgcolor: 'primary.main' }} container>
        </Grid>
        <Grid item lg={2} sx={{ bgcolor: 'background.secondary' }} container>
          <Contact />
        </Grid>
      </Grid>
    </div>
  );
}

export default User;