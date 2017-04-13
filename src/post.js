/**
 * Created by wuping on 2017/4/9.
 */
import React, { Component } from 'react';
import { message } from 'antd';
export default class PostApi extends Component {
    constructor(props) {
        super(props);
        this.onSuccess= this.onSuccess.bind(this);
        this.errormessage = this.errormessage.bind(this);
    };
    getInitialState() {
        return {display:"none"};
    };
    PostApi(){
        console.log();
    };
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