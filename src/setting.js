import React, { Component } from 'react';
import Sidebar from './common/sidebar';
import $ from 'jquery';
import { Icon,Card,Input,Button,message} from 'antd';
import { hashHistory } from 'react-router';
export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {display: "none",visible: false};
        this.onPanelChange = this.onPanelChange.bind(this);
        this.cancelSave = this.cancelSave.bind(this);
        this.editMaterial = this.editMaterial.bind(this);
        this.saveMaterial = this.saveMaterial.bind(this);
        this.toCompanyDetail = this.toCompanyDetail.bind(this);
        this.toAccount = this.toAccount.bind(this);
        this.post = this.post.bind(this);
        this.userInfo = this.userInfo.bind(this);
    };
    componentDidMount(){
        this.userInfo();
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
    saveMaterial(){
        $(".materialShow").show();
        $(".material").hide();
        let name=$(".userNameInput").val();
        let department=$(".departmentInput").val();
        let job=$(".jobInput").val();
        let tel=$(".telInput").val();
        let url="//localhost/companyBACK/welcome/UpdateUserInfo";
        let user_id=localStorage.getItem("user_id");
        this.post(url,"user_id="+user_id+"&name="+name+"&department="+department+"&job="+job+"&tel="+tel,function(list){
            if(list.status=="OK"){
                this.successmessage("保存成功～");
                $(".userNameInput").val(list.data.name);
                $(".departmentInput").val(list.data.user_department);
                $(".jobInput").val(list.data.user_job);
                $(".telInput").val(list.data.user_tel);
                $(".userName").text(list.data.name);
                $(".department").text(list.data.user_department);
                $(".job").text(list.data.user_job);
                $(".tel").text(list.data.user_tel);
            }
        }.bind(this));
    };
    cancelSave(){
        $(".materialShow").show();
        $(".material").hide();
    };
    userInfo(){
        let url="//localhost/companyBACK/welcome/GetUserInfo";
        let user_id=localStorage.getItem("user_id");
        this.post(url,"user_id="+user_id,function(list){
            if(list.status=="OK"){
                console.log(list.data);
                $(".userNameInput").val(list.data.name);
                $(".departmentInput").val(list.data.user_department);
                $(".jobInput").val(list.data.user_job);
                $(".telInput").val(list.data.user_tel);
                $(".userName").text(list.data.name);
                $(".department").text(list.data.user_department);
                $(".job").text(list.data.user_job);
                $(".tel").text(list.data.user_tel);
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
                    this.setState({loading:false});
                    callback(list);
                }else if(list.status=="error"){
                    message.error("系统繁忙～");
                }
            }.bind(this));
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
                    <h2><Icon type="setting" />&nbsp;设置</h2>
                    <ul className="navUl">
                        <li className="selected" onClick={this.toSetting}>账户资料</li>
                        <li className="" onClick={this.toSecurity}>安全</li>
                        <li className="" onClick={this.toCompanyDetail}>公司信息</li>
                        {list}
                    </ul>

                </nav>
                <div className="missionList">
                    <Card style={{height:550}}>
                        <div className="materialBox">
                            <div className="materialName userName">吴平</div>
                            <div className="materialShow" style={{display:"block"}}>
                                <p className="userName">姓名：吴平</p>
                                <p className="department">部门：技术研发部</p>
                                <span className="job">职位：前端工程师</span><br/>
                                <span className="tel">手机号：18945073710</span><br/>
                                <Button type="default" onClick={this.editMaterial} >编辑资料</Button>
                            </div>
                            <div className="material" style={{display:"none"}}>
                                姓名：<Input className="userNameInput" placeholder="请输入姓名" /><br/><br/>
                                部门：<Input className="departmentInput" placeholder="请输入部门" /><br/><br/>
                                职位：<Input className="jobInput" placeholder="请输入职位" /><br/><br/>
                                手机号：<Input className="telInput" placeholder="请输入手机号" /><br/><br/><br/>
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