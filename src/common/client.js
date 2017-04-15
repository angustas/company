/**
 * Created by wuping on 2017/4/15.
 */
import $ from 'jquery';

/**
 * 发送API请求
 * @param url       api地址
 * @param param     请求参数
 * @param callback  结果回调，回调参数为(code, msg, data)
 */
function makeAjaxRequest(method,url,param,callback){
    var onSuccess = function (resp) {
        callback(parseInt(resp.code), resp.msg, resp.data);
    };
    var onError = function () {
        console.error('API[' + url + ']请求异常:', arguments);
        callback(-1, '系统繁忙，请稍后重试');
    };
    return $.ajax({
        type: method,
        url: url,
        data: param,
        dataType: 'json',
        success: onSuccess,
        error: onError
    });
}
export function postApi(url, param, callback) {
    makeAjaxRequest("POST",url,param,callback);
}
export function getApi(url,param,callback){
    makeAjaxRequest("GET",url,param,callback);
}