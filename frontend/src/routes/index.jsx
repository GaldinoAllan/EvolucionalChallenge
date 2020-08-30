import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Home from '../pages/Landing';
import Students from '../pages/Students';
import Teachers from '../pages/Teachers';
import StudentsDegree from '../pages/StudentsDegree';

export default props =>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/students" component={Students} />
        <Route exact path="/teachers" component={Teachers} />
        <Route
            exact
            path="/students-by-degree/:id"
            component={StudentsDegree}
        />
        <Redirect from="*" to="/" />
    </Switch>