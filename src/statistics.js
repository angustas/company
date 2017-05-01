import React, { Component } from 'react';
import Sidebar from './common/sidebar';
import $ from 'jquery';
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/bar');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
import { Icon,Calendar} from 'antd';
import { hashHistory } from 'react-router';
import { PieReact } from './common/pieChart';
export default class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {display: "none",visible: false};
        this.onPanelChange = this.onPanelChange.bind(this);
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
    render() {
        const data = [
            {value: 1, name: "是"},
            {value: 2, name: "否"}
        ];
        return (
            <div className="missionContainer">
                <Sidebar target="statistics"/>
                <nav className="missionBoard">
                    <h2><Icon type="bar-chart" />&nbsp;统计</h2>
                    <ul className="navUl">
                        <li className="selected" onClick={this.toStatistics}>统计</li>
                        <li className="" onClick={this.toFile}>文件</li>
                    </ul>
                </nav>
                <div className="missionList">
                    <div ref="pieChart" id="chart">

                    </div>
                </div>
            </div>
        );
    };
}