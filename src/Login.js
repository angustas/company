import React, { Component } from 'react';
import { Input,Button,message} from 'antd';
import $ from 'jquery';
import PostApi from './post.js';
import { hashHistory } from 'react-router';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {display: "none"};
        this.onSubmit = this.onSubmit.bind(this);
        this.errormessage = this.errormessage.bind(this);
    };
    getInitialState() {
        return {display:"none"};
    };
    componentDidMount(){
        this.setState({
            display:"none"
        });
    };
    errormessage(msg){
        message.error(msg);
    };
    onClick(){
        hashHistory.push('/reg');
    };
    onSubmit(){
        let email=$("#name").val();
        let pwd=$("#pwd").val();
        if(email==""){
            this.errormessage("账号不能为空");
        }else if(pwd==""){
            this.errormessage("密码不能为空");
        }else{
            // asd
        }

    };
    render() {
        return (
            <div className="loginContainer">
                <div className="formContainer">
                    <h1>AURORA OA</h1>
                    <Input placeholder="请填写用户名～" className="input" id="name"/>
                    <Input placeholder="请填写密码～" className="input" id="pwd"/>
                    <Button className="button" onClick={this.onSubmit}>登录</Button>
                <div className="toReg" onClick={this.onClick}>
                    <span>还没有账号？</span>
                </div>
                <span className="copyRight">© 2015-2017 94only Inc. All rights reserved.</span>
                </div>

            </div>
        );
    };
}