import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import AdminRoutes from './AdminRoutes';

import { Home, Login, Admin, UserCrud } from '../components/screens';

export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <AdminRoutes exact path='/admin' component={Admin} />
        <AdminRoutes path='/admin/users' component={UserCrud} />
        <Redirect from='*' to='/' />
    </Switch>