import React, { Component } from 'react';
import Sidebar from './common/sidebar';
import $ from 'jquery';
import { Icon,Card,Spin,message} from 'antd';
import { hashHistory } from 'react-router';
var messages=true;
export default class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: "none",
            visible: false,
            cls:"missionList",
            detailMove:"messageDetail",
            loading:true,
            which:"",
            byWho:"",
            sayWhat:"",
            time:""
        };
        this.onPanelChange = this.onPanelChange.bind(this);
        this.showDetail = this.showDetail.bind(this);
        this.post = this.post.bind(this);
        this.hideRight = this.hideRight.bind(this);
        this.getMessage = this.getMessage.bind(this);
    };
    componentDidMount(){
        if(!messages){
            messages="123";
            this.setState({display:"none"});
        }
        this.getMessage();
    }
    toMailList(){
        hashHistory.push('/mailList');
    };
    toMessage(){
        hashHistory.push('/message');
    };
    onPanelChange(value, mode) {
        console.log(value, mode);
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
    showDetail(e){
        this.setState({
            cls:"missionList afterClickLater",
            detailMove:"messageDetail move"
        });
        let message_id=$(e.target).data("messageid");
        let url="//localhost/companyBACK/welcome/GetMessageById";
        this.post(url,"message_id="+message_id,function(list){
            if(list.status=="OK"){
                this.setState({
                    which:list.data[0].task_name,
                    byWho:list.data[0].user_name,
                    sayWhat:list.data[0].message_detail,
                    time:list.data[0].time
                });
            }else{
                message.warning("系统异常，请稍后重试～");
            }
        }.bind(this));
    };
    hideRight(){
        this.setState({
            cls:"missionList",
            detailMove:"messageDetail"
        });
    };
    getMessage(){//查询系统消息
        let company_id=localStorage.getItem("company_id");
        let url="//localhost/companyBACK/welcome/GetMessage";
        this.post(url,"company_id="+company_id,function(list){
            if(list.status=="OK"){
                var messageList=list.data.map(function(m){
                    return (
                        <Card key={Math.random()}>
                            <div className="messageIcon"><Icon type="message" /></div>
                            <h3 className="messageListTaskName"><a>{m.task_name}</a></h3>
                            <span data-messageId={m.message_id} className="messageListUserName">
                                <a>{m.user_name}&nbsp;&nbsp;&nbsp;</a>
                                {m.message_title}&nbsp;&nbsp;&nbsp;
                                <a data-messageId={m.message_id}  onClick={this.showDetail}>点击查看</a></span>
                            <div className="messageTime">{m.time}</div>
                        </Card>
                    );
                }.bind(this));
                this.setState({messageList:messageList});
            }else{
                message.warning("系统异常，请稍后重试～");
            }
        }.bind(this));
    };


    render() {
        return (
            <div className="missionContainer">
                <Sidebar target="message"/>
                <nav className="missionBoard">
                    <h2><Icon type="bell" />&nbsp;消息</h2>
                    <ul className="navUl">
                        <li className="selected" onClick={this.toMessage}>消息</li>
                        <li className="" onClick={this.toMailList}>通讯录</li>
                    </ul>
                </nav>
                <div className={this.state.cls}>
                    <Spin size="large" spinning={this.state.loading}>
                    <div className="messageList">
                        {this.state.messageList}
                        <div className="whenNoMessage" style={{display:this.state.display}}>
                            <Icon type="message" />
                            <div className="messageTips">暂无消息</div>
                        </div>
                    </div>
                    </Spin>
                </div>
                <div className={this.state.detailMove}>
                    <Card loading={this.state.loading} title="消息提醒">
                        <h3><a>{this.state.which}</a></h3>
                        <a className="toogleRight" onClick={this.hideRight}>收起</a>
                        <p >{this.state.time}</p>
                        <br/>
                        <p><a>{this.state.byWho}</a>{this.state.sayWhat}</p>
                    </Card>
                </div>
            </div>
        );
    };
}