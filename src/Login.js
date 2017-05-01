import React, { Component } from 'react';
import { Input,Button,message} from 'antd';
import $ from 'jquery';
require('es6-promise').polyfill();
require('isomorphic-fetch');
import { hashHistory } from 'react-router';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {display: "none"};
        this.onSubmit = this.onSubmit.bind(this);
        this.successmessage = this.successmessage.bind(this);
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
    successmessage(msg){
        message.success(msg);
    };
    onClick(){
        hashHistory.push('/reg');
    };
    searchApi(email,pwd){
        fetch('//localhost/companyBACK/welcome/checkLogin?email='+email+'&pwd='+pwd,
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
                    message.success("登录成功～");
                    localStorage.setItem("name",list.data.user_info.name);
                    localStorage.setItem("user_id",list.data.user_info.user_id);
                    localStorage.setItem("is_admin",list.data.user_info.is_admin);
                    localStorage.setItem("company_id",list.data.company_info.company_id);
                    console.log("姓名："+localStorage.getItem("name"));
                    hashHistory.push('/index');//跳转主页
                }else if(list.status=="error"){
                    message.error("您输入的账号或者密码错误，请重新输入～");
                }
        });
    };
    onSubmit(){
        let email=$("#name").val();
        let pwd=$("#pwd").val();
        if(email==""){
            this.errormessage("账号不能为空");
            return false;
        }else if(pwd==""){
            this.errormessage("密码不能为空");
            return false;
        }else{
            this.searchApi(email,pwd);
        }

    }
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