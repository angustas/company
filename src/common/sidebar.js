import React, { Component } from 'react';
import $ from 'jquery';
import { Icon,Popover,message} from 'antd';
import { hashHistory } from 'react-router';
export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        // tag = this.props.target;
        this.state = {display: "none",visible: false};
        this.toJump = this.toJump.bind(this);
        this.changeSideBar = this.changeSideBar.bind(this);
        this.checkHasLogin = this.checkHasLogin.bind(this);
        this.checkHasLogin();
    };
    componentDidMount(){
        this.changeSideBar(this.props.target);
    }
    checkHasLogin(){
        if(!localStorage.getItem("name")){
            this.warnmessage("您还没有登录，请先登录～");
            hashHistory.push('/login');
        }
    };

    warnmessage(msg){
        message.warning(msg);
    };
    changeSideBar(tag){
        switch (tag){
            case "search":
                $(".searchMenu").addClass("selected");
                break;
            case "index":
                $(".aboutMenu").addClass("selected");
                break;
            case "statistics":
                $(".statisticsMenu").addClass("selected");
                break;
            case "message":
                $(".messageMenu").addClass("selected");
                break;
        }
    };
    toJump(e){
        let target=$(e.target).data("target");
        this.setState({visible:true});
            switch (target){
            case "search":
                hashHistory.push('/search');
                break;
            case "about":
                hashHistory.push('/index');
                break;
            case "statistics":
                hashHistory.push('/statistics');
                break;
            case "message":
                hashHistory.push('/message');
                break;
            case "setting":
                hashHistory.push('/setting');
                break;
            case "logout":
                localStorage.clear();
                hashHistory.push('/introduce');
                break;
        }

    };

    render() {
        const content = (
            <div className="userSetting">
                <a data-target="setting" onClick={this.toJump}><Icon type="setting" />用户设置</a>
                <br/>
                <a data-target="logout" onClick={this.toJump} className="loginOut"><Icon type="logout" />退出登录</a>
            </div>
        );
        const visible=this.state.visible;
        return (
            <div className="sidebar" data-tag={visible}>
                <Icon type="chrome" className="iconLogo"/>
                <ul className="sidebarNav" onClick={this.toJump}>
                    <li data-target="about" className="aboutMenu">我的</li>
                    <li data-target="search" className="searchMenu">搜索</li>
                    <li data-target="message" className="messageMenu">消息</li>
                    <li data-target="statistics" className="statisticsMenu">统计</li>
                </ul>
                <ul className="userCenter">
                    <Popover placement="rightBottom" title="个人中心" content={content} trigger="click">
                        <li>{localStorage.getItem("name")}</li>
                    </Popover>

                </ul>
            </div>
        );
    };
}