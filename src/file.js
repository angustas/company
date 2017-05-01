import React, { Component } from 'react';
import Sidebar from './common/sidebar';
import $ from 'jquery';
import { Icon,Input,Breadcrumb,Button,Modal,message} from 'antd';
import { hashHistory } from 'react-router';
export default class File extends Component {
    constructor(props) {
        super(props);
        this.state = {display: "none",visible: false};
        this.onPanelChange = this.onPanelChange.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.showModal = this.showModal.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    };
    errormessage(msg){
        message.error(msg);
    };
    successmessage(msg){
        message.success(msg);
    };
    toStatistics(){
        hashHistory.push('/statistics');
    };
    toFile(){
        hashHistory.push('/file');
    };
    onPanelChange(value, mode) {
        console.log(value, mode);
    };
    showModal() {
        this.setState({
            visible: true,
        });
    };
    handleOk () {
        let folderProjectName=$(".folderProjectName").val();
        if(folderProjectName==""){
            this.errormessage("请输入文件夹名～");
        }else{
            // fetch(); 去请求数据
            this.setState({
                visible: false,
                show: false
            });
            this.successmessage("创建成功～");
        }
    };
    handleCancel() {
        this.setState({
            visible: false,
            show: false
        });
    };
    uploadFile(){
        this.setState({
            visible: true,
        });
    };
    render() {
        return (
            <div className="missionContainer">
                <Sidebar target="statistics"/>
                <nav className="missionBoard">
                    <h2><Icon type="cloud-download" />&nbsp;文件</h2>
                    <ul className="navUl">
                        <li className="" onClick={this.toStatistics}>统计</li>
                        <li className="selected" onClick={this.toFile}>文件</li>
                    </ul>
                    <ul className="newMission">
                        <li>
                            <Button type="default" icon="plus"  onClick={this.showModal}>新建文件夹</Button>
                        </li>
                        &nbsp;&nbsp;
                        <li>
                            <Button type="default" icon="upload"  onClick={this.uploadFile}>上传</Button>
                        </li>
                    </ul>
                </nav>
                <div className="missionList">
                    <div className="showBoard">
                        <div className="guideBar">
                            <Breadcrumb>
                                <Breadcrumb.Item>文件</Breadcrumb.Item>
                                <Breadcrumb.Item><a href="">默认</a></Breadcrumb.Item>
                                <Breadcrumb.Item><a href="">图片</a></Breadcrumb.Item>
                                <Breadcrumb.Item>组件库</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>

                        <div className="folder">
                            <Icon type="folder" />
                            <p className="folderName">
                                react
                            </p>
                        </div>
                        <div className="images">
                            <Icon type="picture" />
                            <p className="folderName">
                                images
                            </p>
                        </div>
                    </div>
                </div>
                <Modal title="新建文件" visible={this.state.visible}
                       onOk={this.handleOk} onCancel={this.handleCancel}
                       okText="确认" cancelText="取消"
                >
                    文件夹名称：&nbsp;<Input className="folderProjectName" placeholder="文件夹名"/>
                </Modal>

            </div>
        );
    };
}