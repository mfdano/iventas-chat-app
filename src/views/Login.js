import main from '../img/main.svg';
import '../css/login.css';
import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

import LoginButton from "../views/LoginButton";
import CustomInput from "../views/CustomInput";

import { login } from '../services/Service';
import { isValidEmail } from '../utils/Validation';

function Login() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openedAlert, setOpenedAlert] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const [userId, setUserId] = useState('');
  const [isLogInCompleted, setIsLogInCompleted] = useState(false);
  const history = useHistory();
  
  const onClickBtnLogin = async (e) => {
    try {
      setIsLoggingIn(true);
      console.log(email, password);
      const response = await login('dano@email.com', '12345678');
      setUserId(response.id);
      setIsLogInCompleted(true);
    } catch(e) {
      setIsError(true)
      setOpenedAlert(true)
    } finally {
      setIsLoggingIn(false);
    }
  };

  useEffect(() => {
    if (isLogInCompleted) history.push(`/user/${userId}`);
    //console.log('useEffect')
  }, [isLoggingIn]);

  return (
    <div className="Login">
      <Snackbar
        open={openedAlert}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="error" sx={{ width: '100%' }} onClose={() => { setOpenedAlert(false)}}>
          Error al iniciar sesión, verifica tus credenciales.
        </Alert>
      </Snackbar>
      <Grid container direction="row" sx={{ height: '100vh' }}>
        <Grid item lg={4} sx={{ bgcolor: 'background.default' }} container justifyContent="center" alignItems="center">
          <img src={main} alt="main" className="main-img" />
        </Grid>
        <Grid item lg={8} sx={{ bgcolor: 'background.secondary' }} container justifyContent="center" alignItems="center">
          <Grid item lg={4} sx={{ bgcolor: 'background.secondary' }} direction="column" container>
            <form>
            <Typography variant="h3" sx={{ textAlign: 'center', mb: 147 }}>Iniciar Sesión</Typography>
            <Typography variant="subtitle1" color="secondary.subtitle" sx={{ mb: 4 }}>Correo</Typography>
            <CustomInput
              id="email"
              aria-label="Correo"
              placeholder="Ingresa tu correo"
              type="email"
              value={email}
              error={isError}
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
            <Typography variant="subtitle1" color="secondary.subtitle" sx={{ mb: 4, mt: 33 }}>Contraseña</Typography>
            <CustomInput
              id="password"
              aria-label="Contraseña"
              placeholder="Ingresa tu contraseña"
              type="password"
              value={password}
              error={isError}
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
            />
            <Box sx={{mt: 150, position: 'relative', textAlign: 'center' }}>
              <LoginButton onClick={ onClickBtnLogin } disabled={isLoggingIn} size="small">Iniciar Sesión</LoginButton>
              {isLoggingIn && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: 'button.loader',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </Box>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;