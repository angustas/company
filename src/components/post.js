/**
 * Created by wuping on 2017/4/9.
 */
import React, { Component } from 'react';
import $ from 'jquery';
require('es6-promise').polyfill();
require('isomorphic-fetch');
import { message } from 'antd';
export default class PostApi extends Component {
    constructor(props) {
        super(props);
        this.onSuccess = this.onSuccess.bind(this);
        this.errormessage = this.errormessage.bind(this);
        this.postApi = this.postApi.bind(this);
    };
    getInitialState() {
        return {
            username: '',
            lastGistUrl: ''
        };
    };
    componentDidMount(data) {
        this.postApi(data);
    };
    errormessage(msg){
        message.error(msg);
    };
    success(msg){
        message.success(msg);
    };
    postApi(data){
        if(data){
            fetch(data.url,
                {
                    method: data.method,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                })
                .then(function(response) {
                    if (response.status >= 400) {
                        throw new Error("Bad response from server");
                    }
                    return response.json();
                })
                .then(function(stories) {
                    if(stories.status=="OK"){
                        console.log("success");
                        this.success("success");
                    }else if(stories.status=="ERROR"){
                        console.log("error");
                        this.errormessage("error");
                    }
                });
        }

    }

}