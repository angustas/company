import React from 'react';
import { render } from 'react-dom';
import App from './App.js';
import WorkBoard from './WorkBoard.js';
import Login from './Login.js';
import Reg from './Reg.js';
import { Router,Route, hashHistory} from 'react-router';
render((
    <Router history={hashHistory}>
        <Route path="/" component={WorkBoard}/>
        <Route path="/index" component={WorkBoard}/>
        <Route path="/introduce" component={App}/>
        <Route path="/login" component={Login}/>
        <Route path="/reg" component={Reg}/>
    </Router>
),document.getElementById('app')); 