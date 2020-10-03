import React from 'react';
import SignUp from './Components/Signup/Signup';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import DashBoard from './Components/Dashboard/Dashboard';
import AuthContextProvider from './contexts/AuthContext';

function App() {

  return (
    <BrowserRouter>

      <Switch>
        <AuthContextProvider>
          <Route path="/" component={SignUp} exact />
          <Route path="/dashboard" component={DashBoard} />
        </AuthContextProvider>
      </Switch>

    </BrowserRouter>

  )
}
export default App;
