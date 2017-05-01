import React, { Component } from 'react';
import Sidebar from './common/sidebar';
import $ from 'jquery';
import { Icon,Card} from 'antd';
import { hashHistory } from 'react-router';
var message=true;
export default class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {display: "none",visible: false};
        this.onPanelChange = this.onPanelChange.bind(this);
    };
    componentDidMount(){
        if(!message){
            message="123";
            this.setState({display:"none"});
        }
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
    render() {
        const messageList = (
            <div className="cardContainer">
                <Card>
                    <div className="messageIcon"><Icon type="message" /></div>
                    <p>系统提示：</p>
                    <span>您收到一条新消息，<a href="#">点击查看</a></span>
                    <div className="messageTime">2016-09-30 14:50:18</div>
                </Card>
                <Card>
                    <div className="messageIcon"><Icon type="message" /></div>
                    <p>系统提示：</p>
                    <span>您收到一条新消息，<a href="#">点击查看</a></span>
                    <div className="messageTime">2016-09-30 14:50:18</div>
                </Card>
            </div>
        );
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
                <div className="missionList">
                    <div className="messageList">
                        {messageList}
                        <div className="whenNoMessage" style={{display:this.state.display}}>
                            <Icon type="message" />
                            <div className="messageTips">暂无消息</div>
                        </div>
                    </div>
                </div>

            </div>
        );
    };
}