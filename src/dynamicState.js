import React, { Component } from 'react';
import Sidebar from './common/sidebar';
import $ from 'jquery';
import { Icon,Card,message,Pagination} from 'antd';
import { hashHistory } from 'react-router';
export default class DynamicState extends Component {
    constructor(props) {
        super(props);
        this.state = {display: "none",visible: false};
        this.post = this.post.bind(this);
        this.fetchDynamic = this.fetchDynamic.bind(this);
        this.fetchDynamic();
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
    fetchDynamic(){
        let url="//localhost/companyBACK/welcome/GetDynamic";
        let user_id=localStorage.getItem("user_id");
        this.post(url,"user_id="+user_id,function(list){
            var dynamic=list.data.map(function(m){
                return (
                    <div className="cardContainer" key={Math.random()}>
                        <Card>
                            <div className="chargeName">{localStorage.getItem("name")}</div>
                            <div className="detail">
                                <h5 className="detailName">{m.dynamic_detail}</h5>
                                <p className="detailProject">{m.task_name}</p>
                                <span className="date">{m.time}</span>
                            </div>
                        </Card>
                    </div>
                );
            });
            this.setState({dynamic:dynamic});
        }.bind(this));
    };
    render() {

        return (
            <div className="missionContainer">
                <Sidebar target="index"/>
                <nav className="missionBoard">
                    <h2><Icon type="star-o" />&nbsp;动态</h2>
                    <ul className="navUl">
                        <li className="" onClick={this.toWorkBoard}>任务</li>
                        <li className="" onClick={this.toDaily}>日历</li>
                        <li className="selected" onClick={this.toDynamicState}>动态</li>
                        <li className="" onClick={this.toTeam}>团队</li>
                    </ul>

                </nav>
                <div className="missionList">
                    {this.state.dynamic}
                    <div className="pageList"><Pagination simple defaultCurrent={2} total={50} /></div>
                </div>


            </div>
        );
    };
}