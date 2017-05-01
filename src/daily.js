import React, { Component } from 'react';
import Sidebar from './common/sidebar';
import $ from 'jquery';
import { Icon,Calendar} from 'antd';
import { hashHistory } from 'react-router';
export default class Daily extends Component {
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
    toTeam(){
        hashHistory.push('/team');
    };
    onPanelChange(value, mode) {
        console.log(value, mode);
    };

    render() {
        return (
            <div className="missionContainer">
                <Sidebar target="index"/>
                <nav className="missionBoard">
                    <h2><Icon type="schedule" />&nbsp;日历</h2>
                    <ul className="navUl">
                        <li className="" onClick={this.toWorkBoard}>任务</li>
                        <li className="selected" onClick={this.toDaily}>日历</li>
                        <li className="" onClick={this.toDynamicState}>动态</li>
                        <li className="" onClick={this.toTeam}>团队</li>
                    </ul>

                </nav>
                    <div className="daily">
                        <Calendar style={{height:500}} fullscreen={false} onPanelChange={this.onPanelChange} />
                    </div>


            </div>
        );
    };
}