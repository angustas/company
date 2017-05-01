import React, { Component } from 'react';
import Sidebar from './common/sidebar';
import $ from 'jquery';
import { Icon,Card,Input,Button,message} from 'antd';
import { hashHistory } from 'react-router';
export default class CompanySetting extends Component {
    constructor(props) {
        super(props);
        this.state = {display: "none",visible: false};
        this.onPanelChange = this.onPanelChange.bind(this);
        this.cancelSave = this.cancelSave.bind(this);
        this.editMaterial = this.editMaterial.bind(this);
        this.saveMaterial = this.saveMaterial.bind(this);
        this.toCompanyDetail = this.toCompanyDetail.bind(this);
        this.toAccount = this.toAccount.bind(this);
    };
    toSecurity(){
        hashHistory.push('/security');
    };
    toSetting(){
        hashHistory.push('/setting');
    };
    toCompanyDetail() {
        hashHistory.push('/companySetting');
    }
    toAccount(){
        hashHistory.push('/account');
    };
    onPanelChange(value, mode) {
        console.log(value, mode);
    };
    errormessage(msg){
        message.error(msg);
    };
    successmessage(msg){
        message.success(msg);
    };
    editMaterial(){

    };
    saveMaterial(){
        this.successmessage("保存成功～");
    };
    cancelSave(){
        this.successmessage("保存成功～");
    };

    render() {
        if(localStorage.getItem("is_admin")=="true"){
            var list= <li className="" onClick={this.toAccount}>分配账号</li>
        }else{
            var list="";
        }
        return (
            <div className="missionContainer">
                <Sidebar target="setting"/>
                <nav className="missionBoard">
                    <h2><Icon type="setting" />&nbsp;公司信息</h2>
                    <ul className="navUl">
                        <li className="" onClick={this.toSetting}>账户资料</li>
                        <li className="" onClick={this.toSecurity}>安全</li>
                        <li className="selected" onClick={this.toCompanyDetail}>公司信息</li>
                        {list}
                    </ul>

                </nav>
                <div className="missionList">
                    <Card style={{height:550}}>
                        <div className="materialBox">
                            <div className="myCompanyName">吴平</div>
                            <div className="materialShow" style={{display:"block"}}>
                                <p className="contactDetail">姓名：吴平</p>
                                <p className="contactDetail">部门：技术研发部</p>
                                <span className="jobType">职位：前端工程师</span><br/>
                                <span className="tel">手机号：18945073710</span><br/>
                                <Button type="default" onClick={this.editMaterial} >编辑资料</Button>
                            </div>
                            <div className="material" style={{display:"none"}}>
                                姓名：<Input className="contactDetail" placeholder="请输入姓名" value="吴平"/><br/><br/>
                                部门：<Input className="contactDetail" placeholder="请输入部门" value="技术研发部"/><br/><br/>
                                职位：<Input className="jobType" placeholder="请输入职位" value="前端工程师"/><br/><br/>
                                手机号：<Input className="tel" placeholder="请输入手机号" value="189345073710"/><br/><br/><br/>
                                <Button type="default" onClick={this.saveMaterial} >保存</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button type="default" onClick={this.cancelSave} >取消</Button>
                            </div>
                        </div>
                    </Card>
                </div>


            </div>
        );
    };
}