import React, { Component } from 'react';
import { message,Carousel } from 'antd';
import { hashHistory } from 'react-router';
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {display: "none"};
        this.successmessage = this.successmessage.bind(this);
        this.errormessage = this.errormessage.bind(this);
    };
    errormessage(msg){
        message.error(msg);
    };
    successmessage(msg){
        message.success(msg);
    };
    toLogin(){
        hashHistory.push('/login');
    };
    toReg(){
        hashHistory.push('/reg');
    };

    render() {
    return (
    <div className="bodyContainer">
        <nav>
            <div className="logo"><a href="localhost:3000/#/index">AURORA OA</a></div>
            <ul className="loginNav">
                <li className="navList" onClick={this.toLogin}>登录</li>
                <li className="navList" onClick={this.toReg}>注册</li>
            </ul>
        </nav>
       <div className="showBody">
           <Carousel autoplay vertical="true">
               <div className="carouselDiv carousel1">
                   <div className="introduce introduce1">
                       <h1>更好用的企业协作平台</h1>
                       <h4>AURORA OA是新一代企业协作平台，专注于提升企业员工的工作效率，从而提升企业竞争力。</h4>
                   </div>
               </div>
               <div className="carouselDiv carousel2">
                   <div className="introduce introduce2">
                       <h1>助力提升您的工作效率</h1>
                       <h4>致力于提高企业成员之间的沟通与协作效率，进而提升企业核心竞争力，包括企业IM、任务、日历、网盘等应用。</h4>
                   </div>
               </div>
               <div className="carouselDiv carousel3">
                   <div className="introduce introduce3">
                       <h1>让每个行业、每个角色都能轻松工作</h1>
                       <h4>正在帮助中国企业提升员工工作效率，提升企业竞争力</h4>
                   </div>
               </div>
               <div className="carouselDiv carousel4">
                   <div className="introduce introduce4">
                       <h1>一站式协作平台</h1>
                       <h5>一站式协作平台，集高效协作、即时沟通和移动办公于一体，提供企业IM、任务管理、日程安排、企业网盘，工作简报等应用，真正提高员工的工作效率。</h5>
                   </div>
               </div>
           </Carousel>
       </div>
    </div>
    );
  };
}