import React, { Component } from 'react';
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/bar');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

export class PieReact extends React.Component {

    constructor(props) {
        super(props);
        this.setPieOption = this.setPieOption.bind(this);
        this.initPie = this.initPie.bind(this);
    }

    initPie() {
        const { data } = this.props ;//外部传入的data数据
        let myChart = echarts.init(document.getElementById('chart')) ;//初始化echarts
        myChart.setOption({
            title: { text: 'ECharts 入门示例' },
            tooltip: {},
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
        //我们要定义一个setPieOption函数将data传入option里面
        // let options = this.setPieOption(data);
        // console.log(options);
        // //设置options
        // myChart.setOption(options);
    }

    componentDidMount() {
        this.initPie();
    }

    componentDidUpdate() {
        this.initPie();
    }

    render() {
        return (
            <div className="pie-react">
                <div ref="pieReact" style={{width: "1000px", height: "200px"}}></div>
            </div>
        )
    }

    //一个基本的echarts图表配置函数
    setPieOption(data) {
        return {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {
                data: [5, 20, 36, 10, 10, 20]
            },
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        }
    }
}