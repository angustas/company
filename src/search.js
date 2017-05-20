import React, { Component } from 'react';
import Sidebar from './common/sidebar';
import $ from 'jquery';
import { Icon,Select,Spin,message,Card,Tooltip,Switch,Tag} from 'antd';
import { hashHistory } from 'react-router';
const Option = Select.Option;
export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {loading:false,optionValue: "user",visible: false,after:"block",result:""};
        this.post = this.post.bind(this);
        this.search = this.search.bind(this);
        this.selectWhere = this.selectWhere.bind(this);
    };
    componentDidMount(){
        document.addEventListener("keydown",function(e){
            if(e.keyCode==13){//回车
                this.search();
            }
        }.bind(this));
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
    selectWhere(value){
        this.setState({optionValue:value});
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
                setTimeout(function(){
                    this.setState({loading:false});
                }.bind(this),1000);
                return response.json();

            }.bind(this))
            .then(function (list) {
                if(list.status=="OK"){
                    setTimeout(function(){
                        this.setState({loading:false});
                        callback(list);
                    }.bind(this),1000);
                }else if(list.status=="error"){
                    message.error("我用尽全身力气，依旧没有找到～");
                    setTimeout(function(){
                        this.setState({loading:false});
                    }.bind(this),1000);
                }
            }.bind(this));
    };
    search(){
        let keyWords=$(".searchBox").val();
        let where=this.state.optionValue;
        let company_id=localStorage.getItem("company_id");
        let user_id=localStorage.getItem("user_id");
        let url="//localhost/companyBACK/welcome/SearchByKeyWords";
        let req="keyWords="+keyWords+"&where="+where+"&company_id="+company_id+"&user_id="+user_id;
        if(keyWords==""){
            message.warning("请输入有效搜索内容～");
        }else{
            this.post(url,req,function(list){
                if(list.status=="OK"){
                    console.log(list);
                    message.success("success～");
                    var result=list.data.map(function(m){
                        var w = [],e=6,b=10;
                        var chars = "QWERTYUIPASDFGHJKLZXCVBNM123456789";
                        for (var i = 0; i < e; i++) {
                            w[i] = chars.substr(Math.floor(Math.random() * 0xb), 1);
                        }
                        var key = w.join("");
                        if(this.state.optionValue=="user"){
                            return(
                                <Card key={key}>
                                    <div className="contactMen">{m.name}</div>
                                    <p className="contactDetail">部门：{m.user_department}</p>
                                    <span className="jobType">职位：{m.user_job}</span>
                                    <span className="tel">手机号：{m.user_tel}</span>
                                </Card>
                            );
                        }else if(this.state.optionValue=="message"){
                            return(
                                <Card key={key}>
                                    <div className="messageIcon"><Icon type="message" /></div>
                                    <p>系统提示：</p>
                                    <span>{m.message_title}<a href="#">点击查看</a></span>
                                    <div className="messageTime">2016-09-30 14:50:18</div>
                                </Card>
                            );
                        }else if(this.state.optionValue=="task"){
                            return(
                                <Card key={key}>
                                    <a data-task={m.task_id} href="javascript:void(0);">{m.task_name}&nbsp;&nbsp;</a>
                                    <Tooltip title="标记完成">
                                        <div className="switchFolder"  data-task={m.task_id}>
                                            <Switch size="small"/>
                                        </div>
                                    </Tooltip>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Tooltip title="紧急程度">
                                        <Tag color="#f50">{m.urgency_level}</Tag>
                                    </Tooltip>
                                    <Tooltip title="负责人">
                                        <div className="whoCharge">{localStorage.getItem("name")}</div>
                                    </Tooltip>
                                    <Tooltip title="取消收藏该任务">
                                        <div className="star shouCang" data-task={m.task_id} ><Icon type="star" /></div>
                                    </Tooltip>
                                </Card>
                            );
                        }else if(this.state.optionValue=="dynamicState"){
                            return(
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
                        }
                    }.bind(this));
                    this.setState({
                        after:"none",
                        result:result
                    });
                }else{
                    message.warning("系统异常，请稍后重试～");
                }
            }.bind(this));
        }
    };
    render() {
        return (
            <div className="missionContainer">
                <Sidebar target="search"/>
                <nav className="missionBoard">
                    <h2><Icon type="search" />&nbsp;搜索</h2>
                </nav>
                <div className="missionList">
                    <input placeholder="输入筛选条件～" className="searchBox"/>
                    <Spin size="large" spinning={this.state.loading}>
                    <div className="recommend">
                        搜索范围：
                        <Select defaultValue="user" onChange={this.selectWhere} style={{width:200}}>
                            <Option value="user">用户</Option>
                            <Option value="message">消息</Option>
                            <Option value="task">任务</Option>
                            <Option value="dynamicState">动态</Option>
                        </Select>
                        <div className="searchDirect" style={{display:this.state.after}}>
                            <h3><Icon type="info-circle-o" />&nbsp;&nbsp;常用推荐：</h3>
                            <div className="recommendDetail">
                                <ul>
                                    <li>分配给我的任务</li>
                                    <li>我创建的任务</li>
                                    <li>我发布的动态</li>
                                    <li>我的团队</li>
                                </ul>
                            </div>
                        </div>
                        <div className="searchResult">
                            {this.state.result}
                        </div>
                    </div>
                    </Spin>
                </div>

            </div>
        );
    };
}