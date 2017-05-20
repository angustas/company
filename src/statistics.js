import React, { Component } from 'react';
import Sidebar from './common/sidebar';
import $ from 'jquery';
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/bar');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
import { Icon,Col,Row,Card,Spin} from 'antd';
import { hashHistory } from 'react-router';
var G2 = require('g2');
export default class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {display: "none",visible: false,loading:false};
        this.onPanelChange = this.onPanelChange.bind(this);
        this.paint = this.paint.bind(this);
        this.drawLine = this.drawLine.bind(this);
        this.getZhuMap = this.getZhuMap.bind(this);
        this.yuan = this.yuan.bind(this);
        this.post = this.post.bind(this);
        this.getLineMap = this.getLineMap.bind(this);
        this.getStatistics = this.getStatistics.bind(this);
        this.relation = this.relation.bind(this);

    };
    componentDidMount(){
        this.getStatistics();
        this.getZhuMap();
        this.getLineMap();
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
    getStatistics(){
        let url="//localhost/companyBACK/welcome/StatisticsProject";
        let user_id=localStorage.getItem("user_id");
        this.post(url,"user_id="+user_id,function(list){
            console.log(list);
            var finish=0;
            var notYet=0;
            list.data.map(function(m){
                if(m.task_has_finished=="true"){
                    finish =finish+1;
                }else{
                    notYet=notYet+1;
                }
            });
            let total=finish+notYet;
            let precent=(finish/total)*100;
            let last=precent.toFixed(0)+"%";
            let user_name=localStorage.getItem("name");
            let data = [
                {name: '已经完成', value: precent },
                {name: '未完成', value: 100-precent},
            ];
            let data4 = [
                {item: "任务总数", value: total, obj: user_name},
                {item: "完成任务", value: finish, obj: user_name},
                {item: "待完成", value: notYet, obj: user_name}
            ];
            this.setState({
                total:total,
                finish:finish,
                notYet:notYet,
                precent:last
            });
            this.yuan(data);
            this.relation(data4);
        }.bind(this));
    };
    getZhuMap(){
        let url="//localhost/companyBACK/welcome/TeamProject";
        let company_id=localStorage.getItem("company_id");
        var dataArr=[];
        this.post(url,"company_id="+company_id,function(list) {
            list.data.map(function (m) {
                dataArr.push({genre: m.user_name, sold: m.number});
            });
            this.paint(dataArr);
        }.bind(this));
        // this.drawLine(data2);
    };
    getLineMap(){
        let url="//localhost/companyBACK/welcome/getLine";
        let user_id=localStorage.getItem("user_id");
        var data2=[];
        let myDate = new Date();
        myDate.setDate(myDate.getDate() - 7);
        let dateArray = [];
        let dateTemp;
        let flag = 1;
        for (var i = 0; i < 7; i++) {
            dateTemp = (myDate.getMonth()+1)+"-"+myDate.getDate();
            dateArray.push(dateTemp);
            myDate.setDate(myDate.getDate() + flag);
        }
        this.post(url,"user_id="+user_id,function(list) {
            console.log(list);
            for(var i=0;i<list.data.length;i++){
                data2.push({month:dateArray[i], task: list.data[i].number});
            }
            this.drawLine(data2);
        }.bind(this));
    };
    drawLine(data2){//线图
        var chart = new G2.Chart({
            id: 'c2',
            forceFit: true,
            width:450,
            height: 240
        });
        chart.source(data2, {
            month: {
                alias: '最近七天',
                range: [0, 1]
            },
            task: {
                alias: '完成任务量（个）'
            }
        });
        chart.line().position('month*task').size(2);
        chart.render();
    };
    paint(data){//柱状图
        var chart = new G2.Chart({
            id: "c1",
            width: 450,
            height: 240
        });
        chart.source(data, {
            genre: {
                alias: '成员' // 列定义，定义该属性显示的别名
            },
            sold: {
                alias: '任务完成量（个）'
            }
        });
        chart.interval().position('genre*sold').color('genre');
        chart.render();
    };
    yuan(data){//饼图

            var Stat = G2.Stat;
            var chart = new G2.Chart({
            id: 'yuan',
            forceFit: true,
            height: 240,
            width:200
        });
            chart.source(data);

            // 重要：绘制饼图时，必须声明 theta 坐标系
            chart.coord('theta', {
            radius: 0.8 // 设置饼图的大小
        });
            chart.legend('name', {
            position: 'bottom',
            itemWrap: true,
            formatter: function(val) {
            for(var i = 0, len = data.length; i < len; i++) {
            var obj = data[i];
            if (obj.name === val) {
            return val + ': ' + obj.value + '%';
                    }
                }
            }
        });
            chart.tooltip({
            title: null,
            map: {
            value: 'value'
        }
        });
            chart.intervalStack()
            .position(Stat.summary.percent('value'))
            .color('name')
            .label('name*..percent',function(name, percent){
            percent = (percent * 100).toFixed(2) + '%';
            return name + ' ' + percent;
        });

            chart.render();
            // 设置默认选中
            var geom = chart.getGeoms()[0]; // 获取所有的图形
            var items = geom.getData(); // 获取图形对应的数据
            geom.setSelected(items[1]); // 设置选中


    };
    relation(data4){//雷达图
            var chart = new G2.Chart({
            id: 'relation',
            forceFit: true,
            height: 240,
            plotCfg: {
            margin: [20, 140, 60, 80]
        }
        });

            chart.source(data4, {
            'value': {
            min: 0,
            max: data4[0].value,
            tickCount: 5
        }
        });
            chart.coord('polar');
            chart.legend('obj', { // 配置具体字段对应的图例属性
            title: null,
            position: 'bottom'
        });
            chart.axis('item',{ // 设置坐标系栅格样式
            line: null
        });
            chart.axis('value',{ // 设置坐标系栅格样式
            grid: {
            type: 'polygon' //圆形栅格，可以改成
        }
        });
            chart.line().position('item*value').color('obj');
            chart.point().position('item*value').color('obj').shape('circle');
            chart.area().position('item*value').color('obj');
            chart.render();

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
                    <h2><Icon type="line-chart" />&nbsp;统计</h2>
                    <ul className="navUl">
                        <li className="selected" onClick={this.toStatistics}>统计</li>
                        {/*<li className="" onClick={this.toFile}>概览</li>*/}
                    </ul>
                </nav>
                <div className="missionList chartContainer" style={{padding: '10px' }}>
                    <Row>
                        <Col span="11">
                            <Card bordered={false}>
                                <div id="yuan"></div>
                                <div className="tongjiBody">
                                    <h5>项目进度</h5>
                                    <div className="process">
                                        <a>已完成 <span className="finish">{this.state.finish}</span></a>
                                        <a>未完成 <span className="notyet">{this.state.notYet}</span></a>
                                        <a>总任务 <span className="total">{this.state.total}</span></a>
                                        <a>完成进度 <span className="delay">{this.state.precent}</span></a>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col span="11">
                            <Card bordered={false}>
                                <div id="relation"></div>
                                <div className="tongjiBody">
                                    <h5>任务三角</h5>
                                    <span>任务三角越往右，越大则代表任务完成的越好，完成任务量越多。</span>
                                    <span>你可以通过多完善任务，多添加备注来调整你的三角状况。</span>
                                    <span>工作再累也要记得喝水哟～</span>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <div ref="pieChart" id="chart">
                        <Row>
                            <Col span="11">
                                <Card  bordered={false}>
                                    <div id="c1"></div>
                                    <div className="tongjiBody">
                                        <h5>小组统计</h5>
                                        <span>小组成员任务完成情况统计</span>
                                    </div>
                                </Card>
                            </Col>
                            <Col span="11">
                                <Card  bordered={false}>
                                    <div id="c2"></div>
                                    <div className="tongjiBody">
                                        <h5>最近趋势（前七天）</h5>
                                        <span>{localStorage.getItem("name")}最近一周内完成任务情况统计</span>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    };
}