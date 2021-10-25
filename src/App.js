import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { GuardProvider, GuardedRoute } from 'react-router-guards';

import { ThemeProvider } from '@mui/material/styles';
import Login from "./views/Login";
import UserChat from "./views/UserChat";
import Theme from "./utils/Theme";
import { checkAuth } from './services/Service'

import './css/app.css';

function App() {
  const check = async (to, from, next) => {
    try {
      console.log('to.meta.route', to.meta.route)
      const response = await checkAuth();
      if (to.meta.route === 'login') next.redirect(`/user?id=${response.id}`);
      else next();
      //setIsAuthorized(true);
    } catch(err) {
      console.log('error auth', err)
      next.redirect('/');
      //setIsAuthorized(false);
    } finally {}
  }

  return (
    <Router>
      <GuardProvider guards={[check]}>
        <div className="App">
          <ThemeProvider theme={Theme}>
            <Switch>
              <GuardedRoute path="/" exact component={Login} meta={{ auth: true, route: 'login' }} />
              <GuardedRoute path="/user" exact component={UserChat} meta={{ auth: true, route: 'user' }} />
            </Switch>
          </ThemeProvider>
        </div>
      </GuardProvider>
    </Router>
  );
}

export default App;
