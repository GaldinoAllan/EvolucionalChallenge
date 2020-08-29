import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Home from '../pages/Landing';
import Students from '../pages/Students';
import Teachers from '../pages/Teachers';

export default props =>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/students" component={Students} />
        <Route path="/teachers" component={Teachers} />
        <Redirect from="*" to="/" />
    </Switch>