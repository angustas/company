/**
 * Created by wuping on 2017/4/15.
 */
import React ,{Component}from 'react';
import * as client from 'common/client';
import Antd from 'antd';
const INSTANCES = [];
/**
 * 组件标准化, 所有组件都必须继承此类。
 * 标准化主要包括:
 *  1. 模块统一管理, 子类必须将自身注册入MODULES中.
 *  2. 通用功能标准化, 封装了加载动画、提示消息、弹窗、网络请求等公共功能.
 *  3. 待续...
 */
export default class Component extends Component {

    props = {};

    constructor() {
        super();
        INSTANCES.push(this);
    }

    componentWillUnmount() {
        var index = INSTANCES.indexOf(this);
        delete INSTANCES[index];
    }

    getChildren() {
        var id = this._reactInternalInstance._rootNodeID;
        var result = [];
        INSTANCES.forEach((item)=> {
            var itemId = item._reactInternalInstance._rootNodeID;
            if (itemId.indexOf(id) === 0) {
                result.push(item);
            }
        });
        return result;
    }

    getParent(type) {
        var id = this._reactInternalInstance._rootNodeID;
        var result = [];
        INSTANCES.forEach((item)=> {
            var itemId = item._reactInternalInstance._rootNodeID;
            if (id.indexOf(itemId) === 0) {
                result.push(item);
            }
        });
        if (type) {
            for (var i = 0; i < result.length; i++) {
                if (result[i] instanceof type) {
                    result = result[i];
                    break;
                }
            }
            Array.isArray(result) && (result = null);
        }
        return result;
    }

    postApi(url, params, callback) {
        client.postApi(url, params, (code, msg, data)=> {
            this._filterError(code, msg) && callback(code, msg, data);
        });
    }

    getApi(url, params, callback) {
        //this指向问题
        var that=this;
        client.getApi(url, params, function (code, msg, data) {
            that._filterError(code, msg) && callback(code, msg, data);
        });
    }

    loading() {
        return (<Antd.Spin size="large"/>);
    }

    /**
     * 显示确认对话框
     * @param title     对话框标题
     * @param content   消息内容
     * @param onCancel  取消按钮回调
     * @param onOk      确认按钮回调
     */
    confirm(title, content, onCancel, onOk) {
        Antd.Modal.confirm({title, content, onOk, onCancel});
    }

    /**
     * 显示通知
     * @param type  通知类型:success、info、warning、error
     * @param msg   消息正文
     * @param desc  消息描述
     */
    notify(type, msg, desc) {
        Antd.notification[type]({
            message: msg,
            description: desc
        });
    }

    // 错误过滤, 统一处理预定义已知错误
    _filterError(code, msg) {
        if (Component.ERRORS[code]) {
            var parent = this.getParent(Component.ERRORS[code]);
            parent && parent.onError && parent.onError(code, msg);
        } else {
            return true;
        }
    }

}

// 动态模块映射
Component.MODULES = {};
Component.registerModule = (uri, module)=> {
    if (Component.MODULES.hasOwnProperty(uri)) {
        throw '组件uri重复: ' + uri;
    }
    Component.MODULES[uri] = module;
};

// 错误码映射
Component.ERRORS = {};
Component.registerError = (errcode, module)=> {
    Component.ERRORS[errcode] = module;
};
