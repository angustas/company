import React, { Component } from 'react';
import Sidebar from './common/sidebar';
import $ from 'jquery';
import { Icon,Card,Spin,message} from 'antd';
import { hashHistory } from 'react-router';
export default class MailList extends Component {
    constructor(props) {
        super(props);
        this.state = {display: "none",visible: false,loading:true};
        this.onPanelChange = this.onPanelChange.bind(this);
        this.getMailList = this.getMailList.bind(this);
        this.post = this.post.bind(this);
    };
    componentDidMount(){
        this.getMailList();
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
    getMailList(){//查询通讯录列表
        let company_id=localStorage.getItem("company_id");
        let url="//localhost/companyBACK/welcome/GetMailList";
        this.post(url,"company_id="+company_id,function(list){
            if(list.status=="OK"){
                var mailList=list.data.map(function(m){
                    return (
                        <Card key={Math.random()}>
                            <div className="contactMen mailListName">{m.name}</div>
                            <p className="mailListDepartment">部门：{m.user_department}</p>
                            <span className="mailjobType">职位：{m.user_job}</span>
                            <span className="mailtel">手机号：{m.user_tel}</span>
                        </Card>
                    );
                }.bind(this));
                this.setState({mailList:mailList});
            }else{
                message.warning("系统异常，请稍后重试～");
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
                    <Spin size="large" spinning={this.state.loading}>
                    <div className="messageList">
                        {this.state.mailList}
                        <div className="whenNoMessage" style={{display:this.state.display}}>
                            <Icon type="message" />
                            <div className="messageTips">暂无消息</div>
                        </div>
                    </div>
                    </Spin>
                </div>
            </div>
        );
    };
}