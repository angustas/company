import React, { Component } from 'react';
import Sidebar from './common/sidebar';
import $ from 'jquery';
import { Icon,message,Menu, Tree, Button,Modal,Form, Input, Card,Select ,Collapse,Switch,Tooltip,Tag,Badge} from 'antd';
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/bar');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
import { hashHistory } from 'react-router';
const TreeNode = Tree.TreeNode;
var teamList=[],divArr=[];
export default class Team extends Component {
    constructor(props) {
        super(props);
        this.state = {show: false,visible: false,teamName:"",team_id:"",user_id:"",data:""};
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.createInvitationCode = this.createInvitationCode.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.searchTeam = this.searchTeam.bind(this);
        this.searchApi = this.searchApi.bind(this);
        this.searchInvitationCode = this.searchInvitationCode.bind(this);
        this.joinTeam = this.joinTeam.bind(this);
        this.autoSearchTeamList = this.autoSearchTeamList.bind(this);
        // this.renderTeam = this.renderTeam.bind(this);
        this.autoSearchTeamList();
    };
    toDaily(){
        hashHistory.push('/daily');
    };
    toDynamicState(){
        hashHistory.push('/dynamicState');
    };
    toWorkBoard(){
        hashHistory.push('/index');
    };
    toTeam(){
        hashHistory.push('/team');
    };
    showModal() {
        this.setState({
            visible: true,
        });
    };
    errormessage(msg){
        message.error(msg);
    };
    successmessage(msg){
        message.success(msg);
    };
    handleOk () {
        let teamName=$(".teamName").val();
        let InvitationCode=$(".InvitationCode").val();
        if(InvitationCode==""){
            this.errormessage("邀请码不能为空～");
        }else if(teamName==""){
            this.errormessage("团队名称不能为空～");
        }else{
            this.searchApi(teamName,InvitationCode);
        }
        this.setState({
            visible: false,
            show: false
        });
    };
    handleCancel() {
        this.setState({
            visible: false,
            show: false
        });
    };
    createInvitationCode(){
        var s = [],a=6,b=10;
        var chars = "123456789QWERTYUIPASDFGHJKLZXCVBNM";
        for (var i = 0; i < a; i++) {
            s[i] = chars.substr(Math.floor(Math.random() * 0xb), 1);
        }
        var uuid = s.join("");
        $(".InvitationCode").val(uuid);
        console.log(uuid);
    };
    onSelect(selectedKeys, info){
        console.log('selected', selectedKeys, info);
    };
    searchTeam(){
        let InvitationCode=$(".invitationCodeInput").val();
        let user_id=localStorage.getItem("user_id");
        if(InvitationCode==""){
            this.errormessage("请正确输入邀请码～");
        }else{
            this.searchInvitationCode(InvitationCode,user_id);
        }
    };
    joinTeam(){//加入团队，判断是否已经是该团队成员
        this.setState({
            show: false
        });
        let user_id=localStorage.getItem("user_id");
        let team_id=this.state.team_id;
        fetch('//localhost/companyBACK/welcome/JoinTeam?user_id='+user_id+'&team_id='+team_id,
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
                    message.success("加入团队成功～");
                    //待写功能

                }else if(list.status=="error"){
                    if(list.data.message=="您已经是该团队成员了"){
                        message.error("您已经是该团队成员了，请勿重复添加～");
                    }else{
                        message.error("加入团队失败，请稍后重试～");
                    }
                }
            });
    };
    autoSearchTeamList(){//一开始自动加载我的团队列表以及团队成员
        let user_id=localStorage.getItem("user_id");
        fetch('//localhost/companyBACK/welcome/AutoSearchTeamList?user_id='+user_id,
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
                    var lis = list.data.map(function (m) {
                        var w = [],e=6,b=10;
                        var chars = "QWERTYUIPASDFGHJKLZXCVBNM123456789";
                        for (var i = 0; i < e; i++) {
                            w[i] = chars.substr(Math.floor(Math.random() * 0xb), 1);
                        }
                        var key = w.join("");
                        return <div key={key}>
                            <Card>
                                <div className="contactMen">{m.user_info[0].name}</div>
                                <p className="contactDetail">部门：{m.teamName.team_name}</p>
                                <span className="jobType">{m.user_info[0].user_job}</span>
                                <span className="tel">手机号：{m.user_info[0].user_tel}</span>
                            </Card>
                        </div>
                    });
                    this.setState({data:lis});

                }else if(list.status=="error"){
                    message.error("系统繁忙～");
                }
            }.bind(this));
    };


    searchApi(teamName,InvitationCode){//创建团队
        fetch('//localhost/companyBACK/welcome/CreateTeam?teamName='+teamName+'&InvitationCode='+InvitationCode,
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
                    message.success("创建成功～");
                    //待写功能

                }else if(list.status=="error"){
                    message.error("创建失败，请稍后重试～");
                }
            });
    };
    searchInvitationCode(InvitationCode,user_id){//查找团队
        fetch('//localhost/companyBACK/welcome/searchTeam?InvitationCode='+InvitationCode+'&user_id='+user_id,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(function(response) {
                if (response.status >= 400) {
                    message.error("系统繁忙，请稍后重试～");
                }
                return response.json();
            })
            .then(function (list) {
                if(list.status=="OK"){

                    message.success("成功匹配团队～");
                    this.setState({
                        show: true,
                        teamName:list.data.team_name,
                        team_id:list.data.team_id,
                        user_id:localStorage.getItem("user_id")
                    });
                }else if(list.status=="error"){
                    message.error("暂未匹配到相应团队,请核对之后再试～");
                }
            }.bind(this));
    };



    render() {
        var data=this.state.data;
        // console.log(datas);

        const FormItem = Form.Item;
        const team=(
            <div className="cardContainer">
                <Card>
                    <div className="contactMen">angus</div>
                    <p className="contactDetail">部门：技术研发部</p>
                    <span className="jobType">前端工程师</span>
                    <span className="tel">手机号：18945073710</span>
                </Card>
                <Card>
                    <div className="contactMen">吴平</div>
                    <p className="contactDetail">部门：技术研发部</p>
                    <span className="jobType">前端工程师</span>
                    <span className="tel">手机号：18945073710</span>
                </Card>
                <Card>
                    <div className="contactMen">张三</div>
                    <p className="contactDetail">部门：技术研发部</p>
                    <span className="jobType">PHP工程师</span>
                    <span className="tel">手机号：189****3710</span>
                </Card>
            </div>

    );
        return (
            <div className="missionContainer">
                <Sidebar target="index"/>
                <nav className="missionBoard">
                    <h2><Icon type="team" /> &nbsp;团队</h2>
                    <ul className="navUl">
                        <li className="" onClick={this.toWorkBoard}>任务</li>
                        <li className="" onClick={this.toDaily}>日历</li>
                        <li className="" onClick={this.toDynamicState}>动态</li>
                        <li className="selected" onClick={this.toTeam}>团队</li>
                    </ul>
                    <ul className="newMission">
                        <li>
                            <Button type="default" icon="plus" onClick={this.showModal} >新建团队</Button>
                        </li>
                    </ul>
                </nav>
                <div className="missionList">
                    <div className="teamListContainer">
                        <Input placeholder="输入邀请码" className="invitationCodeInput"/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button type="default" icon="search" onClick={this.searchTeam} >匹配团队</Button>
                        <h5>我的团队</h5>
                        <div key="asd" className="cardContainer" id="haha">{this.state.data}</div>
                    </div>
                </div>
                <Modal title="新建团队" visible={this.state.visible}
                       onOk={this.handleOk} onCancel={this.handleCancel}
                       okText="保存" cancelText="取消"
                >
                    <Form layout="vertical">
                        <FormItem label="团队名称">
                            <Input className="teamName"/>
                        </FormItem>
                        <FormItem label="生成邀请码">
                            <Input className="InvitationCode" placeholder="生成邀请码" style={{width:340}}/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button type="primary" onClick={this.createInvitationCode} >生成邀请码</Button>
                        </FormItem>
                    </Form>
                </Modal>

                <Modal title="我的团队" visible={this.state.show}
                       onOk={this.joinTeam} onCancel={this.handleCancel}
                       okText="加入团队" cancelText="取消"
                >
                    <Form layout="vertical">
                        <FormItem label="团队名称">
                            <h3>{this.state.teamName}</h3>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    };
}