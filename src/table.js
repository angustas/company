import React, { Component } from 'react';
import Sidebar from './common/sidebar';
import $ from 'jquery';
import { Icon,Table,Button,Modal,message} from 'antd';
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
        hashHistory.push('/table');
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
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            width: 300,
        }, {
            title: 'Age',
            dataIndex: 'age',
            width: 300,
        }, {
            title: 'Address',
            dataIndex: 'address',
        }];

        const data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                key: i,
                name: `Edward King ${i}`,
                age: 32,
                address: `London, Park Lane no. ${i}`,
            });
        }
        return (
            <div className="missionContainer">
                <Sidebar target="statistics"/>
                <nav className="missionBoard">
                    <h2><Icon type="bars" />&nbsp;概览</h2>
                    <ul className="navUl">
                        <li className="" onClick={this.toStatistics}>统计</li>
                        <li className="selected" onClick={this.toFile}>概览</li>
                    </ul>
                </nav>
                <div className="missionList">
                    <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
                </div>
            </div>
        );
    };
}