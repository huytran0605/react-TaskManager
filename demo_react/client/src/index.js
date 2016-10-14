import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route,  browserHistory, IndexRoute, Redirect } from 'react-router'

import App from './App';
import './index.css';
import NewTask from './NewTask';
import Home from './Home';
import List from './List';
import NotFoundView from './NotFoundView'
ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="list" component={List} />
            <Route path="new" component={NewTask} />
        </Route>
        <Route path='/404' component={NotFoundView} />
            <Redirect from='*' to='/404' />
    </Router >,
    document.getElementById('root')
);
