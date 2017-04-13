import React from 'react';
import { render } from 'react-dom';
import App from './App.js';
import PostApi from './post.js';
import Login from './Login.js';
import Reg from './Reg.js';
import { Router,Route, hashHistory} from 'react-router';
render((
    <Router history={hashHistory}>
        <Route path="/" component={App}/>
        <Route path="/index" component={App}/>
        <Route path="/login" component={Login}/>
        <Route path="/reg" component={Reg}/>
    </Router>
),document.getElementById('app')); 