import React, { Component } from 'react';
export default class App extends Component {
    render() {
    console.log('%c%s', 'font-size:20px;color:red', 'Something happened.');
    return (
      <div>测试</div>
    );
  };
}