import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Alert from '../components/layout/alert';
import Backlog from '../components/backlog';
import Login from '../components/auth/login';
import AdminDashboard from '../components/admin-dashboard';
import UserDashboard from '../components/user-dashboard';
import TicketInfo from '../components/ticket-info';
import NotFound from '../components/layout/not-found';
import PrivateRoute from './private-routes';
import PrivateAdminRoute from './private-admin-routes';

const Routes = (props) => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/backlog' component={Backlog} />
        <PrivateAdminRoute exact path='/admin' component={AdminDashboard} />
        <PrivateAdminRoute
          exact
          path='/ticket-info/:id'
          component={TicketInfo}
        />
        <PrivateRoute exact path='/user' component={UserDashboard} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
