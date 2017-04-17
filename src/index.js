import React from 'react';
import { render } from 'react-dom';
import App from './App.js';
import WorkBoard from './WorkBoard.js';
import Login from './Login.js';
import Reg from './Reg.js';
import Daily from './daily.js';
import DynamicState from './dynamicState.js';
import Search from './search.js';
import Message from './message.js';
import Project from './project.js';
import Setting from './setting.js';
import { Router,Route, hashHistory} from 'react-router';
render((
    <Router history={hashHistory}>
        <Route path="/" component={WorkBoard}/>
        <Route path="/index" component={WorkBoard}/>
        <Route path="/introduce" component={App}/>
        <Route path="/login" component={Login}/>
        <Route path="/reg" component={Reg}/>
        <Route path="/daily" component={Daily}/>
        <Route path="/dynamicState" component={DynamicState}/>
        <Route path="/search" component={Search}/>
        <Route path="/message" component={Message}/>
        <Route path="/project" component={Project}/>
        <Route path="/setting" component={Setting}/>
    </Router>
),document.getElementById('app')); 