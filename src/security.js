import React, { Component } from 'react';
import Sidebar from './common/sidebar';
import $ from 'jquery';
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/bar');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
import { Icon,Card,Input,Button,message} from 'antd';
import { hashHistory } from 'react-router';
export default class Security extends Component {
    constructor(props) {
        super(props);
        this.state = {display: "none",visible: false};
        this.editPassword = this.editPassword.bind(this);
        this.cancelSave = this.cancelSave.bind(this);
        this.savePassword = this.savePassword.bind(this);
        this.toCompanyDetail = this.toCompanyDetail.bind(this);
        this.toAccount = this.toAccount.bind(this);
        this.post = this.post.bind(this);
    };
    post(url,res,callback){//公用API
        this.setState({loading:true});
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: res
        })
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (list) {
                if(list.status=="OK"){
                    setTimeout(function(){
                        this.setState({loading:false});
                        callback(list);
                    }.bind(this),1000);
                }else if(list.status=="error"){
                    message.error("系统繁忙～");
                }
            }.bind(this));
    };
    toSecurity(){
        hashHistory.push('/security');
    };
    toSetting(){
        hashHistory.push('/setting');
    };
    toCompanyDetail(){
        hashHistory.push('/companySetting');
    }
    toAccount(){
        hashHistory.push('/account');
    };
    errormessage(msg){
        message.error(msg);
    };
    successmessage(msg){
        message.success(msg);
    };
    editPassword(){
        $(".materialShow").hide();
        $(".material").show();
        // this.successmessage("修改成功～");
    };
    savePassword(e){
        let oldpwd=$(".oldpwd").val();
        let pwd1=$(".pwd1").val();
        let pwd2=$(".pwd2").val();
        let OldPwd=localStorage.getItem("oldPwd");
        if(pwd1.length<6){
            message.warning("密码长度不能低于6位～");
            return false;
        }else if(pwd1.length>12){
            message.warning("密码长度不能多余12位～");
            return false;
        }else if(oldpwd!=OldPwd){
            message.warning("旧密码输入错误～");
            return false;
        }else if(pwd1!=pwd2){
            message.warning("两次密码输入不一致～");
            return false;
        }else{
            let user_id=localStorage.getItem("user_id");
            let url="//localhost/companyBACK/welcome/updatePwdById";
            this.post(url,"user_id="+user_id+"&pwd="+pwd1,function(list){
                if(list.status=="OK"){
                    message.success("修改成功～");
                    localStorage.setItem("oldPwd",list.data.password);
                    $("input").value("");
                }else{
                    message.warning("系统异常，请稍后重试～");
                }
            }.bind(this));
        }

        $(".materialShow").show();
        $(".material").hide();
        // this.successmessage("保存成功～");
    };
    cancelSave(){
        $(".materialShow").show();
        $(".material").hide();
    };

    render() {
        const data = [
            {value: 1, name: "是"},
            {value: 2, name: "否"}
        ];
        if(localStorage.getItem("is_admin")=="true"){
            var list= <li className="" onClick={this.toAccount}>分配账号</li>
        }else{
            var list="";
        }
        return (
            <div className="missionContainer">
                <Sidebar target="setting"/>
                <nav className="missionBoard">
                    <h2><Icon type="safety" /> &nbsp;安全</h2>
                    <ul className="navUl">
                        <li className="" onClick={this.toSetting}>账户资料</li>
                        <li className="selected" onClick={this.toSecurity}>安全</li>
                        <li className="" onClick={this.toCompanyDetail}>公司信息</li>
                        {list}
                    </ul>
                </nav>
                <div className="missionList">
                    <Card style={{height:550}}>
                        <div className="materialBox">
                            <div className="materialName">{localStorage.getItem("name")}</div>
                            <div className="materialShow" style={{display:"block"}}>
                                <p>修改密码有助于您的账户安全；新密码长度要大于 6位小于12位，建议您定期更换密码，确保帐号安全。</p>
                                <Button type="default" onClick={this.editPassword} >修改密码</Button>
                            </div>
                            <div className="material" style={{display:"none"}}>
                                旧密码：<Input className="oldpwd" placeholder="请输入旧密码" type="password"/><br/><br/>
                                密码：<Input className="pwd1" placeholder="请输入密码" type="password"/><br/><br/>
                                确认密码：<Input className="pwd2" placeholder="请确认输入密码" type="password"/><br/><br/>
                                <Button type="default" onClick={this.savePassword} >保存</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button type="default" onClick={this.cancelSave} >取消</Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    };
}