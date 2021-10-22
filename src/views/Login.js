import main from '../img/main.svg';
import '../css/login.css';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LoginButton from "../views/LoginButton";
import CustomInput from "../views/CustomInput";

function Login() {
  return (
    <div className="Login">
      <Grid container direction="row" sx={{ height: '100vh' }}>
        <Grid item lg={4} sx={{ bgcolor: 'background.default' }} container justifyContent="center" alignItems="center">
          <img src={main} alt="main" className="main-img" />
        </Grid>
        <Grid item lg={8} sx={{ bgcolor: 'background.secondary' }} container justifyContent="center" alignItems="center">
          <Grid item lg={4} sx={{ bgcolor: 'background.secondary' }} direction="column" container>
            <Typography variant="h3" sx={{ textAlign: 'center', mb: 147 }}>Iniciar Sesión</Typography>
            <Typography variant="subtitle1" color="secondary.subtitle" sx={{ mb: 4 }}>Correo</Typography>
            <CustomInput id="email" aria-label="Correo" placeholder="Ingresa tu correo" />
            <Typography variant="subtitle1" color="secondary.subtitle" sx={{ mb: 4, mt: 33 }}>Contraseña</Typography>
            <CustomInput id="password" aria-label="Contraseña" placeholder="Ingresa tu contraseña" />
            <LoginButton sx={{ mx: 'auto', mt: 150 }}>Iniciar Sesión</LoginButton>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;