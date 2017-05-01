import React, { Component } from 'react';
import Sidebar from './common/sidebar';
import $ from 'jquery';
import { Icon,Card} from 'antd';
import { hashHistory } from 'react-router';
var message=true;
export default class MailList extends Component {
    constructor(props) {
        super(props);
        this.state = {display: "none",visible: false};
        this.onPanelChange = this.onPanelChange.bind(this);
        this.autoSearchMailList = this.autoSearchMailList.bind(this);
        this.autoSearchMailList();
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

    autoSearchMailList(){//一开始自动加载我的团队列表以及团队成员
        let user_id=localStorage.getItem("user_id");
        fetch('//localhost/companyBACK/welcome/AutoSearchMailList?user_id='+user_id,
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
                    // var html='<Card><div className="contactMen">吴平</div><p className="contactDetail">部门：</p></Card>';
                    // $("#haha").html(lis);

                }else if(list.status=="error"){
                    message.error("系统繁忙～");
                }
            }.bind(this));
    };
    render() {
        const messageList = (
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
            </div>
        );
        return (
            <div className="missionContainer">
                <Sidebar target="message"/>
                <nav className="missionBoard">
                    <h2><Icon type="contacts" />&nbsp;通讯录</h2>
                    <ul className="navUl">
                        <li className="" onClick={this.toMessage}>消息</li>
                        <li className="selected" onClick={this.toMailList}>通讯录</li>
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