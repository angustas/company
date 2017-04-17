import React, { Component } from 'react';
import { message } from 'antd';
import { hashHistory } from 'react-router';
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {display: "none"};
        this.successmessage = this.successmessage.bind(this);
        this.errormessage = this.errormessage.bind(this);
    };
    errormessage(msg){
        message.error(msg);
    };
    successmessage(msg){
        message.success(msg);
    };
    toLogin(){
        hashHistory.push('/login');
    };
    toReg(){
        hashHistory.push('/reg');
    };

    render() {
    return (
    <div className="bodyContainer">
        <nav>
            <div className="logo"><a href="localhost:3000/#/index">AURORA OA</a></div>
            <ul className="navUl">
                <li className="selected">首页</li>
                <li className="">关于产品</li>
                <li className="">服务</li>
                <li className="">联系</li>
            </ul>
            <ul className="loginNav">
                <li className="navList" onClick={this.toLogin}>登录</li>
                <li className="navList" onClick={this.toReg}>注册</li>
            </ul>
        </nav>
    </div>
    );
  };
}