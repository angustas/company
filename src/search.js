import React, { Component } from 'react';
import Sidebar from './common/sidebar';
import $ from 'jquery';
import { Icon,Select} from 'antd';
import { hashHistory } from 'react-router';
const Option = Select.Option;
export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {optionValue: "user",visible: false};
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
    search(){
        let keyWords=$(".searchBox").val();
        let where=this.state.optionValue;
        console.log(keyWords);
        let url="//localhost/companyBACK/welcome/SearchByKeyWords";
        // this.post(url,"keywords="+keyWords+"&where="+where,function(list){
        //     if(list.status=="OK"){
        //         var coll="star";
        //         if(list.data.task_collect=="true"){
        //             coll="star shouCang";
        //         }else{
        //             coll="star";
        //         }
        //         this.setState({task_collect:coll});
        //         this.findTaskList();
        //         message.success("操作成功～");
        //     }else{
        //         message.warning("系统异常，请稍后重试～");
        //     }
        // }.bind(this));
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
                    <div className="recommend">
                        搜索范围：
                        <Select defaultValue="user" onChange={this.selectWhere} style={{width:200}}>
                            <Option value="user">用户</Option>
                            <Option value="team">团队</Option>
                            <Option value="task">任务</Option>
                            <Option value="dynamicState">动态</Option>
                        </Select>
                        <h3><Icon type="info-circle-o" />&nbsp;&nbsp;常用推荐：</h3>
                        <div className="recommendDetail">
                            <ul>
                                <li>分配给我的任务</li>
                                <li>我创建的任务</li>
                                <li>我发布的动态</li>
                                <li>我的团队</li>
                            </ul>
                        </div>
                        <br/><br/><br/>
                        <br/><br/><br/>
                        <br/><br/>
                    </div>
                </div>

            </div>
        );
    };
}