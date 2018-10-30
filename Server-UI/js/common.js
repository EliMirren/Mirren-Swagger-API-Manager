/**
 * Created by Mirren on 2018/10/22.
 */
/**是否处于调试模式*/
const IS_DEBUG_ENABLED = false;

/**请求方法GET*/
const METHOD_GET = "get";
/**请求方法post*/
const METHOD_POST = "post";
/**请求方法put*/
const METHOD_PUT = "put";
/**请求方法delete*/
const METHOD_DELETE = "delete";
/**
 * 执行ajax
 * @param type 请求类似,用常量
 * @param url 数据
 * @param data 数据
 * @param success 成功事件
 * @param error 结果事件
 */
function doAJAX(type, url, data, success, error) {

    $.ajax({
        'type': type,
        'url': url,
        'async': true,
        'data': data,
        'success': success,
        'error': error
    });
}
/**
 * 获取路径参数
 * @returns {*}
 */
function getUrlParams() {
    var url = location.toString();
    var arrUrl = url.split("?");
    var param = arrUrl[1];
    return param;
}

/**
 * 获取指定路径参数
 * @param name
 * @returns {*}
 */
function getUrlParam(name) {
    var url = document.location.toString();
    var arrObj = url.split("?");
    if (arrObj.length > 1) {
        var arrPara = arrObj[1].split("&");
        var arr;
        for (var i = 0; i < arrPara.length; i++) {
            arr = arrPara[i].split("=");
            if (arr != null && arr[0] == name) {
                return arr[1];
            }
        }
        return "";
    }
    else {
        return "";
    }
}
/**
 * 自适应textarea内容高度
 */
function textareaAutoHeight(obj) {
    if (obj != null) {
        $(obj).find('textarea').each(function () {
            this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;');
        })
    } else {
        $('textarea').each(function () {
            this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;');
        })
    }
}
/**
 * 获得select的是或者否
 * @param value option的值
 * @param txt option显示的文字,如果文字为空则value代替
 * @returns {string}
 */
function getSelectTureOrFalse(value,txt) {
    var html = '<select class="form-control">';
    if (value != null) {
        html += '<option value="' + value + '">';
        if (txt != null) {
            html += txt;
        } else {
            html += value;
        }
        html += '</option>';
    }
    if (value != 'true') {
        html += '<option value="true">是</option>';
    }
    if (value != 'false') {
        html += '<option value="false">否</option>';
    }
    html += '</select>';
    return html;
}

/**
 * 获得参数位置的select option 字符串,
 * @param value option的值
 * @param txt option显示的文字,如果文字为空则value代替
 * @returns {string}
 */
function getParameterInSelectOptionHtml(value, txt) {
    var html = '<select class="form-control">';
    if (value != null) {
        html += '<option value="' + value + '">';
        if (txt != null) {
            html += txt;
        } else {
            html += value;
        }
        html += '</option>';
    }
    if (value != 'query') {
        html += '<option value="query">query</option>';
    }
    if (value != 'formData') {
        html += '<option value="formData">formData</option>';
    }
    if (value != 'body') {
        html += '<option value="body">body</option>';
    }
    if (value != 'header') {
        html += '<option value="header">header</option>';
    }
    html += '</select>';
    return html;
}
/**
 * 获得参数的method select option 字符串
 * @param value option的值
 * @param txt option显示的文字,如果文字为空则value代替
 * @returns {string}
 */
function getParameterTypeSelectOptionHtml(value, txt) {
    var html = '<select class="form-control">';
    if (value != null) {
        html += '<option value="' + value + '">';
        if (txt != null) {
            html += txt;
        } else {
            html += value;
        }
        html += '</option>';
    }

    if (value != 'string') {
        html += '<option value="string">string</option>';
    }
    if (value != 'int32') {
        html += '<option value="int32">int32</option>';
    }
    if (value != 'int64') {
        html += '<option value="int64">int64</option>';
    }
    if (value != 'float') {
        html += '<option value="float">float</option>';
    }
    if (value != 'double') {
        html += '<option value="double">double</option>';
    }
    if (value != 'number') {
        html += '<option value="number">number</option>';
    }
    if (value != 'boolean') {
        html += '<option value="boolean">boolean</option>';
    }
    if (value != 'object') {
        html += '<option value="object">object</option>';
    }
    if (value != 'array') {
        html += '<option value="array">array</option>';
    }
    html += '</select>';
    return html;
}
/**
 * 移除obj节点的父节点的父节点
 * @param obj 传对象的this
 */
function removeParent(obj) {
    if (confirm('确定移除该行数据吗?')) {
        $(obj).parent().remove();
    }
}

/**
 * 移除obj节点的父节点的父节点
 * @param obj 传对象的this
 */
function removeParentParent(obj) {
    if (confirm('确定移除该行数据吗?')) {
        $(obj).parent().parent().remove();
    }
}
