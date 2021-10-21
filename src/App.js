import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Login from "./views/Login";
import Theme from "./utils/Theme";

import './css/app.css';

function App() {
  return (
    <Router>
      <div className="App">
        <ThemeProvider theme={Theme}>
          <Switch>
            <Route path="/" exact>
              <Login />
            </Route>
            <Route path="/user/:userId">
              <User />
            </Route>
          </Switch>
        </ThemeProvider>
      </div>
    </Router>
  );
}

function User() {
  return <Button variant="contained">User World</Button>;
}

export default App;
