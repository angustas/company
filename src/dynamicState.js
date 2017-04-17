import React, { Component } from 'react';
import Sidebar from './common/sidebar';
import $ from 'jquery';
import { Icon,Card,Popover} from 'antd';
import { hashHistory } from 'react-router';
export default class DynamicState extends Component {
    constructor(props) {
        super(props);
        this.state = {display: "none",visible: false};

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
    render() {
        const content = (
            <div>
                <p>部门：后市场</p>
                <p>职位：前端工程师</p>
                <p>手机：18945073710</p>
            </div>
        );
        return (
            <div className="missionContainer">
                <Sidebar target="index"/>
                <nav className="missionBoard">
                    <ul className="navUl">
                        <li className="" onClick={this.toWorkBoard}>任务</li>
                        <li className="" onClick={this.toDaily}>日历</li>
                        <li className="selected" onClick={this.toDynamicState}>动态</li>
                    </ul>

                </nav>
                <div className="missionList">
                    <div className="cardContainer">
                        <Card>
                            <Popover content={content} title="张三" trigger="hover">
                                <div className="chargeName">张三</div>
                            </Popover>
                            <div className="detail">
                                <h5>完成了任务</h5>
                                <p>车生活</p>
                                <span className="date">2017.04.16 07:49</span>
                            </div>
                        </Card>
                    </div>
                    <div className="cardContainer">
                        <Card>
                            <Popover content={content} title="张三" trigger="hover" style={{textAlign:'center'}}>
                                <div className="chargeName">张三</div>
                            </Popover>
                            <div className="detail">
                                <h5>更新了任务</h5>
                                <p>组件库</p>
                                <span className="date">2017.04.16 07:49</span>
                            </div>
                        </Card>
                    </div>
                    <div className="cardContainer">
                        <Card>
                            <Popover content={content} title="张三" trigger="hover" style={{textAlign:'center'}}>
                                <div className="chargeName">张三</div>
                            </Popover>
                            <div className="detail">
                                <h5>上传了文件</h5>
                                <p>组件库</p>
                                <span className="date">2017.04.16 07:49</span>
                            </div>
                        </Card>
                    </div>
                    <div className="cardContainer">
                        <Card>
                            <Popover content={content} title="张三" trigger="hover" style={{textAlign:'center'}}>
                                <div className="chargeName">张三</div>
                            </Popover>
                            <div className="detail">
                                <h5>上传了文件</h5>
                                <p>组件库</p>
                                <span className="date">2017.04.15 08:49</span>
                            </div>
                        </Card>
                    </div>
                </div>


            </div>
        );
    };
}