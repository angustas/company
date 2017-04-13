import React, { Component } from 'react';
import { Switch } from 'antd';
import { Input } from 'antd';

// ReactDOM.render(<Input placeholder="Basic usage" />, mountNode);
function onChange(checked) {
    console.log(`switch to ${checked}`);
}
export default class App extends Component {
    render() {
    return (
    <div className="loginContainer">
        <nav>
            <div class="logo"><a href="localhost:3000/#/index">AURORA OA</a></div>
            <ul class="navUl">
                <li class="navList">首页</li>
                <li class="navList">关于产品</li>
                <li class="navList">服务</li>
                <li class="navList">联系</li>
                <li class="navList">注册／登陆</li>
            </ul>
        </nav>
      <Switch defaultChecked={true} onChange={onChange} />
      <h1>首页1</h1>
      <Input placeholder="Basic usage" />
    </div>
    );
  };
}