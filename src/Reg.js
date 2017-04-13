/**
 * Created by wuping on 2017/4/9.
 */
import React, { Component } from 'react';
import { Input,Button } from 'antd';
import { hashHistory } from 'react-router';
const onClick=()=>{
    hashHistory.push('/login');
};
export default class Reg extends Component {
    render() {
        return (
            <div className="loginContainer">
                <div className="formContainer">
                    <h1>AURORA OA</h1>
                    <Input placeholder="请填写用户名～" className="input"/>
                    <Input placeholder="请填写密码～" className="input"/>
                    <Input placeholder="请再次填写密码～" className="input"/>
                    <Button className="reg">注册</Button>
                    <div className="toLogin" onClick={onClick}>
                        <span>返回登录</span>
                    </div>
                    <span className="copyRight">© 2015-2017 94only Inc. All rights reserved.</span>
                </div>
            </div>
        );
    };
}