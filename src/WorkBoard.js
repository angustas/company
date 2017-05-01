import React, { Component } from 'react';
import $ from 'jquery';
import Sidebar from './common/sidebar';
import { Icon,message,Spin, notification, Button,Modal,Form, Input, Card,Select ,Collapse,Switch,Tooltip,Tag,Mention} from 'antd';
import { hashHistory } from 'react-router';
var userList=[];
var array=[];
export default class WorkBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {loading:false,display: "none",visible: false,suggestions:null,collect:null,data:null,finish:null};
        this.successmessage = this.successmessage.bind(this);
        this.errormessage = this.errormessage.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showProject = this.showProject.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.addComment = this.addComment.bind(this);
        this.createTask = this.createTask.bind(this);
        this.matchUser = this.matchUser.bind(this);
        this.showProject = this.showProject.bind(this);
        this.selectProject = this.selectProject.bind(this);
        this.findTaskList = this.findTaskList.bind(this);
        this.markFinish = this.markFinish.bind(this);
        this.markCollect = this.markCollect.bind(this);
        this.post = this.post.bind(this);
        this.deleteRemark = this.deleteRemark.bind(this);
        this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
        this.findTaskList();
    };
    errormessage(msg){
        message.error(msg);
    };
    successmessage(msg){
        message.success(msg);
    };
    openNotificationWithIcon (type,tips,des){
        notification[type]({
            message: tips,
            description: des,
        });
    };
    handleMenuClick(e) {
        message.info('Click on menu item.');
        console.log('click', e);
    };
    markFinish(e){
        let taskId=$(e.target.parentNode).data("task");
        let url="//localhost/companyBACK/welcome/markCollect";
        this.post(url,"task_id="+taskId+"&how=finish",function(list){
            if(list.status=="OK"){
                this.findTaskList();
                message.success("标记成功～");
            }else{
                message.warning("系统异常，请稍后重试～");
            }
        }.bind(this));
    };
    markCollect(e){
        let taskId=$(e.target.parentNode).data("task");
        let url="//localhost/companyBACK/welcome/markCollect";
        this.post(url,"task_id="+taskId+"&how=collect",function(list){
            if(list.status=="OK"){
                var coll="star";
                if(list.data.task_collect=="true"){
                    coll="star shouCang";
                }else{
                    coll="star";
                }
                this.setState({task_collect:coll});
                this.findTaskList();
                message.success("操作成功～");
            }else{
                message.warning("系统异常，请稍后重试～");
            }
        }.bind(this));
    };
    matchUser(charge){
        for(var i in array){
            if(charge==array[i].name){
                return array[i].user_id;
            }
        }
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
    findTaskList(){
        let url='//localhost/companyBACK/welcome/SearchTaskList';
        let user_id=localStorage.getItem("user_id");
        this.post(url,"user_id="+user_id,function(list){
            var lis = list.data.map(function (m) {
                var w = [],e=6,b=10;
                var chars = "QWERTYUIPASDFGHJKLZXCVBNM123456789";
                for (var i = 0; i < e; i++) {
                    w[i] = chars.substr(Math.floor(Math.random() * 0xb), 1);
                }
                var key = w.join("");
                if(m.task_has_finished=="false"){
                    var cls="star";
                    if(m.task_collect=="true"){
                        cls="star shouCang";
                    }
                    return (
                        <Card key={key}>
                            <a  onClick={this.showProject} data-task={m.task_id} href="javascript:void(0);">{m.task_name}&nbsp;&nbsp;</a>
                            <Tooltip title="标记完成">
                                <div className="switchFolder" onClick={this.markFinish} data-task={m.task_id}>
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
                            <Tooltip title="收藏该任务">
                                <div className={cls} data-task={m.task_id} onClick={this.markCollect}><Icon type="star" /></div>
                            </Tooltip>
                        </Card>
                    );
                }
            },this);
            var collect = list.data.map(function (m) {
                var w = [],e=6,b=10;
                var chars = "QWERTYUIPASDFGHJKLZXCVBNM123456789";
                for (var i = 0; i < e; i++) {
                    w[i] = chars.substr(Math.floor(Math.random() * 0xb), 1);
                }
                var key = w.join("");
                if(m.task_collect=="true"){//收藏
                    return (
                        <Card key={key}>
                            <a  onClick={this.showProject} data-task={m.task_id} href="javascript:void(0);">{m.task_name}&nbsp;&nbsp;</a>
                            <Tooltip title="标记完成">
                                <div className="switchFolder" onClick={this.markFinish} data-task={m.task_id}>
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
                                <div className="star shouCang" data-task={m.task_id} onClick={this.markCollect}><Icon type="star" /></div>
                            </Tooltip>
                        </Card>
                    );
                }
            },this);
            var finish = list.data.map(function (m) {
                var w = [],e=6,b=10;
                var chars = "QWERTYUIPASDFGHJKLZXCVBNM123456789";
                for (var i = 0; i < e; i++) {
                    w[i] = chars.substr(Math.floor(Math.random() * 0xb), 1);
                }
                var key = w.join("");
                if(m.task_has_finished=="true"){
                    var cls="star";
                    if(m.task_collect=="true"){
                        cls="star shouCang";
                    }
                    return (
                        <Card key={key}>
                            <a  onClick={this.showProject} data-task={m.task_id} href="javascript:void(0);">{m.task_name}&nbsp;&nbsp;</a>
                            <Tooltip title="取消完成">
                                <div className="switchFolder" onClick={this.markFinish} data-task={m.task_id}>
                                    <Switch size="small" defaultChecked={true}/>
                                </div>
                            </Tooltip>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Tooltip title="紧急程度">
                                <Tag color="#f50">{m.urgency_level}</Tag>
                            </Tooltip>
                            <Tooltip title="负责人">
                                <div className="whoCharge">{localStorage.getItem("name")}</div>
                            </Tooltip>
                            <Tooltip title="收藏该任务">
                                <div className={cls} data-task={m.task_id} onClick={this.markCollect}><Icon type="star" /></div>
                            </Tooltip>
                        </Card>
                    );
                }
            },this);
            this.setState({data:lis,collect:collect,finish:finish});

    }.bind(this));
    };
    showModal() {
        this.openNotificationWithIcon('info','系统通知','你有一条新的消息，请注意查收～');
        this.setState({
            visible: true,
        });
        let companyId=localStorage.getItem("company_id");
        let url="//localhost/companyBACK/welcome/AutoSearchCompanyMember";
        this.post(url,"company_id="+companyId,function(list){
            var lis = list.data.map(function (m) {
                array.push({user_id:m.user_id,name:m.name});
                return (
                    userList.push(m.name)
                );
            });
            }.bind(this));
    };
    createTask(taskInfo){
        fetch('//localhost/companyBACK/welcome/createTask?taskName='+taskInfo.taskName+'&urgencyLevel='+taskInfo.urgencyLevel+'&taskDetail='+taskInfo.taskDetail
            +'&taskRemarks='+taskInfo.taskRemarks+'&user='+taskInfo.user,
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
                }else if(list.status=="error"){
                    message.error("系统繁忙～");
                }
            }.bind(this));
    };
    handleOk () {
        let taskName=$(".taskName").val();
        let urgencyLevel=this.state.urgencyLevel;
        let taskDetail=$(".taskDetail").val();
        let taskRemarks=$(".taskRemarks").val();
        let charge=this.state.suggestions;
        let user=this.matchUser(charge);
        var taskInfo={
            taskName:taskName,
            urgencyLevel:urgencyLevel,
            taskDetail:taskDetail,
            taskRemarks:taskRemarks,
            user:user
        };
        if(taskName==""){
            message.error("请输入任务名～");
            return false;
        }else if(taskDetail==""){
            message.error("请输入任务详情～");
            return false;
        }else if(urgencyLevel==""){
            message.error("请选择任务紧急程度～");
            return false;
        }else if(user==""){
            message.error("请选择任务负责人～");
            return false;
        }else{
            this.createTask(taskInfo);
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
    selectProject(e){
        this.setState({urgencyLevel:e});
    };
    handleChange (editorState){
        this.setState({
            value: editorState,
        });
        console.log(editorState);
    };
    onSelect(suggestion, data) {
        this.setState({suggestions:suggestion});
    };
    deleteRemark(e){
        let remark_id=$(e.target).data("remark");
        var parent=$(e.target.parentNode);
        let url="//localhost/companyBACK/welcome/DeleteRemark";
        this.post(url,"remark_id="+remark_id,function(list){
            if(list.status=="OK"){
                message.success("删除成功～");
                parent.html("");
            }
        },this);

    };
    showProject(e){//显示项目
        var collect="";
        let url="//localhost/companyBACK/welcome/getTaskById";
        let taskId=$(e.target).data("task");
        this.post(url,"task_id="+taskId,function(list){
            console.log(list);
            var remarkLsit=list.data.remark_info.map(function(m){
                var w = [],e=6,b=10;
                var chars = "QWERTYUIPASDFGHJKLZXCVBNM123456789";
                for (var i = 0; i < e; i++) {
                    w[i] = chars.substr(Math.floor(Math.random() * 0xb), 1);
                }
                var key = w.join("");
                if(m.byWho.user_id==localStorage.getItem("user_id")){
                    return(
                        <p key={key}><a>{m.byWho.name}</a>:&nbsp;&nbsp;&nbsp;{m.remarkWhat.remark_detail}<a data-remark={m.remarkWhat.remark_id} onClick={this.deleteRemark} className="operate">&nbsp;删除</a></p>
                    );
                }else{
                    return(
                        <p key={key}><a>{m.byWho.name}</a>:&nbsp;&nbsp;&nbsp;{m.remarkWhat.remark_detail}</p>
                    );
                }
            }.bind(this));
            if(list.data.task_info.task_collect=="true"){
                collect="star shouCang";
            }else{
                collect="star";
            }
            this.setState({
                task_detail: list.data.task_info.task_detail,
                task_name: list.data.task_info.task_name,
                show: true,
                remark:remarkLsit,
                task_collect:collect,
                task_id:list.data.task_info.task_id,
                urgency_level: list.data.task_info.urgency_level
            });
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
    toTeam(){
        hashHistory.push('/team');
    };

    addComment(e){//添加备注
        let comment=$(".comment").val();
        let task_id=this.state.task_id;
        let url="//localhost/companyBACK/welcome/AddRemark";
        let user_id=localStorage.getItem("user_id");
        var byWho=localStorage.getItem("name");
        if(comment){
            this.post(url,"remark_detail="+comment+"&task_id="+task_id+"&user_id="+user_id,function(list){
                if(list.status=="OK"){
                    var html="<p><a>"+byWho+"</a>:&nbsp;&nbsp;&nbsp;"+list.data.remark_detail+"<a data-remark="+list.data.remark_id+" onClick="+this.deleteRemark+" className='operate'>&nbsp;删除</a></p>";
                    message.success("评论成功～");
                    $(".remarkContent").append(html);
                }
            }.bind(this));
        }else{
            this.errormessage("备注不能为空～");
        }
    };
    render() {

        const FormItem = Form.Item;
        const Option = Select.Option;
        const Panel = Collapse.Panel;
        const customPanelStyle = {
            background: '#FFFFFF',
            borderRadius: 4,
            marginBottom: 14,
            border: 0,
        };
        const tips=this.state.remark;
        const text="暂无备注，来添加一个吧～";
        return (
            <div className="missionContainer">
                <Sidebar target="index"/>
                <nav className="missionBoard">
                    <h2><Icon type="pie-chart" />&nbsp;工作板</h2>
                    <ul className="navUl">
                        <li className="selected" onClick={this.toWorkBoard}>任务</li>
                        <li className="" onClick={this.toDaily}>日历</li>
                        <li className="" onClick={this.toDynamicState}>动态</li>
                        <li className="" onClick={this.toTeam}>团队</li>
                    </ul>
                    <ul className="newMission">
                        <li>
                            <Button type="default" icon="plus" onClick={this.showModal} >新建任务</Button>
                        </li>
                    </ul>
                </nav>
                <div className="missionList">
                    <Spin size="large" spinning={this.state.loading}>
                        <Collapse bordered={false} defaultActiveKey={['2']}>
                            <Panel header="我的收藏" key="1" style={customPanelStyle}>
                                {/*<div className="howMany">1</div>*/}
                                {this.state.collect}
                            </Panel>
                            <Panel header="待完成" key="2" style={customPanelStyle}>
                                {/*<div className="howMany">2</div>*/}
                                {this.state.data}
                            </Panel>

                            <Panel header="已完成" key="3" style={customPanelStyle}>
                                {/*<div className="howMany">2</div>*/}
                                {this.state.finish}
                            </Panel>
                        </Collapse>
                    </Spin>
                </div>
                <Modal title="新建任务" visible={this.state.visible}
                       onOk={this.handleOk} onCancel={this.handleCancel}
                       okText="保存" cancelText="取消"
                >
                    <Form layout="vertical">
                        <FormItem label="任务名称">
                            <Input className="taskName"/>
                        </FormItem>
                        <FormItem label="任务内容">
                            <Input type="textarea" className="taskDetail"/>
                        </FormItem>

                            紧急程度：<Select defaultValue="一般"  className="urgencyLevel" onChange={this.selectProject}>
                                <Option value="较低">较低</Option>
                                <Option value="一般">一般</Option>
                                <Option value="较高">较高</Option>
                                <Option value="紧急">紧急</Option>
                            </Select>
                        <br/><br/>
                            负责人：
                        <Mention className="charge"
                            suggestions={userList}
                            value={this.state.value}
                            onChange={this.handleChange}
                            onSelect={this.onSelect}
                        />
                        <FormItem label="任务备注">
                            <Input className="taskRemarks"/>
                        </FormItem>
                    </Form>
                </Modal>

                <Modal title="任务详情" visible={this.state.show}
                       onOk={this.handleCancel} onCancel={this.handleCancel}
                       okText="确认" cancelText="取消"
                >
                    <Card>
                        <a href="javascript:void(0);">{this.state.task_name}&nbsp;</a>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Tooltip title="紧急程度">
                            <Tag color="#f50">{this.state.urgency_level}</Tag>
                        </Tooltip>
                        <Tooltip title="负责人">
                            <div className="whoCharge">{localStorage.getItem("name")}</div>
                        </Tooltip>
                            <div className={this.state.task_collect} data-task={this.state.task_id} onClick={this.markCollect}><Icon type="star" /></div>
                        <br/><br/>
                        <p>任务内容：{this.state.task_detail}</p>
                        <br/>
                        <p>备注：</p>
                        <div className="remarkContent">
                            {tips!=false?tips:text}
                        </div>
                        <br/>
                        <Input type="textarea" placeholder="添加备注消息" className="comment" style={{width:350}}/>
                        &nbsp;&nbsp;&nbsp;
                        <Button type="primary" onClick={this.addComment}>添加</Button>

                    </Card>
                </Modal>
            </div>
        );
    };
}