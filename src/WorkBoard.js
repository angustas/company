import React, { Component } from 'react';
import $ from 'jquery';
import Sidebar from './common/sidebar';
import { Icon,message,Menu, Dropdown, Button,Modal,Form, Input, Card,Select ,Collapse,Switch,Tooltip,Tag,Badge} from 'antd';
import { hashHistory } from 'react-router';
export default class WorkBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {display: "none",visible: false};
        this.successmessage = this.successmessage.bind(this);
        this.errormessage = this.errormessage.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.selectProject = this.selectProject.bind(this);
        this.showProject = this.showProject.bind(this);
        this.deleteCharge = this.deleteCharge.bind(this);
        this.addCharge = this.addCharge.bind(this);
        this.addComment = this.addComment.bind(this);
        // 标记
        // this.toDaily = this.toDaily.bind(this);
        // this.toDynamicState = this.toDynamicState.bind(this);

    };
    errormessage(msg){
        message.error(msg);
    };
    successmessage(msg){
        message.success(msg);
    };

    handleMenuClick(e) {
        message.info('Click on menu item.');
        console.log('click', e);
    };
    showModal() {
        this.setState({
            visible: true,
        });
    };
    handleOk () {
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
    selectProject(value){
        console.log(`selected ${value}`);
    };
    showProject(){//显示项目
        this.setState({
            show: true,

        });
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
    deleteCharge(){
        console.log(111);
    };
    addCharge(){//添加负责人
        var chargeArray=[];
        chargeArray.push("<Tag closable onClose={this.deleteCharge}>李四</Tag>");
    }
    addComment(){//添加备注
        let comment=$(".comment").val();
        console.log(comment);
        if(comment){
            this.successmessage("添加备注成功～");
        }else{
            this.errormessage("备注不能为空～");

        }
    };
    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1">分配给我的任务</Menu.Item>
                <Menu.Item key="2">我关注的任务</Menu.Item>
                <Menu.Item key="3">我创建的任务</Menu.Item>
            </Menu>
        );
        const FormItem = Form.Item;
        const Option = Select.Option;
        const Panel = Collapse.Panel;
        const customPanelStyle = {
            background: '#FFFFFF',
            borderRadius: 4,
            marginBottom: 14,
            border: 0,
        };
        const chargeArray=[];
        chargeArray.push("<Tag closable onClose={this.deleteCharge}>李四</Tag>");
        return (
            <div className="missionContainer">
                <Sidebar target="index"/>
                <nav className="missionBoard">
                    <ul className="navUl">
                        <li className="selected" onClick={this.toWorkBoard}>任务</li>
                        <li className="" onClick={this.toDaily}>日历</li>
                        <li className="" onClick={this.toDynamicState}>动态</li>
                    </ul>
                    <ul className="newMission">
                        <li>
                            <Button type="default" icon="plus" onClick={this.showModal} >新建任务</Button>
                        </li>
                        <li>
                            <Dropdown.Button  overlay={menu}>筛选</Dropdown.Button>
                        </li>
                    </ul>
                </nav>
                <div className="missionList">
                    <Collapse bordered={false} defaultActiveKey={['2']}>
                    <Panel header="任务池" key="1" style={customPanelStyle}>
                        <div className="howMany">1</div>
                        <Card>
                            <a onClick={this.showProject} href="javascript:void(0);">车主圈&nbsp;</a>
                            <Tooltip title="标记完成">
                                <Switch checkedChildren={'yes'} unCheckedChildren={'no'} />
                            </Tooltip>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Tooltip title="紧急程度">
                                <Tag color="orange">一般</Tag>
                            </Tooltip>
                            <Tooltip title="负责人">
                                <div className="whoCharge">吴平</div>
                            </Tooltip>
                            <Tooltip title="收藏该任务">
                                <div className="star"><Icon type="star" /></div>
                            </Tooltip>
                        </Card>
                    </Panel>
                    <Panel header="开发中" key="2" style={customPanelStyle}>
                        <div className="howMany">2</div>
                        <Card>
                            <a href="javascript:void(0);" onClick={this.showProject}>组件库&nbsp;</a>
                            <Tooltip title="标记完成">
                            <Switch checkedChildren={'yes'} unCheckedChildren={'no'} />
                            </Tooltip>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Tooltip title="紧急程度">
                                <Tag color="#f50">紧急</Tag>
                            </Tooltip>
                            <Tooltip title="负责人">
                                <div className="whoCharge">吴平</div>
                            </Tooltip>
                            <Tooltip title="收藏该任务">
                                <div className="star shouCang"><Icon type="star" /></div>
                            </Tooltip>
                        </Card>
                        <Card>
                            <a href="javascript:void(0);" onClick={this.showProject}>车生活&nbsp;</a>
                            <Tooltip title="标记完成">
                                <Switch checkedChildren={'yes'} unCheckedChildren={'no'} />
                            </Tooltip>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Tooltip title="紧急程度">
                                <Tag color="#f50">紧急</Tag>
                            </Tooltip>
                            <Tooltip title="负责人">
                                <div className="whoCharge">吴平</div>
                            </Tooltip>
                            <Tooltip title="收藏该任务">
                                <div className="star"><Icon type="star" /></div>
                            </Tooltip>
                        </Card>
                    </Panel>

                    <Panel header="已完成" key="3" style={customPanelStyle}>
                        <div className="howMany">2</div>
                        <Card>
                            <a href="javascript:void(0);" onClick={this.showProject}>素材库&nbsp;</a>

                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Tooltip title="紧急程度">
                                <Tag color="#f50">紧急</Tag>
                            </Tooltip>
                            <Tooltip title="负责人">
                                <div className="whoCharge">吴平</div>
                            </Tooltip>
                            <Tooltip title="收藏该任务">
                                <div className="star"><Icon type="star" /></div>
                            </Tooltip>
                        </Card>
                        <Card>
                            <a href="javascript:void(0);"  onClick={this.showProject}>实验室&nbsp;</a>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Tooltip title="紧急程度">
                                <Tag color="#f50">紧急</Tag>
                            </Tooltip>
                            <Tooltip title="负责人">
                                <div className="whoCharge">吴平</div>
                            </Tooltip>
                            <Tooltip title="收藏该任务">
                                <div className="star"><Icon type="star" /></div>
                            </Tooltip>
                        </Card>
                    </Panel>
                    </Collapse>
                </div>

                <Modal title="新建任务" visible={this.state.visible}
                       onOk={this.handleOk} onCancel={this.handleCancel}
                       okText="保存" cancelText="取消"
                >
                    <Form layout="vertical">
                        <FormItem label="任务名称">
                            <Input />
                        </FormItem>
                        <FormItem label="任务内容">
                            <Input type="textarea" />
                        </FormItem>
                            所属项目：<Select defaultValue="组件库" style={{width:150}} onChange={this.selectProject}>
                                <Option value="后市场">后市场</Option>
                                <Option value="组件库">组件库</Option>
                                <Option value="车主圈">车主圈</Option>
                                <Option value="维修保养">维修保养</Option>
                            </Select>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            紧急程度：<Select defaultValue="一般" style={{width:150}} onChange={this.selectProject}>
                                <Option value="较低">较低</Option>
                                <Option value="一般">一般</Option>
                                <Option value="较高">较高</Option>
                                <Option value="紧急">紧急</Option>
                            </Select>
                        <br/><br/>
                            负责人：&nbsp;<Tag closable onClose={this.deleteCharge}>李四</Tag>
                            <div className="addCharge" onClick={this.addCharge} ><Icon type="plus-circle-o" /></div>
                        <FormItem label="任务备注">
                            <Input />
                        </FormItem>
                    </Form>
                </Modal>

                <Modal title="任务详情" visible={this.state.show}
                       onOk={this.handleOk} onCancel={this.handleCancel}
                       okText="确认" cancelText="取消"
                >
                    <Card>
                        <a href="javascript:void(0);"  onClick={this.showProject}>实验室&nbsp;</a>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Tooltip title="紧急程度">
                            <Tag color="#f50">紧急</Tag>
                        </Tooltip>
                        <Tooltip title="负责人">
                            <div className="whoCharge">吴平</div>
                        </Tooltip>
                        <Tooltip title="收藏该任务">
                            <div className="star"><Icon type="star" /></div>
                        </Tooltip>
                        <br/><br/>
                        <p>任务内容：主要负责组件库的上传与更新维护，react组件，联系ant design打造精品组件，为您的办公带来更美好的体验。</p>
                        <br/>
                        <p>备注：1：请及时跟进工作进度。</p>
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