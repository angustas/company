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
import Setting from './setting.js';
import MailList from './mailList.js';
import Table from './table.js';
import Statistics from './statistics.js';
import Security from './security.js';
import Team from './team.js';
import CompanySetting from './companySetting.js';
import Account from './account.js';
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
        <Route path="/setting" component={Setting}/>
        <Route path="/mailList" component={MailList}/>
        <Route path="/table" component={Table}/>
        <Route path="/statistics" component={Statistics}/>
        <Route path="/security" component={Security}/>
        <Route path="/team" component={Team}/>
        <Route path="/companySetting" component={CompanySetting}/>
        <Route path="/account" component={Account}/>
    </Router>
),document.getElementById('app')); 