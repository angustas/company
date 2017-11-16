import React, { Component } from 'react';
import Sidebar from './common/sidebar';
import $ from 'jquery';
import { Icon,Card,Input,Button,message} from 'antd';
import { hashHistory } from 'react-router';
export default class CompanySetting extends Component {
    constructor(props) {
        super(props);
        this.state = {display: "none",visible: false,condation:"hidden"};
        this.onPanelChange = this.onPanelChange.bind(this);
        this.cancelSave = this.cancelSave.bind(this);
        this.editMaterial = this.editMaterial.bind(this);
        this.saveMaterial = this.saveMaterial.bind(this);
        this.toCompanyDetail = this.toCompanyDetail.bind(this);
        this.toAccount = this.toAccount.bind(this);
        this.post = this.post.bind(this);
        this.getCompanyMessage = this.getCompanyMessage.bind(this);
    };
    componentDidMount(){
        this.getCompanyMessage();
    }
    getCompanyMessage(e){

        let company_id=localStorage.getItem("company_id");
        let url="//localhost/companyBACK/welcome/GetCompanyMessageById";
        this.post(url,"company_id="+company_id,function(list){
            if(list.status=="OK"){
                console.log(list.data);
                $(".myCompanyName").text(list.data.company_name);
                $(".companyMessage").text(list.data.company_detail);
                $(".companyAddress").text(list.data.company_address);
                $(".companyTel").text(list.data.company_tel);

                $(".companyName").val(list.data.company_name);
                $(".companyDetail").val(list.data.company_detail);
                $(".company_address").val(list.data.company_address);
                $(".company_tel").val(list.data.company_tel);
            }else{
                message.warning("系统异常，请稍后重试～");
            }
        }.bind(this));
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
    $(".materialShow").hide();
    $(".material").show();
    };


    saveMaterial(){//点击保存 标记
        let companyName=$(".companyName").val();
        let companyDetail=$(".companyDetail").val();
        let company_address=$(".company_address").val();
        let company_tel=$(".company_tel").val();
        let company_id=localStorage.getItem("company_id");
        let url="//localhost/companyBACK/welcome/saveCompanyMessageById";
        this.post(url,"company_id="+company_id+"&company_name="+companyName+"&company_detail="+companyDetail+"&company_address="+company_address+"&company_tel="+company_tel,function(list){
            if(list.status=="OK"){
                console.log(list.data);

                $(".myCompanyName").text(list.data.company_name);
                $(".companyMessage").text(list.data.company_detail);
                $(".companyAddress").text(list.data.company_address);
                $(".companyTel").text(list.data.company_tel);

                $(".companyName").val(list.data.company_name);
                $(".companyDetail").val(list.data.company_detail);
                $(".company_address").val(list.data.company_address);
                $(".company_tel").val(list.data.company_tel);

                $(".materialShow").show();
                $(".material").hide();
                this.successmessage("修改成功～");
            }else{
                message.warning("系统异常，请稍后重试～");
            }
        }.bind(this));
    };


    cancelSave(){
        $(".materialShow").show();
        $(".material").hide();
    };

    render() {
        if(localStorage.getItem("is_admin")=="true"){
            var list= <li className="" onClick={this.toAccount}>分配账号</li>;
            var button=<Button type="default" onClick={this.editMaterial}>编辑资料</Button>;
        }else{
            var list="";
            var button="";
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
                            <div className="myCompanyName">94only</div>
                            <div className="materialShow newShow" style={{display:"block"}}>
                                <p className="contactDetail companyMessage">信息：94only是一家新兴的科技有限公司，致力于企业办公系统,打造快速便捷的开发流程，给众多企业一个更好更便捷的办公选择。公司成立于2016年，
                                经过一年多的发展，现在已经初具规模，产品的占有率在市场上已经较大，用户反馈也很喜人，发展势头正猛。</p>
                                <span className="companyAddress">公司地址：北京市昌平区上东数字山路数字山谷*B区1号楼</span><br/>
                                <span className="companyTel">公司电话：010-86609110</span><br/>
                                {button}
                            </div>
                            <div className="material companyDetailBox" style={{display:"none"}}>
                                公司名称：<Input className="companyName" placeholder="请输入公司名称" /><br/><br/>
                                介绍：<textarea className="companyDetail" placeholder="请输入公司介绍" /><br/><br/>
                                地址：<Input className="company_address" placeholder="请输入公司地址" /><br/><br/>
                                电话：<Input className="company_tel" placeholder="请输入公司电话" /><br/><br/><br/>
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