import React, { Component } from 'react';
import Sidebar from './common/sidebar';
import $ from 'jquery';
import { Icon,Card,Input,Button,message,Modal,Table,Tag} from 'antd';
import { hashHistory } from 'react-router';
export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {display: "none",visible: false};
        this.editPassword = this.editPassword.bind(this);
        this.cancelSave = this.cancelSave.bind(this);
        this.savePassword = this.savePassword.bind(this);
        this.toCompanyDetail = this.toCompanyDetail.bind(this);
        this.toAccount = this.toAccount.bind(this);
        this.successmessage = this.successmessage.bind(this);
        this.errormessage = this.errormessage.bind(this);
        this.showModal = this.showModal.bind(this);
        this.submitAccount = this.submitAccount.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.fetchAccount = this.fetchAccount.bind(this);
        this.post = this.post.bind(this);
        this.onDelete = this.onDelete.bind(this);
    };
    componentDidMount(){
        this.fetchAccount();
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
    showModal() {
        this.setState({
            visible: true,
        });
    };
    fetchAccount(){
        let url="//localhost/companyBACK/welcome/GetAccount";
        let user_id=localStorage.getItem("user_id");
        let company_id=localStorage.getItem("company_id");
        this.post(url,"company_id="+company_id,function(list){
            let a=[];
            for(let i=0;i<list.data.length;i++){
                let b={
                    key: list.data[i].user_id,
                    name: list.data[i].name,
                    account: list.data[i].email,
                    password: list.data[i].password,
                    id:list.data[i].user_id
                };
                a.push(b);
            }
            console.log(a);
            this.setState({account:a});
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
    submitAccount () {
        var account=$(".account").val();
        var name=$(".name").val();
        var password=$(".password").val();
        var company_id=localStorage.getItem("company_id");
        if(account==""||name==""||password==""){
            this.errormessage("请正确填写所有内容～");
            return false;
        }else{
            this.setState({
                visible: false,
                show: false
            });
            fetch('//localhost/companyBACK/welcome/JoinCompany?name='+name+'&account='+account+'&password='+password+'&company_id='+company_id,
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
                        message.success("分配用户成功～");

                    }else if(list.status=="error"){
                        message.error("系统繁忙～");
                    }
                }.bind(this));
        }
    };
    handleCancel() {
        this.setState({
            visible: false,
            show: false
        });
    };
    onDelete(e){
        var user_id=$(e.target).data("id");
        let url="//localhost/companyBACK/welcome/DeleteAccount";
        // let company_id=localStorage.getItem("company_id");
        this.post(url,"user_id="+user_id,function(list){
           if(list.status=="OK"){
              message.success("注销成功～");
              this.fetchAccount();
           }
        }.bind(this));
        console.log(user_id);
    };
    editPassword(){
        this.successmessage("修改成功～");
    };
    savePassword(){
        this.successmessage("保存成功～");
    };
    cancelSave(){
        this.successmessage("保存成功～");
    };
    render() {
        const data = [
            {value: 1, name: "是"},
            {value: 2, name: "否"}
        ];
        const dataSource = this.state.account;

        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="javascript:void(0);">{text}</a>,
        }, {
            title: '账号',
            dataIndex: 'account',
            key: 'account',
        }, {
            title: '密码',
            dataIndex: 'password',
            key: 'password',
        }, {
            title: '操作',
            dataIndex:"id",
            key: 'id',
            render: text => (
                <span>
                  <span className="ant-divider" />
                  <a  href="javascript:void(0);" data-id={text} onClick={this.onDelete}>注销</a>
                  <span className="ant-divider" />
                </span>
            ),
        }];
        if(localStorage.getItem("is_admin")=="true"){
            var list= <li className="" onClick={this.toAccount}>分配账号</li>
        }else{
            var list="";
        }
        return (
            <div className="missionContainer">
                <Sidebar target="setting"/>
                <nav className="missionBoard">
                    <h2><Icon type="safety" /> &nbsp;分配账号</h2>
                    <ul className="navUl">
                        <li className="" onClick={this.toSetting}>账户资料</li>
                        <li className="" onClick={this.toSecurity}>安全</li>
                        <li className="" onClick={this.toCompanyDetail}>公司信息</li>
                        <li className="selected" onClick={this.toAccount}>分配账号</li>
                    </ul>
                    <ul className="newMission">
                        <li>
                            <Button type="default" icon="plus" onClick={this.showModal} >分配账号</Button>
                        </li>
                    </ul>
                </nav>
                <div className="missionList">
                    <Table dataSource={dataSource} columns={columns} />

                    <Modal title="分配账号" visible={this.state.visible}
                           onOk={this.submitAccount} onCancel={this.handleCancel}
                           okText="确认" cancelText="取消"
                    >
                        <Card>
                            账号：<Input placeholder="输入账号" className="account" />
                            <br/>
                            姓名：<Input placeholder="输入姓名" className="name" />
                            <br/>
                            密码：<Input placeholder="输入密码" className="password" />
                        </Card>
                    </Modal>
                </div>
            </div>
        );
    };
}