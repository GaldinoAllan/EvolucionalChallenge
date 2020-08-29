import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Home from '../pages/Landing';
import Students from '../pages/Students';

export default props =>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/students" component={Students} />
        <Redirect from="*" to="/" />
    </Switch>