import '../css/user.css';

import Grid from '@mui/material/Grid';

import Contact from "./Contact";
import UserProfile from "./UserProfile";
import BubbleMessage from "./BubbleMessage";

function User() {
  return (
    <div className="User">
      <Grid container direction="row" className="main-container">
        <Grid item lg={2} sx={{ bgcolor: 'background.secondary' }} container>
          <UserProfile />
        </Grid>
        <Grid item lg={8} sx={{ bgcolor: 'background.default' }} container>
          <Grid sx={{ pl: 48, pr: 53, pt: 20 }} direction="column" container>
            <BubbleMessage sentbyme={1} isfirst={1} message="Hola" />
            <BubbleMessage sentbyme={0} isfirst={1} message="Hola" />
            <BubbleMessage sentbyme={1} isfirst={1} message="Lorem Ipsum is simply dummy text of the printing and typesetting industry." />
            <BubbleMessage sentbyme={1} isfirst={0} message="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
            <BubbleMessage sentbyme={0} isfirst={1} message="It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged." />
            <BubbleMessage sentbyme={0} isfirst={0} message="It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged." />
            <BubbleMessage sentbyme={0} isfirst={0} message="It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged." />
            <BubbleMessage sentbyme={1} isfirst={1} message="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
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
