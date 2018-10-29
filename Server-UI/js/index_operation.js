/**
 * Created by Mirren on 2018/10/19.
 */

/**
 * 显示或者隐藏指定分组
 * @param obj 调用时传入自己,也就是this
 */
function showOrHideApiGroup(obj) {
    var attr = $(obj).attr("data");
    if (attr == 'hide') {
        $(obj).attr("data", 'show');
        $(obj).removeClass('background-right-icon');
        $(obj).addClass('background-down-icon');
        $(obj).next().show();
    } else {
        $(obj).attr("data", 'hide');
        $(obj).removeClass('background-down-icon');
        $(obj).addClass('background-right-icon');
        $(obj).next().hide();
    }
}

/**
 * 显示或隐藏指定接口
 * @param obj 调用时传入自己,也就是this
 */
function showOrHideApiOpblock(obj) {
    var attr = $(obj).attr("data");
    if (attr == 'hide') {
        $(obj).attr("data", 'show');
        $(obj).next().show();
    } else {
        $(obj).attr("data", 'hide');
        $(obj).next().hide();
    }
    textareaAutoHeight($($(obj).parent().parent()));
}
/**
 * 加载项目选中状态
 * @param id
 */
function initProjectActive(id) {
    var lis = $("#project_list").children();
    for (var i = 0; i < lis.length; i++) {
        $(lis[i]).removeClass("active");
    }
    $("#" + id).addClass("active");
}
/**
 * 加载项目信息
 * @param data
 */
function loadProjectInfo(data) {
    if (IS_DEBUG_ENABLED) {
        console.log('project data is:');
        console.log(data);
    }
    $("#hide_project_id").val(data.key);//加载选中项目的id
    var info = JSON.parse(data.info);
    var txt =
        '<h1 class="page-header">' + info.title +
        '<span class="badge"> ' + info.version + '</span>' +
        '<a href="./update.html?pid=' + data.key + '" class="btn btn-ms btn-primary mleft10px">修改</a>' +
        '<span class="btn btn-ms btn-danger mleft10px" onclick="deletProject(\'' + data.key + '\')">删除</span>';
    if (data.vendorExtensions != null) {
        var ve = JSON.parse(data.vendorExtensions);
        if (ve.updateTime != null) {
            txt += '<i class="fond-size-16 mleft10px">修改时间: ' + ve.updateTime + '</i>';
        }
    }
    txt += '</h1>';

    txt += '<h3>主机地址: <span>' + data.host + '</span></h3>';
    if (data.basePath != null) {
        txt += '<h4>Base URL: <span' + data.basePath + '</span></h4>';
    }
    if (data.schemes != null) {
        var schemes = JSON.parse(data.schemes);
        if (schemes.length > 0) {
            txt += "<h3>协议: ";
            $(schemes).each(function (i, value) {
                txt += '<span class="method">' + value + '</span>';
            });
            txt += '</h3>';
        }
    }

    if (info.description != null) {
        txt += '<h3>' + info.description + '</h3>';
    }
    if (data.externalDocs != null) {
        var externalDocs = JSON.parse(data.externalDocs);
        if (!jQuery.isEmptyObject(externalDocs)) {
            txt += '<h4>拓展文档: <a href="' + externalDocs.url + '"><span>' + externalDocs.description + '</span></a></h4>';
        }
    }
    if (info.termsOfService != null) {
        txt += '<h4>服务提供方: <a href="' + info.termsOfService + '">' + info.termsOfService + '</a></h4>';
    }
    if (info.license != null) {
        txt += '<h4>License: <a href="' + info.license.url + '"><span>' + info.license.name + '</span></a></h4>'
    }
    if (info.contact != null) {
        txt += '<h4>' +
            '</i>联系人: <span>' + info.contact.name + '</span>' +
            '<i class="mleft10px"></i><i class="mleft10px"></i>联系方式: <span>' + info.contact.email + '</span>' +
            '<i class="mleft10px"></i><i class="mleft10px"></i>URL: <a href="' + info.contact.url + '">' + info.contact.url + '</a></h4>';
    }
    $("#project_info_body").html($(txt));
    $("#project_info_APIs").show();//加载接口分组信息
    initProjectActive(data.key);
}


/**
 * 加载接口分组与接口文档
 * @param data
 */
function loadApiGroupAndApiOpblack(items) {
    if (IS_DEBUG_ENABLED) {
        console.log('API Group data is :');
        console.log(items);
    }
    if (items.length < 1) {
        $("#project_info_APIs_tips").html("<h3>没有接口分组数据,可以点击上方 新建接口分组 创建分组</h3>");
        return;
    }

    $("#project_info_APIs_tips").html("<h1>接口分组加载中...</h1>");
    $("#project_info_APIs_item").html("");
    for (var it = 0; it < items.length; it++) {
        var data = items[it];
        //panel begin
        var txt = '<div class="panel panel-default">';
        //panel-heading begin
        txt += '<div class="panel-heading cursor-hand background-right-icon" onclick="showOrHideApiGroup(this)" data="show">';
        txt += '<span class="fond-size-26" id="api_group_name_' + data.groupId + '">' + data.name + '</span> ';
        txt += '<span id="api_group_summary_' + data.groupId + '">' + data.summary + '</span>';
        txt += '</div>';
        //panel-heading end
        //panel-body begin
        txt += '<div class="panel-body">';
        txt += '<span id="api_group_externalDocs_' + data.groupId + '" class="fond-size-20">';
        if (data.externalDocs != null) {
            var externalDocs = JSON.parse(data.externalDocs);
            if (!jQuery.isEmptyObject(externalDocs)) {
                txt += '<span>附加文档: <a href="' + externalDocs.url + '" target="_blank">' + externalDocs.description + '</a></span>';
            }
        }
        txt += '</span>';
        if (data.description != null) {
            txt += '<p id="api_group_description_' + data.groupId + '">' + data.description + '</p>';
        }

        //swagger-ui begin
        txt += '<div class="swagger-ui">';
        if (data.apis != null && data.apis.length > 0) {
            var apis = data.apis;
            for (var i = 0; i < apis.length; i++) {
                var opblack = apis[i];
                var method = opblack.method;
                var deprecated = "";
                if (opblack.deprecated == 'true') {
                    deprecated = "__deprecated";
                }
                //opblock begin
                txt += '<div class="opblock opblock-' + method + '">';
                //opblock-summary begin
                txt += '<div class="opblock-summary opblock-summary-' + method + '" onclick="showOrHideApiOpblock(this)" data="hide">';
                txt += '<span class="opblock-summary-method">' + method.toLocaleUpperCase() + '</span>';
                txt += '<span class="opblock-summary-path' + deprecated + '"><span>' + opblack.path + '</span></span>';
                txt += '<div class="opblock-summary-description">' + opblack.summary + '</div>';
                txt += '</div>';
                //opblock-summary end
                //api-opblock-body begin
                txt += '<div class="api-opblock-body display-none">';
                //接口操作 begin
                txt +=
                    '<div class="opblock-section">' +
                    '<div class="opblock-section-header">' +
                    '<a class="btn btn-sm btn-default" href="./updateApi.html?gid=' + data.groupId + '&pid=' + data.projectId + '&aid=' + opblack.operationId + '">修改</a>' +
                    '<span class="btn btn-sm btn-danger mleft10px" onclick="deleteApi(\'' + opblack.operationId + '\')">删除</span>' +
                    '</div>' +
                    '</div>';
                //接口操作 end
                //接口描述 begin
                if (opblack.description != null && opblack.description != '') {
                    txt +=
                        '<div class="opblock-description-wrapper">' +
                        '<div class="opblock-description">' + opblack.description + '</div>' +
                        '</div>';
                }
                //接口描述 end

                //请求参数 begin
                txt +=
                    '<div class="responses-wrapper">' +
                    '<div class="opblock-section-header">' +
                    '<h4><strong>请求参数</strong></h4>';
                if (opblack.consumes != null) {
                    var consumes = JSON.parse(opblack.consumes);
                    txt +=
                        '<label>' +
                        '<span>Consumes:</span>' +
                        '<div class="content-type-wrapper execute-content-type">' +
                        '<select class="content-type">';
                    for (var cs = 0; cs < consumes.length; cs++) {
                        txt += '<option value="' + consumes[cs] + '">' + consumes[cs] + '</option>';
                    }
                    txt +=
                        '</select>' +
                        '</div>' +
                        '</label>';
                }
                txt += '</div></div>';
                //consumes end
                if (opblack.parameters != null) {
                    var parameters = JSON.parse(opblack.parameters);
                    if (parameters.length > 0) {
                        txt +=
                            '<div class="table-responsive plr20px">' +
                            '<table class="table table-bordered">' +
                            '<thead>' +
                            '<tr>' +
                            '<th width="30px" class="text-align-center">是否必填</th>' +
                            '<th>参数位置</th>' +
                            '<th>参数类型</th>' +
                            '<th>参数名称</th>' +
                            '<th>参数描述</th>' +
                            '</tr>' +
                            '</thead>' +
                            '<tbody>';
                        for (var j = 0; j < parameters.length; j++) {
                            var p_required = parameters[j].required == 'true' ? '是' : '否';
                            var p_name = parameters[j].name == null ? '' : parameters[j].name;
                            var p_type = parameters[j].type == null ? '' : parameters[j].type;
                            var p_in = parameters[j].in == null ? '' : parameters[j].in;
                            var p_description = parameters[j].description == null ? '' : parameters[j].description;
                            txt +=
                                '<tr><td class="text-align-center">' + p_required + '</td>' +
                                '<td>' + p_in + '</td>' +
                                '<td>' + p_type + '</td>' +
                                '<td>' + p_name + '</td>' +
                                '<td>' + p_description + '</td>' +
                                '</tr>';
                            //是否需要添加参数说明
                            var isAddParamExplain = false;
                            var txtParamExplain = '<tr><td></td><td colspan="4" class="pd5px">';
                            txtParamExplain += '<div>参数说明:</div>';
                            if (parameters[j].default != null) {
                                isAddParamExplain = true;
                                txtParamExplain += '<span class="pull-left background-color-white radius5px mleft10px pd5px10px inline-block">默认值: ' + parameters[j].default + '</span>';
                            }
                            if (parameters[j].enum != null) {
                                var enums = JSON.parse(parameters[j].enum);
                                isAddParamExplain = true;
                                txtParamExplain += '<span class="pull-left background-color-white radius5px mleft10px pd5px10px inline-block">枚举值: ';
                                for (var es = 0; es < enums.length; es++) {
                                    if (es != 0) {
                                        txtParamExplain += ' , ';
                                    }
                                    txtParamExplain += enums[es];
                                }
                                txtParamExplain += '</span>';
                            }
                            if (parameters[j].vendorExtensions != null) {
                                var ve = parameters[j].vendorExtensions;
                                if (ve.min != null && ve.min != '') {
                                    isAddParamExplain = true;
                                    txtParamExplain += '<span class="pull-left background-color-white radius5px mleft10px pd5px10px inline-block">最小: ' + ve.min + '</span>';
                                }
                                if (ve.max != null && ve.max != '') {
                                    isAddParamExplain = true;
                                    txtParamExplain += '<span class="pull-left background-color-white radius5px mleft10px pd5px10px inline-block">最大: ' + ve.max + '</span>';
                                }
                            }
                            txtParamExplain += '<div class="clearfix mb5px"></div>';
                            if (parameters[j].pattern != null) {
                                isAddParamExplain = true;
                                txtParamExplain += '<span class="background-color-white radius5px mleft10px pd5px10px mb5px inline-block ">正则表达式: ' + parameters[j].pattern + '</span>';
                            }
                            if (parameters[j].format != null) {
                                isAddParamExplain = true;
                                txtParamExplain += '<span class="background-color-white radius5px mleft10px pd5px10px mb5px inline-block ">格式类型: ' + parameters[j].format + '</span>';
                            }
                            if (parameters[j].vendorExtensions != null && parameters[j].vendorExtensions.items != null) {
                                var p_items = parameters[j].vendorExtensions.items;
                                if (p_items.length > 0) {
                                    isAddParamExplain = true;
                                    txtParamExplain +=
                                        '<div class="table-responsive">' +
                                        '<table class="table table-bordered">' +
                                        '<thead>' +
                                        '<tr>' +
                                        '<th>参数类型</th>' +
                                        '<th>参数名称</th>' +
                                        '<th>参数描述</th>' +
                                        '</tr>' +
                                        '</thead>' +
                                        '<tbody>';
                                    for (var itp = 0; itp < p_items.length; itp++) {
                                        txtParamExplain +=
                                            '<tr>' +
                                            '<td>' + p_items[itp].type + '</td>' +
                                            '<td>' + p_items[itp].name + '</td>' +
                                            '<td>' + p_items[itp].description + '</td>' +
                                            '</tr>';
                                    }
                                    txtParamExplain += '</tbody></table></div>';
                                }
                            }
                            txt += '</td></tr>';

                            if (isAddParamExplain) {
                                txt += txtParamExplain;
                            }

                        }
                        txt += '</tbody></table></div>';
                    }
                }
                //请求参数 end


                //返回结果 begin
                //返回结果 responses-wrapper begin
                txt +=
                    '<div class="responses-wrapper">' +
                    '<div class="opblock-section-header">' +
                    '<h4><strong>返回结果</strong></h4>';
                if (opblack.produces != null) {
                    var produces = JSON.parse(opblack.produces);
                    txt +=
                        '<label>' +
                        '<span>Produces : </span>' +
                        '<div class="content-type-wrapper execute-content-type">' +
                        '<select class="content-type">';
                    for (var pr = 0; pr < produces.length; pr++) {
                        txt += '<option value="' + produces[pr] + '">' + produces[pr] + '</option>';
                    }
                    txt +=
                        '</select>' +
                        '</div>' +
                        '</label>';
                }
                txt += '</div></div>';
                //返回结果 responses-wrapper end
                //返回结果,返回参数 begin
                if (opblack.responses != null) {
                    //responses拓展了Swagger的Response加多一个statusCode,Response的vendorExtensions加多一个parameters,参数为name,type,description,body(body只有在array或object时有用与parameters类型一样)
                    var responses = JSON.parse(opblack.responses);
                    if (responses.length > 0) {
                        txt +=
                            '<div class="table-responsive plr20px">' +
                            '<table class="table table-bordered mb0px">' +
                            '<thead>' +
                            '<tr>' +
                            '<th>状态基本描述</th>' +
                            '<th>参数基本描述</th>' +
                            '</tr>' +
                            '</thead>' +
                            '<tbody>';
                        for (var resp = 0; resp < responses.length; resp++) {
                            //添加基本描述
                            txt += '<tr><td>' + responses[resp].statusCode + '</td><td><textarea class="focus-border-0px min-height-0 font-weight-normal none_resize" contenteditable="true" readonly="readonly">' + responses[resp].description + '</textarea></td></tr>';
                            //添加详细参数描述
                            if (responses[resp].vendorExtensions != null) {
                                var ve = JSON.parse(responses[resp].vendorExtensions);
                                if (ve.parameters != null) {
                                    var ve_ps = JSON.parse(ve.parameters);
                                    if (!jQuery.isEmptyObject(ve_ps)) {
                                        txt +=
                                            '<tr><td colspan="2" class="pall0px"><table class="table table-bordered mall0px">' +
                                            '<thead><tr><th>参数类型</th><th>参数名称</th><th>参数描述</th></tr></thead><tbody>';
                                        for (var vep = 0; vep < ve_ps.length; vep++) {
                                            txt += '<tr><td>' + ve_ps[vep].type + '</td><td>' + ve_ps[vep].name + '</td><td>' + ve_ps[vep].description + '</td>';
                                            if ((ve_ps[vep].type == 'array' || ve_ps[vep].type == 'object') && ve_ps[vep].items != null) {
                                                var vep_bodys = ve_ps[vep].items;
                                                if (!jQuery.isEmptyObject(vep_bodys)) {
                                                    txt += '<tr><td></td> <td colspan="2" class="pall0px"><table class="table table-bordered mall0px">';
                                                    txt += '<thead><tr><th>参数类型</th><th>参数名称</th><th>参数描述</th></tr></thead><tbody>';
                                                    for (var vepb = 0; vepb < vep_bodys.length; vepb++) {
                                                        txt += '<tr><td>' + vep_bodys[vepb].type + '</td><td>' + vep_bodys[vepb].name + '</td><td>' + vep_bodys[vepb].description + '</td>';
                                                    }
                                                    txt += '</tbody></table></td></tr>';
                                                }
                                            }
                                            txt += '</tr>';
                                        }
                                        txt += '</tbody></table></td></tr>';
                                    }
                                }
                            }
                        }
                        txt += '</tbody></table></div>';
                    }
                }
                //返回结果,返回参数 end
                //返回结果 end
                //附加说明 begin
                if (opblack.vendorExtensions != null) {
                    var veai = JSON.parse(opblack.vendorExtensions);
                    if (veai.additionalInstructions != null) {
                        txt +=
                            '<div class="responses-wrapper">' +
                            '<div class="opblock-section-header">' +
                            '<h4><strong>附加说明</strong></h4></div></div>';
                        txt += '<div  class="plr20px">';
                        var ais = JSON.parse(veai.additionalInstructions);
                        for (var a = 0; a < ais.length; a++) {
                            var ai = ais[a];
                            txt += '<div>' + ai.title + '</div>';
                            txt += '<textarea class="focus-border-0px min-height-0 font-weight-normal none_resize" contenteditable="true" readonly="readonly">' + ai.description + '</textarea>';
                        }
                        txt += '</div>';
                    }
                }
                //附加说明 end


                txt += '</div>';
                //api-opblock-body end
                txt += '</div>';
                //opblock end
            }
        }
        txt += '</div>';
        //swagger-ui end
        //api-list-manager begin
        txt +=
            '<div class="api-list-manager">' +
            '<a class="btn btn-sm btn-primary " href="./createApi.html?pid=' + data.projectId + '&gid=' + data.groupId + '">新建接口</a>' +
            '<span class="btn btn-sm btn-primary mleft10px" onclick="loadUpdateApiGroup(\'' + data.groupId + '\')">修改分组</span>' +
            '<span class="btn btn-sm btn-danger mleft10px" onclick="deleteApiGroup(\'' + data.groupId + '\')">删除分组</span>' +
            '</div>';
        //api-list-manager end
        txt += '</div>';
        //panel-body end
        txt += '</div>';
        //panel end
        $("#project_info_APIs_item").append($(txt));
    }
    $("#project_info_APIs_tips").html("");
}
/**
 * 刷新API分组的数据
 * @param data
 */
function refreshApiGroupInfo(data) {
    $("#api_group_name_" + data.groupId).text(data.name);
    $("#api_group_summary_" + data.groupId).text(data.summary);
    $("#api_group_description_" + data.groupId).text(data.description == null ? '' : data.description);
    if (data.externalDocs != null && data.externalDocs != '') {
        var docs = JSON.parse(data.externalDocs);
        if (!jQuery.isEmptyObject(docs)) {
            var docs_url = docs.url == null ? '' : docs.url;
            var docs_description = docs.description == null ? '' : docs.description;
            var txt = '<span>附加文档: <a href="' + docs_url + '" target="_blank">' + docs_description + '</a></span>';
            $("#api_group_externalDocs_" + data.groupId).html($(txt));
        } else {
            $("#api_group_externalDocs_" + data.groupId).html("");
        }
    } else {
        $("#api_group_externalDocs_" + data.groupId).html("");
    }
    $('#api-group-modal').modal('hide');
}

/**
 * 打开新建接口分组的model
 */
function createApiGroupShow() {
    $("#hide_api_group_id").val('');
    $("#api_group_name").val('');
    $("#api_group_summary").val('');
    $("#api_group_description").val('');
    $("#api_group_externalDocs_description").val('');
    $("#api_group_externalDocs_url").val('');

    $("#api-group-model-title").text('新建接口分组');
    $("#create-api-group-btn").show();
    $("#update-api-group-btn").hide();
    $('#api-group-modal').modal('show');
}
/**
 * 打开修改接口分组的model
 */
function updateApiGroupShow(data) {
    if (IS_DEBUG_ENABLED) {
        console.log('加载接口分组model的数据为:');
        console.log(data);
    }
    $("#hide_api_group_id").val(data.groupId);
    $("#api_group_name").val(data.name);
    $("#api_group_summary").val(data.summary);
    $("#api_group_description").val(data.description == null ? '' : data.description);
    $("#api_group_externalDocs_description").val('');
    $("#api_group_externalDocs_url").val('');
    if (data.externalDocs != null && data.externalDocs != '') {
        var docs = JSON.parse(data.externalDocs);
        $("#api_group_externalDocs_description").val(docs.description == null ? '' : docs.description);
        $("#api_group_externalDocs_url").val(docs.url == null ? '' : docs.url);
    }
    $("#api-group-model-title").text('修改接口分组');
    $("#create-api-group-btn").hide();
    $("#update-api-group-btn").show();
    $('#api-group-modal').modal('show');
}





