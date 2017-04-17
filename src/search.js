import React, { Component } from 'react';
import Sidebar from './common/sidebar';
import $ from 'jquery';
import { Icon,Calendar} from 'antd';
import { hashHistory } from 'react-router';
export default class Search extends Component {
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
                <Sidebar target="search"/>
                <nav className="missionBoard">
                    <h2>搜索</h2>
                </nav>
                <div className="missionList">
                    <div className="searchBox"></div>
                </div>


            </div>
        );
    };
}