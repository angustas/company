/**
 * Created by wuping on 2017/4/9.
 */
import React, { Component } from 'react';
import { Input,Button,message } from 'antd';
import { hashHistory } from 'react-router';
import $ from 'jquery';
require('es6-promise').polyfill();
require('isomorphic-fetch');

export default class Reg extends Component {
    constructor(props) {
        super(props);
        this.state = {display: "none"};
        this.onSubmit = this.onSubmit.bind(this);
        this.successmessage = this.successmessage.bind(this);
        this.errormessage = this.errormessage.bind(this);
        this.backLogin = this.backLogin.bind(this);
    };
    backLogin(){
        hashHistory.push('/login');
    };
    errormessage(msg){
        message.error(msg);
    };
    successmessage(msg){
        message.success(msg);
    };
    searchApi(email,pwd){
        fetch('//localhost/companyBACK/welcome/Reg?email='+email+'&pwd='+pwd,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (list) {
                if(list.status=="OK"){
                    message.success("注册成功～");
                    hashHistory.push('/index');//跳转主页
                }else if(list.status=="error"){
                    message.error("注册失败，请稍后重试～");
                }
            });
    };
    onSubmit(){
        let email=$("#email").val();
        let pwd1=$("#pwd1").val();
        let pwd2=$("#pwd2").val();
        if(email==""){
            this.errormessage("邮箱不能为空～");
            return false;
        }else if(pwd1==""){
            this.errormessage("密码不能为空～");
        }else if(pwd2==""){
            this.errormessage("请确认密码～");
        }else if(pwd1!=pwd2){
            message.error("两次输入的密码不一致，请核对后重新输入～");
            return false;
        }else{
            this.searchApi(email,pwd1);
        }

    }



    render() {
        return (
            <div className="loginContainer">
                <div className="formContainer">
                    <h1>AURORA OA</h1>
                    <Input placeholder="请填写邮箱～" className="input" id="email"/>
                    <Input placeholder="请填写密码～" type="password" className="input" id="pwd1"/>
                    <Input placeholder="请再次填写密码～" type="password" className="input" id="pwd2"/>
                    <Button className="reg" onClick={this.onSubmit}>注册</Button>
                    <div className="toLogin" onClick={this.backLogin}>
                        <span>返回登录</span>
                    </div>
                    <span className="copyRight">© 2015-2017 94only Inc. All rights reserved.</span>
                </div>
            </div>
        );
    };
}