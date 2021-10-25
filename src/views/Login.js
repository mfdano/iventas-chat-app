import main from '../img/main.svg';
import '../css/login.css';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

import LoginButton from "../views/LoginButton";
import CustomInput from "../views/CustomInput";

import { login } from '../services/Service';
import { isValidEmail, isValidPassword } from '../utils/Validation';

function Login() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [appStatus, setAppStatus] = useState({});
  const [onNotify, setOnNotify] = useState(false);
  const [userId, setUserId] = useState('');
  const [isLogInCompleted, setIsLogInCompleted] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (isLogInCompleted) history.push(`/user?id=${userId}`);
  }, [isLoggingIn]);
  
  const onClickBtnLogin = async (e) => {
    try {
      setIsLoggingIn(true);
      const response = await login(email, password);
      setUserId(response.id);
      setIsLogInCompleted(true);
    } catch(e) {
      setAppStatus({ status: 'error', message: e.message });
      setOnNotify(true);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value)
    if (!isValidEmail(e.target.value.trim())) {
      setIsErrorEmail(true)
    } else {
      setIsErrorEmail(false)
      setEmail(e.target.value.trim())
    }
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value)
    if (!isValidPassword(e.target.value.trim())) {
      setIsErrorPassword(true)
    } else {
      setIsErrorPassword(false)
      setPassword(e.target.value.trim())
    }
  };

  const onKeyPressAction = (e) => {
    if (e.key === 'Enter') onClickBtnLogin(e)
  };

  return (
    <div className="Login">
      <Snackbar
        open={onNotify}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={appStatus.status} sx={{ width: '100%' }} onClose={() => { setOnNotify(false)}}>
          { appStatus.message }
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
              error={isErrorEmail}
              helperText={isErrorEmail ? "Correo no válido." : ""}
              fullWidth
              onChange={onChangeEmail}
            />
            <Typography variant="subtitle1" color="secondary.subtitle" sx={{ mb: 4, mt: 33 }}>Contraseña</Typography>
            <CustomInput
              id="password"
              aria-label="Contraseña"
              placeholder="Ingresa tu contraseña"
              type="password"
              value={password}
              error={isErrorPassword}
              helperText={isErrorPassword ? "Mínimo 8 caracteres." : ""}
              fullWidth
              onKeyPress={onKeyPressAction}
              onChange={onChangePassword}
            />
            <Box sx={{mt: 150, position: 'relative', textAlign: 'center' }}>
              <LoginButton
                onClick={ onClickBtnLogin }
                disabled={isLoggingIn  || (isErrorEmail || isErrorPassword) || (email.length === 0 || password.length === 0)}
                size="small">
                  Iniciar Sesión
              </LoginButton>
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