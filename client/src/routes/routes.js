import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Alert from '../components/layout/alert';
import Backlog from '../components/backlog';
import Login from '../components/auth/login';
import NotFound from '../components/layout/not-found';
import PrivateRoute from './private-routes';

const Routes = (props) => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/backlog' component={Backlog} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
