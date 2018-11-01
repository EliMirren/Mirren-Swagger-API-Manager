/**
 * Created by Mirren on 2018/10/25.
 */
/**数据类型array*/
const TYPE_ARRAY = 'array';
/**数据类型object*/
const TYPE_OBJECT = 'object';

/**
 * 获取添加到请求参数表格的html
 * @returns {string}
 */
function getRequestParameterTableHtml() {
    var html = '<tr>';
    html += '<td><select class="form-control"><option value="true">是</option><option value="false">否</option></select></td>';
    html += '<td>' + getParameterInSelectOptionHtml() + '</td>';
    html += '<td>' + getParameterTypeSelectOptionHtml() + '</td>';
    html += '<td><input type="text" class="form-control"  placeholder="请输入参数的名字"></td>';
    html += '<td><input type="text" class="form-control"  placeholder="请输入参数的描述"></td>';
    var id = ("edit_" + Date.parse(new Date()) + "_" + Math.random()).replace(".", "");
    html += '<td><span class="btn btn-link" onclick="showParameterSetModel(this)" id="' + id + '">编辑</span></td>';
    html += '<td><span class="btn btn-link" onclick="removeParentParent(this)">移除</span></td>';
    html += '</tr>';
    return html;
}

/**
 * 删除响应参数中的tr
 * @param obj
 */
function removeResponseTr(obj) {
    if (confirm('确定删除该参数吗?')) {
        var selftr = $(obj).parent().parent();
        var nexttr = $(obj).parent().parent().next();
        var type = selftr.children()[0].children[0].value;
        if (type == TYPE_ARRAY || type == TYPE_OBJECT) {
            if (nexttr.children()[0].children[0] == null) {
                nexttr.remove();
            }
        }
        selftr.remove();
    }
}

/**
 * 获取添加返回结果的参数表格的html
 * @returns {string}
 */
function getResponseParameterTableHtml(typeValue, name, description, items) {
    var nameValue = name == null ? "" : "value='" + name + "'";
    var descValue = description == null ? "" : "value='" + description + "'";
    var html = '<tr>';
    html += '<td>' + getParameterTypeSelectOptionHtml(typeValue) + '</td>';
    html += '<td><input type="text" class="form-control" ' + nameValue + '  placeholder="请输入参数的名字"></td>';
    html += '<td><input type="text" class="form-control" ' + descValue + '  placeholder="请输入参数的描述"></td>';
    html += '<td class="text-center"><span class="btn btn-link" onclick="removeResponseTr(this)">移除</span></td>';
    html += '</tr>';
    if ((typeValue == TYPE_ARRAY || typeValue == TYPE_OBJECT )) {
        //添加子属性
        var id = ("resp_param_add_" + Date.parse(new Date()) + "_" + Math.random()).replace(".", "");
        html += '<tr><td></td><td colspan="3">' +
            '<div class="table-responsive">' +
            '<table class="table table-bordered mb5px">' +
            '<thead>' +
            '<tr>' +
            '<th>参数类型</th>' +
            '<th>参数名称</th>' +
            '<th>参数描述</th>' +
            '<th class="text-center">操作</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody id="' + id + '">';
        if (items == null) {
            items = [];
        }
        for (var i = 0; i < items.length; i++) {
            html += getResponseParameterTableHtml(items[i].type, items[i].name, items[i].description);
        }
        html += '</tbody>' +
            '</table>' +
            '</div>' +
            '<button class="pull-right btn-sm btn btn-default"  onclick="addParamterToTableBody(\'' + id + '\',getResponseParameterTableHtml())">添加</button>';
        html += '</td></tr>';
    }
    return html;
}
/**
 * 获得响应结果的html
 * @returns {string}
 */
function getResponseHtml() {
    var id = ("response_tablebody_" + Date.parse(new Date()) + "_" + Math.random()).replace(".", "");
    var html = '<div class="mb10px border1-radius5-pading3 border1px-solid-ccc">' +
        '<input type="text" class="form-control mb3px" placeholder="状态的基本描述,必填">' +
        '<textarea class="form-control  mb3px" rows="3" placeholder="参数的基本描述"></textarea>' +
        '<div class="table-responsive">' +
        '<table class="table table-bordered mb5px">' +
        '<thead>' +
        '<tr>' +
        '<th>参数类型</th>' +
        '<th>参数名称</th>' +
        '<th>参数描述</th>' +
        '<th class="text-center">操作</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody id="' + id + '">' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '<button class="pull-right btn-sm btn btn-default mb5px"  onclick="addResponseParameterToResponseTableShow(\'' + id + '\')">添加参数</button>' +
        '<div class="clearfix"></div>' +
        '</div>';

    return html;
}


/**
 * 添加参数到table的body中
 * @param tableBodyId tableBodyId 想添加到哪一个table中(table 或 tbody 的id)
 * @param html 要添加的内容 (<tr>....</tr>)
 */
function addParamterToTableBody(tableBodyId, html) {
    $("#" + tableBodyId).append($(html));
}

/**
 * 获得请求参数编辑要求要显示的内容
 * @param type 参数的类型
 * @param data 现有的
 * @returns {string}
 */
function getParameterSetModelHtml(type, data) {
    // 标记数据是否不为空
    var dataIsNotNull = true;
    if (data == null) {
        data = {};
        dataIsNotNull = false;
    }
    var format = data.format == null ? null : data.format;
    var items = data.items == null ? null : data.items;
    var min = data.min == null ? null : data.min;
    var max = data.max == null ? null : data.max;
    var _enum = data._enum == null ? null : data._enum;
    var _default = data._default == null ? null : data._default;
    var pattern = data.pattern == null ? null : data.pattern;

    //静态框的body begin
    var html = '<div class="form-horizontal">';
    if (type == 'string' || type == TYPE_OBJECT || type == TYPE_ARRAY) {
        //格式类型 begin
        html += '<div class="form-group">' +
            '<label for="api_parameter_attribute_format" class="col-sm-2 control-label">类型格式:</label>' +
            '<div class="col-sm-10">' +
            '<select class="form-control" id="api_parameter_attribute_format" onchange="parameterAttributeFormatChange(this[selectedIndex].value)">';
        if (dataIsNotNull && format != null) {
            html += '<option value="' + format + '">' + format + '</option>';
        } else if (type == TYPE_OBJECT || type == TYPE_ARRAY) {
            format = type;
            html += '<option value="' + type + '">' + type + '</option>';
        } else {
            html += '<option value="">请选择格式类型</option>';
        }
        html += '<option value="object">object</option>' +
            '<option value="array">array</option>' +
            '<option value="email">email</option>' +
            '<option value="password">password</option>' +
            '<option value="int32">int32</option>' +
            '<option value="int64">int64</option>' +
            '<option value="float">float</option>' +
            '<option value="double">double</option>' +
            '<option value="uuid">uuid</option>' +
            '<option value="byte">byte</option>' +
            '<option value="date">date</option>' +
            '<option value="date-time">date-time</option>' +
            '<option value="binary">binary</option>' +
            '</select>' +
            '</div>' +
            '</div>';
        //格式类型 end
    }
    //属性说明 begin
    var hideAttribute = true;
    if ((type == TYPE_OBJECT || type == TYPE_ARRAY) || ( type == "string" && (format == TYPE_OBJECT || format == TYPE_ARRAY))) {
        hideAttribute = false;
    }
    html += '<div class="form-group ' + (hideAttribute == true ? "display-none" : "") + '" id="parameter_attribute_items">' +
        '<label for="api_parameters_attribute_table" class="col-sm-2 control-label">属性说明:</label>' +
        '<div class="col-sm-10">' +
        '<div class="table-responsive">' +
        '<table class="table table-bordered">' +
        '<thead>' +
        '<tr>' +
        '<th>参数类型</th>' +
        '<th>参数名称</th>' +
        '<th>参数描述</th>' +
        '<th>操作</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody id="api_parameters_attribute_table">';
    if (!hideAttribute && items != null && items.length > 0) {
        for (var i = 0; i < items.length; i++) {
            html += getParameterAttributeTableHtml(items[i].type, items[i].name, items[i].description);
        }
    }
    html += '</tbody></table>' +
        '</div>' +
        '<button class="btn btn-success btn-sm pull-right" onclick="addParamterToTableBody(\'api_parameters_attribute_table\',getParameterAttributeTableHtml())">' +
        '添加属性' +
        '</button>' +
        '</div>' +
        '</div>';
    //属性说明 end

    //默认值 begin
    var defaultValue = _default == null ? "" : "value='" + _default + "' ";
    html += '<div class="form-group">' +
        '<label for="api_parameter_attribute_default" class="col-sm-2 control-label">默认值:</label>' +
        '<div class="col-sm-10">' +
        '<input type="text" class="form-control "' + defaultValue + ' id="api_parameter_attribute_default" placeholder="请输入默认值">' +
        '</div>' +
        '</div>';
    //默认值 end

    //枚举值 begin
    var enumValue = _enum == null ? "" : "value='" + _enum + "' ";
    html += '<div class="form-group ">' +
        '<label for="api_parameter_attribute_enum" class="col-sm-2 control-label">枚举值:</label>' +
        '<div class="col-sm-10">' +
        '<input type="text" class="form-control " ' + enumValue + ' id="api_parameter_attribute_enum" placeholder="请输入枚举值,多个值以英文,号隔开">' +
        '</div>' +
        '</div>';
    //枚举值 end

    var hideMinMaxPat = false;
    if ((type == TYPE_OBJECT || type == TYPE_ARRAY) && ( format == TYPE_OBJECT || format == TYPE_ARRAY)) {
        hideMinMaxPat = true;
    }
    //大小要求 begin
    var minValue = min == null ? "" : "value='" + min + "'";
    var maxValue = max == null ? "" : "value='" + max + "'";
    html += '<div class="form-group  ' + (hideMinMaxPat == true ? "display-none" : "") + '" id="api-parameter-attribute-size">' +
        '<label class="col-sm-2 control-label">大小要求:</label>' +
        '<div class="col-sm-10">' +
        '<input type="number" class="form-control inline-block width-40per" ' + minValue + ' id="api_parameter_attribute_min" placeholder="数值最小值,或字符串最小长度">' +
        '<input type="number" class="form-control  inline-block width-40per mleft10px" ' + maxValue + ' id="api_parameter_attribute_max" placeholder="数值最大值,或字符串最大长度">' +
        '</div>' +
        '</div>';
    //大小要求end
    var patternValue = pattern == null ? "" : pattern;
    //正则表达式 begin
    html += '<div class="form-group ' + (hideMinMaxPat == true ? "display-none" : "") + '" id="api-parameter-attribute-pattern-box">' +
        '<label class="col-sm-2 control-label">正则表达式:</label>' +
        '<div class="col-sm-10">' +
        '<textarea class="form-control " id="api_parameter_attribute_pattern" rows="3" placeholder="请输入正则表达式">' + patternValue + '</textarea>' +
        '</div>' +
        '</div>';
    //正则表达式 end

    html += '</div>';
    //静态框的body end
    return html;
}

/**
 * 显示编辑更多参数的model
 * @param obj
 */
function showParameterSetModel(obj) {
    //获取数据类型
    var type = $($(obj).parent().parent().children()[2]).children().val();
    var data = $(obj).attr('data');
    var id = $(obj).attr('id');
    if (IS_DEBUG_ENABLED) {
        console.log("编辑更多参数type & data & id");
        console.log(type);
        console.log(data);
        console.log(id);
    }

    var html = getParameterSetModelHtml(type, (data == null ? null : JSON.parse(data)));
    $("#request-parameter-set-modal-body").html($(html));
    document.getElementById("request-parameter-set-modal-confirm").onclick = function () {
        confirmParamterSetModel(id);
    };
    $('#request-parameter-set-modal').modal('show');
}
/**
 * 编辑更多参数的确定事件
 * @param paramId 所属参数的id
 */
function confirmParamterSetModel(paramId) {
    var data = {};
    var format = $("#api_parameter_attribute_format").val();
    if (format != '') {
        data.format = format;
        if (format == TYPE_ARRAY || format == TYPE_OBJECT) {
            var trs = $("#api_parameters_attribute_table").children();
            if (trs.length > 0) {
                var item = [];
                for (var i = 0; i < trs.length; i++) {
                    var it = {};
                    it.type = trs[i].children[0].children[0].value;
                    it.name = trs[i].children[1].children[0].value;
                    it.description = trs[i].children[2].children[0].value;
                    item.push(it);
                }
                data.items = item;
            }
        }
    }
    var _default = $("#api_parameter_attribute_default").val();
    if (_default != '') {
        data._default = _default;
    }
    var _enum = $("#api_parameter_attribute_enum").val();
    if (_enum != '') {
        data._enum = _enum;
    }
    var min = $("#api_parameter_attribute_min").val();
    if (min != '' && (format != TYPE_ARRAY || format != TYPE_OBJECT)) {
        data.min = min;
    }
    var max = $("#api_parameter_attribute_max").val();
    if (max != '' && (format != TYPE_ARRAY || format != TYPE_OBJECT)) {
        data.max = max;
    }
    var pattern = $("#api_parameter_attribute_pattern").val();
    if (pattern != '' && ( format != TYPE_ARRAY || format != TYPE_OBJECT)) {
        data.pattern = pattern;
    }


    $("#" + paramId).attr("data", JSON.stringify(data));
    if (IS_DEBUG_ENABLED) {
        console.log('编辑更多属性的结果:');
        console.log(data);
    }
    $('#request-parameter-set-modal').modal('hide');
}


/**
 * 返回更多参数的添加参数到表格的html
 * @param typeValue 属性类型的值
 * @param name 属性名字
 * @param desc 属性的描述
 * @returns {string}
 */
function getParameterAttributeTableHtml(typeValue, name, desc) {
    var html = '<tr>';
    if (typeValue == null) {
        html += '<td>' + getParameterTypeSelectOptionHtml() + '</td>';
    } else {
        html += '<td>' + getParameterTypeSelectOptionHtml(typeValue) + '</td>';
    }
    var nameValue = name == null ? "" : "value='" + name + "'";
    var descValue = desc == null ? "" : "value='" + desc + "'";
    html += '<td><input type="text" class="form-control" ' + nameValue + ' placeholder="请输入属性的名称"></td>';
    html += '<td><input type="text" class="form-control" ' + descValue + ' placeholder="请输入属性的描述"></td>';
    html += '<td><span class="btn btn-link" onclick="removeParentParent(this)">移除</span></td>';
    html += '</tr>';
    return html;
}
/**
 * 添加响应
 */
function addResponse() {
    var html = getResponseHtml();
    $("#response-parameters").append($(html));
}

/**
 * 选择格式化类型后的改变事件
 * @param value
 */
function parameterAttributeFormatChange(value) {
    if (IS_DEBUG_ENABLED) {
        console.log("format 选中结果: " + value)
    }
    if (value == TYPE_ARRAY || value == TYPE_OBJECT) {
        $("#parameter_attribute_items").show();
        $("#api-parameter-attribute-size").hide();
        $("#api-parameter-attribute-pattern-box").hide();
    } else {
        $("#parameter_attribute_items").hide();
        $("#api-parameter-attribute-size").show();
        $("#api-parameter-attribute-pattern-box").show();
    }
}
/**
 * 显示或者隐藏返回参数的二级参数
 * @param value
 */
function responseResponseAttribiteTypeChange(value) {
    console.log(value);
    if (value == TYPE_ARRAY || value == TYPE_OBJECT) {
        $("#api_response_attribute_table_box").show();
    } else {
        $("#api_response_attribute_table_box").hide();
    }
}


/**
 * 显示添加响应参数的
 */
function addResponseParameterToResponseTableShow(id) {
    var type = $("#response-parameter-set-modal_type").val();
    responseResponseAttribiteTypeChange(type);
    $("#hide-add-to-response-parmeter-table-body").val(id);
    $("#response-parameter-set-modal").modal('show');
}


/**
 * 添加参数到响应参数的
 * @param close true等于关闭modal,其他不关闭modal
 */
function addResponseParameterToResponseTable(close) {
    var name = $("#response-parameter-set-modal_name").val();
    var type = $("#response-parameter-set-modal_type").val();
    var desc = $("#response-parameter-set-modal_description").val();
    var items;
    var trs = $("#response-parameter-set-modal_table").children();
    if (trs.length > 0) {
        items = [];
        for (var i = 0; i < trs.length; i++) {
            var it = {};
            it.type = trs[i].children[0].children[0].value;
            it.name = trs[i].children[1].children[0].value;
            it.description = trs[i].children[2].children[0].value;
            items.push(it);
        }
    }
    if (IS_DEBUG_ENABLED) {
        console.log("添加响应参数: name & type & description & items");
        console.log(name);
        console.log(type);
        console.log(desc);
        console.log(items);
    }
    var html = getResponseParameterTableHtml(type, name, desc, items);
    var id = $("#hide-add-to-response-parmeter-table-body").val();
    addParamterToTableBody(id, html);
    if (close == true) {
        $("#response-parameter-set-modal").modal('hide');
    }
}
/**
 * 添加附加说明
 * @param title
 * @param description
 */
function addAdditionalInstructions(title, description) {
    var tValue = title == null ? "" : "value='" + title + "'";
    var cValue = description == null ? "" : description;
    var html = '<div class="border1px-solid-ccc border1-radius5-pading3 mb5px">' +
        '<input type="text" class="form-control mb3px" ' + tValue + ' placeholder="附加说明标题">' +
        '<textarea class="form-control  mb3px" rows="3" placeholder="附加说明描述">' + cValue + '</textarea>' +
        '<button class="btn btn-link pull-right" onclick="removeParent(this)">移除</button>' +
        '<div class="clearfix"></div>' +
        '</div>';
    $("#api-additional-instructions").append($(html));
}
/**
 * 获取API的基本信息(该方法合适新建用,其他操作需要添加而外的属性)
 * @returns {{}}
 */
function getApiInfo() {
    var groupId = $("#hide_api_group_id").val();
    if (groupId == null || groupId == '') {
        alert('无法获取分组的id请检,需要通过项目详情的接口分组中进入该页面');
        return;
    }
    var path = $("#api_path").val();
    var summary = $("#api_summary").val();
    if (path == '' || summary == '') {
        alert('path与简介不能为空');
        return;
    }
    if ('/' != path.charAt(0)) {
        path = "/" + path;
    }
    var method = $("#api_method").val();
    var data = {};
    data.groupId = groupId;
    data.method = method;
    data.path = path;
    data.summary = summary;
    var api_description = $("#api_description").val();
    if (api_description != '') {
        data.description = api_description;
    }
    var api_consumes = $("#api_consumes").val();
    if (api_consumes != '') {
        var item = api_consumes.replace("，", ",").split(",");
        var cns = [];
        for (var i = 0; i < item.length; i++) {
            if (item[i] != '') {
                cns.push(item[i].trim());
            }
        }
        if (cns.length > 0) {
            data.consumes = JSON.stringify(cns);
        }
    }
    var api_produces = $("#api_produces").val();
    if (api_produces != '') {
        var item = api_produces.replace("，", ",").split(",");
        var cns = [];
        for (var i = 0; i < item.length; i++) {
            if (item[i] != '') {
                cns.push(item[i].trim());
            }
        }
        if (cns.length > 0) {
            data.produces = JSON.stringify(cns);
        }
    }
    //请求参数 begin
    var paramTRs = $("#api_parameters_table").children();
    if (paramTRs.length > 0) {
        var item = [];
        for (var i = 0; i < paramTRs.length; i++) {
            var it = {};
            it.required = paramTRs[i].children[0].children[0].value;
            it.in = paramTRs[i].children[1].children[0].value;
            it.type = paramTRs[i].children[2].children[0].value;
            it.name = paramTRs[i].children[3].children[0].value;
            it.description = paramTRs[i].children[4].children[0].value;
            var attr = $(paramTRs[i].children[5].children[0]).attr("data");
            var more = {};
            if (attr != null && attr != '') {
                more = JSON.parse(attr);
            }
            var ve = {};//parameters的拓展属性
            if (more.format != null && more.format != '') {
                it.format = more.format;
                if (more.format == TYPE_ARRAY || more.format == TYPE_OBJECT) {
                    var more_items = more.items;
                    var items = [];
                    for (var m = 0; m < more_items.length; m++) {
                        if (more_items[m].name != null) {
                            var mip = {};
                            mip.type = more_items[m].type;
                            mip.name = more_items[m].name;
                            mip.description = more_items[m].description;
                            items.push(mip);
                        }
                    }
                    if (items.length > 0) {
                        ve.items = items;
                    }
                }
            }
            if (more._default != null) {
                it.default = more._default;
            }
            if (more.format != TYPE_ARRAY || more.format != TYPE_OBJECT) {
                if (more.max != null) {
                    ve.max = more.max;
                }
                if (more.min != null) {
                    ve.min = more.min;
                }
            }
            if (more._enum != null) {
                var enums = more._enum.replace("，", ",").split(",");
                var ems = [];
                for (var emi = 0; emi < enums.length; emi++) {
                    if (enums[emi] != '') {
                        ems.push(enums[emi].trim());
                    }
                }
                if (ems.length > 0) {
                    it.enum = JSON.stringify(ems);
                }
            }
            if (more.pattern != null) {
                it.pattern = more.pattern;
            }

            if (!jQuery.isEmptyObject(ve)) {
                it.vendorExtensions = ve;
            }
            item.push(it);
        }
        if (item.length > 0) {
            data.parameters = JSON.stringify(item);
        }
    }
    //请求参数 end

    //响应结果 begin
    var respDivs = $("#response-parameters").children();
    var responses = [];
    for (var rp = 0; rp < respDivs.length; rp++) {
        var div = respDivs[rp];
        var status = div.children[0].value;
        console.log(status);

        if (status == '') {
            continue;
        }
        console.log(status == '')

        var description = div.children[1].value;
        var trs = div.children[2].children[0].children[1].children;
        var items = [];
        for (var t = 0; t < trs.length; t++) {
            var name = trs[t].children[1].children[0].value;
            if (name != null && name != '') {
                var item = {};
                var type = trs[t].children[0].children[0].value;
                var desc = trs[t].children[2].children[0].value;
                item.type = type;
                item.name = name;
                item.description = desc;
                if (type == TYPE_ARRAY || type == TYPE_OBJECT) {
                    t = t + 1;
                    var c_trs = trs[t].children[1].children[0].children[0].children[1].children;
                    var c_items = [];
                    for (var ct = 0; ct < c_trs.length; ct++) {
                        var c_name = c_trs[ct].children[1].children[0].value;
                        if (c_name != '') {
                            var c_item = {};
                            var c_type = c_trs[ct].children[0].children[0].value;
                            var c_desc = c_trs[ct].children[2].children[0].value;
                            c_item.type = c_type;
                            c_item.name = c_name;
                            c_item.description = c_desc;
                            c_items.push(c_item);
                        }
                    }
                    if (c_items.length > 0) {
                        item.items = c_items;
                    }
                }
                items.push(item);
            }
        }
        var resp = {};
        resp.statusCode = status;
        resp.description = description;
        if (items.length > 0) {
            var ve = {};
            ve.parameters = JSON.stringify(items);
            resp.vendorExtensions = JSON.stringify(ve);
        }
        responses.push(resp);
    }
    if (responses.length > 0) {
        data.responses = JSON.stringify(responses);
    }
    //响应结果 end

    //附加说明 begin
    var additionalDivs = $("#api-additional-instructions").children();
    var additionals = [];
    for (var ad = 0; ad < additionalDivs.length; ad++) {
        var div = additionalDivs[ad];
        var title = div.children[0].value;
        var desc = div.children[1].value;
        if (desc != '') {
            var additional = {};
            additional.title = title;
            additional.description = desc;
            additionals.push(additional);
        }
    }
    if (additionals.length > 0) {
        var ve = {};
        ve.additionalInstructions = JSON.stringify(additionals);
        data.vendorExtensions = JSON.stringify(ve);
    }
    //附加说明 end
    return data;
}

/**
 * 加载接口要修改的信息
 * @param aid
 */
function loadApiUpdateInfo(aid) {
    $(".load-api-tips").show();
    doAJAX(METHOD_GET, 'http://localhost:8686/api/' + aid, null, function (result) {
        if (result.code == 200) {
            $(".load-api-tips").hide();
            console.log('获取接口数据成功');
            var data = result.data;
            console.log(data);
            $("#api_method option[value='" + data.method + "'").attr("selected", true);
            $("#api_deprecated option[value='" + data.deprecated + "'").attr("selected", true);
            $("#api_path").val(data.path);
            $("#api_summary").val(data.summary);
            if (data.description != null) {
                $("#api_description").val(data.description);
            }
            if (data.consumes != null) {
                var consumes = JSON.parse(data.consumes);
                $("#api_consumes").val(consumes.join(','));
            }
            if (data.produces != null) {
                var produces = JSON.parse(data.produces);
                $("#api_produces").val(produces.join(','));
            }
            if (data.parameters != null) {
                var parm = JSON.parse(data.parameters);
                for (var p = 0; p < parm.length; p++) {
                    var required = parm[p].required;
                    var html = '<tr>';
                    html += '<td>' + getSelectTureOrFalse(required, (required ? '是' : '否')) + '</td>';
                    html += '<td>' + getParameterInSelectOptionHtml(parm[p].in) + '</td>';
                    html += '<td>' + getParameterTypeSelectOptionHtml(parm[p].type) + '</td>';
                    html += '<td><input type="text" value="' + parm[p].name + '" class="form-control"  placeholder="请输入参数的名字"></td>';
                    html += '<td><input type="text" value="' + parm[p].description + '" class="form-control"  placeholder="请输入参数的描述"></td>';
                    var id = ("edit_" + Date.parse(new Date()) + "_" + Math.random()).replace(".", "");
                    var attr = {};

                    if (parm[p].format != null) {
                        attr.format = parm[p].format;
                    }
                    if (parm[p].default != null) {
                        attr._default = parm[p].default;
                    }
                    if (parm[p].enum != null) {
                        attr._enum = JSON.parse(parm[p].enum).join(",");
                    }
                    if (parm[p].pattern != null) {
                        attr.pattern = parm[p].pattern;
                    }
                    if (parm[p].vendorExtensions != null) {
                        var ve = parm[p].vendorExtensions;
                        if (ve.min != null) {
                            attr.min = ve.min;
                        }
                        if (ve.max != null) {
                            attr.max = ve.max;
                        }
                        if (ve.items != null) {
                            attr.items = ve.items;
                        }
                    }
                    html += '<td><span class="btn btn-link" onclick="showParameterSetModel(this)" id="' + id + '" data=\'' + JSON.stringify(attr) + '\'>编辑</span></td>';
                    html += '<td><span class="btn btn-link" onclick="removeParentParent(this)">移除</span></td>';
                    html += '</tr>';
                    $("#api_parameters_table").append($(html));
                }
            }

            if (data.responses != null) {
                console.log(data.responses);
                var resp = JSON.parse(data.responses);
                for (var r = 0; r < resp.length; r++) {
                    var id = ("response_tablebody_" + Date.parse(new Date()) + "_" + Math.random()).replace(".", "");
                    var html = '<div class="mb10px border1-radius5-pading3 border1px-solid-ccc">' +
                        '<input type="text" value="' + resp[r].statusCode + '" class="form-control mb3px" placeholder="状态的基本描述">' +
                        '<textarea class="form-control  mb3px" rows="3" placeholder="参数的基本描述">' + resp[r].description + '</textarea>' +
                        '<div class="table-responsive">' +
                        '<table class="table table-bordered mb5px">' +
                        '<thead>' +
                        '<tr>' +
                        '<th>参数类型</th>' +
                        '<th>参数名称</th>' +
                        '<th>参数描述</th>' +
                        '<th class="text-center">操作</th>' +
                        '</tr>' +
                        '</thead>' +
                        '<tbody id="' + id + '">';
                    if (resp[r].vendorExtensions != null) {
                        if (JSON.parse(resp[r].vendorExtensions).parameters != null) {
                            var ve = JSON.parse(JSON.parse(resp[r].vendorExtensions).parameters);
                            for (var v = 0; v < ve.length; v++) {
                                html += getResponseParameterTableHtml(ve[v].type, ve[v].name, ve[v].description, ve[v].items);
                            }
                        }
                    }
                    html += '</tbody>' +
                        '</table>' +
                        '</div>' +
                        '<button class="pull-right btn-sm btn btn-default mb5px"  onclick="addResponseParameterToResponseTableShow(\'' + id + '\')">添加参数</button>' +
                        '<div class="clearfix"></div>' +
                        '</div>';
                    $("#response-parameters").append($(html));
                }
            }

            if (data.vendorExtensions != null) {
                var ve = JSON.parse(data.vendorExtensions);
                if (ve.additionalInstructions != null) {
                    var ais = JSON.parse(ve.additionalInstructions);
                    for (var a = 0; a < ais.length; a++) {
                        addAdditionalInstructions(ais[a].title, ais[a].description);
                    }
                }
            }

        } else {
            $("#load-api-tips-text").text("数据加载失败!!!");
            console.log("msg:" + result.msg + " ,data:");
            console.log(result.data);
            confirm("获取接口数据失败!!!!!!");
        }
    }, function (e) {
        $("#load-api-tips-text").text("数据加载失败!!!");
        console.log("获取接口数据失败...");
        console.log(e);
        var state = e.readyState;
        if (state == 0) {
            confirm('获取接口数据需要先启动服务器,请在当前目录双击start.bat');
        }
    });
}

