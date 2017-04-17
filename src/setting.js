import React, { Component } from 'react';
import Sidebar from './common/sidebar';
import $ from 'jquery';
import { Icon,Calendar} from 'antd';
import { hashHistory } from 'react-router';
export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {display: "none",visible: false};
        this.onPanelChange = this.onPanelChange.bind(this);
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
    onPanelChange(value, mode) {
        console.log(value, mode);
    };

    render() {
        return (
            <div className="missionContainer">
                <Sidebar target="setting"/>
                <nav className="missionBoard">
                    <ul className="navUl">
                        <li className="" onClick={this.toWorkBoard}>任务</li>
                        <li className="selected" onClick={this.toDaily}>日历</li>
                        <li className="" onClick={this.toDynamicState}>动态</li>
                    </ul>

                </nav>
                <div className="missionList">
                    <Calendar onPanelChange={this.onPanelChange} />
                </div>


            </div>
        );
    };
}