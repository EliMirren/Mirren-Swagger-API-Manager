//如果文件路径不为空就加载数据
$(function () {
    var isLoad = false;//编辑是否加载了文件
    var urls = $("#project_json_url").val();
    if (urls != '') {
        //加载网络文件
        getPojectAndLoad();
        isLoad = true;
    } else {
        //加载本地文件
        var file = document.getElementById('hide-load-file').files[0];
        if (file != null) {
            getProjectFileAndLoad();
            isLoad = true;
        }
    }
    if (!isLoad) {
        console.log('获取项目列表');
        $.ajax({
            'type': 'get',
            'url': 'http://localhost:8686/project',
            'async': true,
            'success': function (result) {
                if (result.code == 200) {
                    var data = result.data;
                    console.log('获取项目列表结果:');
                    console.log(data);
                    if (data.length > 0) {
                        var htmlTxt = '<h1 class="text-center">请在上方输入框中输入Json文件的路径并加载数据,或选择下方项目</h1>';
                        htmlTxt += '<div class="form-horizontal">' +
                            '<label class="col-sm-2 control-label">请选择项目:</label>' +
                            '<div class="col-sm-10">' +
                            '<select class="form-control" onchange="selectProjectOnChange(this)">';
                        htmlTxt += '<option value="-null-">请选择要加载的项目</option>';
                        var prefix = location.protocol + '//' + location.host;
                        for (var i = 0; i < data.length; i++) {
                            htmlTxt += '<option value=\'' + prefix + '/project/getJson/' + data[i].key + '\'>' + data[i].name + ' _ ' + data[i].version + '</option>';
                        }
                        htmlTxt += '</select></div></div>';
                        $("#msam-project-info-main").html(htmlTxt);
                    }
                } else {
                    $("#msam-project-info-main").html($("<h1 class=\"text-center\">请在上方输入框中输入Json文件的路径并加载数据</h1>"))
                }
            },
            'error': function (err) {
                console.log(err);
            }
        });
    }
});

/**
 * 选择项目的改变事件
 * @param obj
 */
function selectProjectOnChange(obj) {
    var uri = $(obj).val();
    if ("-null-" == uri) {
        return;
    }
    $("#project_json_url").val(uri);
    getPojectAndLoad();
}

/**
 * 自适应textarea内容高度
 */
function textareaAutoHeight() {
    $('textarea').each(function () {
        this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;');
    })
}


/**
 * 加载项目以及API相关信息
 */
function getPojectAndLoad() {
    var urls = $("#project_json_url").val();
    if (urls == '') {
        alert('请输入Json文件所在URL');
        return;
    }
    show_hide_tips_panel(true, "数据加载中...");
    $("#api-dosc-main").html('');
    $("#api-group-main").html('');
    $("#msam-project-info-top").html('');
    $("#msam-project-info-main").html('');
    $.ajax({
        type: 'get',
        url: urls,
        async: true,
        dataType: "json",
        success: function (data) {
            loadProject(data);//加载项目信息
            show_hide_tips_panel(false, '');
        },
        error: function (err) {
            alert("获取数据失败!");
            console.log(err)
        }
    });
}

/**
 *从本地获取文件并加载
 */
function getProjectFileAndLoad() {
    show_hide_tips_panel(true, "数据加载中...");
    var reader = new FileReader();
    var file = document.getElementById('hide-load-file').files[0];
    reader.readAsText(file);
    reader.onload = function (res) {
        var data = res.target.result;
        loadProject(JSON.parse(data));
        show_hide_tips_panel(false, '');
    }
}


/**
 * 获取项目信息
 * @param data
 */
function loadProject(data) {
    try {
        var info = data.info;
        var top = '';
        //title begin
        top += '<h1 class="margin-bottom-0">';
        if (info.title != null) {
            top += info.title;
        }
        if (info.version != null) {
            top += ' <span class="badge font-size-14px border-1px-solid-orange-bc-transparent"> ' + info.version + '</span>';
        }
        top += '</h1>';
        //title end
        //description begin
        if (info.description != null) {
            top += '<div>' + info.description + '</div>';
        }
        //description end
        //updateTime begen
        if (data.updateTime != null) {
            top += '<div>更新时间: ' + data.updateTime + '</div>';
        }
        //updateTime end
        $("#msam-project-info-top").html($(top));

        //host & basePath begin
        var host = data.host == null ? "" : data.host;
        var basePath = data.basePath == null ? "" : data.basePath;
        var main = '<div class="margin-top-5px margin-bottom-0">' +
            '主机地址: <input type="text" id="project_host" class="border-0 background-color-transparent" value=\'' + host + '\'>' +
            '</div>' +
            '<div>Base URL: <input type="text" id="project_basePath"  class="border-0 background-color-transparent"  value=\'' + basePath + '\'></div>';
        //host & basePath end
        //schemes begin
        if (data.schemes != null && data.schemes.length > 0) {
            main += '<span class="font-size-22px">请求协议: </span><select id="project_scheme" class="border-1px-solid-ccc">';
            for (var i = 0; i < data.schemes.length; i++) {
                main += '<option value=\'' + data.schemes[i] + '\'>' + data.schemes[i] + '</option>';
            }
            main += '</select>';
        }
        //schemes end

        //termsOfService begin
        if (info.termsOfService != null) {
            main += '<div>服务提供方: <a href=\'' + info.termsOfService + '\' target="_blank">Terms of service</a></div>';
        }
        //termsOfService end
        //license end
        if (info.license != null) {
            main += '<div>项目协议: <a href=\'' + (info.license.url == null ? "" : info.license.url) + '\'  target="_blank">' + (info.license.name == null ? "" : info.license.name) + '</a></div>';
        }
        //license end
        //contact begen
        if (info.contact != null) {
            main += '<div>';
            var contact = info.contact;
            if (contact.name != null) {
                main += '联系人: <span>' + contact.name + '</span> ,';
            }
            if (contact.email != null) {
                main += ' 联系方式: <span>' + contact.email + '</span> <br>';
            }
            if (contact.url != null) {
                main += '联系地址: <a href=\'' + contact.url + '\'  target="_blank">' + contact.url + '</a> ';
            }
            main += '</div>';
        }
        //contact end
        //externalDocs begen
        if (data.externalDocs != null) {
            if (data.externalDocs.description == null || data.externalDocs.description != '') {
                if (data.externalDocs.url != null && data.externalDocs.url != '') {
                    main += '<div>附加文档: <a href=\'' + data.externalDocs.url + '\'  target="_blank">' + data.externalDocs.description + '</a></div>'
                }
            } else if (data.externalDocs.url != null && data.externalDocs.url != '') {
                main += '<div>附加文档: <a href=\'' + data.externalDocs.url + '\'  target="_blank">' + data.externalDocs.url + '</a></div>'
            }

        }
        //externalDocs end
        $("#msam-project-info-main").html($(main));

        loadApiGroupAndApi(data);

    } catch (e) {
        console.log(e)
        $("#msam-project-info-top").html($('<h1>加载信息失败,请查看控制台</h1>'));
    }
}

/**
 * 加载API数据
 * @param data
 */
function loadApiGroupAndApi(data) {
    var groups = new Map();
    for (var i = 0; i < data.tags.length; i++) {
        groups.set(data.tags[i].name, data.tags[i]);
    }
    var paths = data.paths;
    for (var key in paths) {
        for (var pathKey in paths[key]) {
            var path = paths[key][pathKey];
            path.path = key;
            path.method = pathKey;
            for (var i = 0; i < path.tags.length; i++) {
                var tagName = path.tags[i];
                var group = groups.get(tagName);
                if (group == null) {
                    continue;
                }
                if (group.apis == null) {
                    group.apis = [];
                }
                group.apis.push(path);
            }
        }
    }
    groups.forEach(function (value, key, groups) {
        //添加锚链接的数据
        var locationData = {};
        locationData.group = value.name;

        //分组信息 begin
        var html = '<div class="bs-docs-section">';
        html += '<h1 id=\'' + value.name + '\' class="page-header">' + value.name + '</h1>';
        if (value.description != null) {
            html += '<p>' + value.description + '</p>';
        }
        if (value.externalDocs != null && value.externalDocs instanceof Object) {
            html += '<p>附加文档: <a href=\'' + value.externalDocs.url + '\' target="_blank">' + value.externalDocs.description + '</a></p>';
        }
        var apis = value.apis;
        if (apis != null) {
            for (var i = 0; i < apis.length; i++) {
                var api = apis[i];
                if (locationData.apis == null) {
                    locationData.apis = [];
                }
                locationData.apis.push({
                    'api': (api.summary == null ? api.path : api.summary),
                    'apiId': api.operationId
                });
                // 接口信息 begin
                var method = api.method;//请求方法
                var styleMethod = '-' + method;//请求方法的样式
                var deprecated = (api.deprecated != null && api.deprecated == true) ? "-deprecated " : "";//该接口是否已经过时

                html += '<h2 id=\'' + api.operationId + '\' class="' + deprecated + '"><span class="point"></span>' + api.summary + '</h2>';

                html += '<div class="api-body' + deprecated + ' api-body' + styleMethod + '">';
                // 请求方法 begin
                html += '<div class="api-item api-body-method' + deprecated + ' method' + styleMethod + '">' +
                    '<div class="api-item-sub">请求方法: ' + method + '</div>' +
                    '<div class="api-item-sub">请求URL:</div>' +
                    '</div>';
                // 请求方法 end
                //URL信息 begin
                var tryItOutData = {};//运行测试需要用到的数据
                tryItOutData.path = api.path;
                tryItOutData.method = api.method;
                tryItOutData.consumes = api.consumes;
                tryItOutData.produces = api.produces;
                tryItOutData.parameters = api.parameters;
                html += '<div class="api-item">' +
                    '<span class="api-item-sub ' + deprecated + '">#{scheme}://#{host}#{basePath}</span>' +
                    '<span class="api-item-sub ' + deprecated + '">' + api.path + '</span>' +
                    '<div>' +
                    '<span class="url-copy url-copy-full" onclick="copyFull(this)">Copy</span>' +
                    '<span class="url-copy url-copy-path" onclick="copyPath(this)">CopyPath</span>' +
                    '<span class="url-copy url-copy-path" onclick="tryItOut(this)" data=\'' + JSON.stringify(tryItOutData) + '\'>测试运行</span></div>' +
                    '</div>';
                //URL信息 begin
                html += '<div class="api-item api-body-follow' + deprecated + ' follow' + styleMethod + '">' + api.description + '</div>';
                //请求参数 begin
                html += '<div class="api-item">请求参数:<span style="float: right;">';
                if (api.consumes != null && api.consumes.length > 0) {
                    html += '<span style="float: right;"> consumes : <select class="border-1px-solid-ccc" style="min-width: 100px">';
                    for (var c = 0; c < api.consumes.length; c++) {
                        html += '<option value=\'' + api.consumes[c] + '\'>' + api.consumes[c] + '</option>';
                    }
                    html += '</select></span>';
                }
                html += '</div>';
                if (api.parameters != null && api.parameters.length > 0) {
                    var parameters = api.parameters;
                    var txt =
                        '<div class="table-responsive api-item api-body-follow' + deprecated + ' follow' + styleMethod + '">' +
                        '<table class="table table-bordered">' +
                        '<thead>' +
                        '<tr>' +
                        '<th class="text-center">是否必填</th>' +
                        '<th>参数位置</th>' +
                        '<th>参数类型</th>' +
                        '<th>参数名称</th>' +
                        '<th>参数描述</th>' +
                        '</tr>' +
                        '</thead>' +
                        '<tbody>';
                    for (var j = 0; j < parameters.length; j++) {
                        var p_required = parameters[j].required == true ? '是' : '否';
                        var p_name = parameters[j].name == null ? '' : parameters[j].name;
                        var p_type = parameters[j].type == null ? '' : parameters[j].type;
                        var p_in = parameters[j].in == null ? '' : parameters[j].in;
                        var p_description = parameters[j].description == null ? '' : parameters[j].description;
                        txt +=
                            '<tr><td class="text-center">' + p_required + '</td>' +
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
                            var enums = parameters[j].enum;
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
                        if (parameters[j].minLength != null && parameters[j].minLength != '') {
                            isAddParamExplain = true;
                            txtParamExplain += '<span class="pull-left background-color-white radius5px mleft10px pd5px10px inline-block">最小长度: ' + parameters[j].minLength + '</span>';
                        }
                        if (parameters[j].minimum != null && parameters[j].minimum != '') {
                            isAddParamExplain = true;
                            txtParamExplain += '<span class="pull-left background-color-white radius5px mleft10px pd5px10px inline-block">最小值: ' + parameters[j].minimum + '</span>';
                        }
                        if (parameters[j].maxLength != null && parameters[j].maxLength != '') {
                            isAddParamExplain = true;
                            txtParamExplain += '<span class="pull-left background-color-white radius5px mleft10px pd5px10px inline-block">最大长度: ' + parameters[j].maxLength + '</span>';
                        }
                        if (parameters[j].maximum != null && parameters[j].maximum != '') {
                            isAddParamExplain = true;
                            txtParamExplain += '<span class="pull-left background-color-white radius5px mleft10px pd5px10px inline-block">最大值: ' + parameters[j].maximum + '</span>';
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
                        if (parameters[j]['x-items'] != null) {
                            var p_items = parameters[j]['x-items'];
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
                    html += txt;
                }
                //请求参数 end
                //响应结果 begin
                html += '<div class="api-item">响应结果:';
                if (api.produces != null && api.produces.length > 0) {
                    html += '<span style="float: right;">produces :  <select class="border-1px-solid-ccc" style="min-width: 100px">';
                    for (var p = 0; p < api.produces.length; p++) {
                        html += '<option value=\'' + api.produces[p] + '\'>' + api.produces[p] + '</option>';
                    }
                    html += '</select></span>';
                }
                html += '</div>';

                if (api.responses != null) {
                    //responses拓展了Swagger的Response加多一个statusCode,Response的vendorExtensions加多一个parameters,参数为name,type,description,body(body只有在array或object时有用与parameters类型一样)
                    var responses = api.responses;
                    if (!jQuery.isEmptyObject(responses)) {
                        html +=
                            '<div class="table-responsive api-item api-body-follow' + deprecated + '  follow' + styleMethod + ' ">' +
                            '<table class="table table-bordered margin-bottom-0">' +
                            '<thead>' +
                            '<tr>' +
                            '<th>状态基本描述</th>' +
                            '<th>参数基本描述</th>' +
                            '</tr>' +
                            '</thead>' +
                            '<tbody>';
                        for (var code in api.responses) {
                            var resp = api.responses[code];
                            //添加基本描述
                            html += '<tr><td>' + code + '</td><td><textarea class="api-body-explain' + deprecated + ' explain' + styleMethod + '" rows="1" contenteditable="true" readonly="readonly">' + resp.description + '</textarea></td></tr>';
                            var ve_ps = api.responses[code]['x-parameters'];
                            if (!jQuery.isEmptyObject(ve_ps)) {
                                html +=
                                    '<tr><td colspan="2" ><table class="table table-bordered">' +
                                    '<thead><tr><th>参数类型</th><th>参数名称</th><th>参数描述</th></tr></thead><tbody>';
                                for (var vep = 0; vep < ve_ps.length; vep++) {
                                    html += '<tr><td>' + ve_ps[vep].type + '</td><td>' + ve_ps[vep].name + '</td><td>' + ve_ps[vep].description + '</td>';
                                    if ((ve_ps[vep].type == 'array' || ve_ps[vep].type == 'object') && ve_ps[vep].items != null) {
                                        var vep_bodys = ve_ps[vep].items;
                                        if (!jQuery.isEmptyObject(vep_bodys)) {
                                            html += '<tr><td></td> <td colspan="2" class="pall0px"><table class="table table-bordered mall0px">';
                                            html += '<thead><tr><th>参数类型</th><th>参数名称</th><th>参数描述</th></tr></thead><tbody>';
                                            for (var vepb = 0; vepb < vep_bodys.length; vepb++) {
                                                txt += '<tr><td>' + vep_bodys[vepb].type + '</td><td>' + vep_bodys[vepb].name + '</td><td>' + vep_bodys[vepb].description + '</td>';
                                            }
                                            html += '</tbody></table></td></tr>';
                                        }
                                    }
                                    html += '</tr>';
                                }
                                html += '</tbody></table></td></tr>';
                            }
                        }
                        html += '</tbody></table></div>';
                    }
                }
                //响应结果 end
                //附加说明 begin
                if (api['x-additionalInstructions'] != null) {
                    var instrs = api['x-additionalInstructions'];
                    if (instrs.length > 0) {
                        html += '<div class="api-item">附加说明:</div>';
                        html += '<div class="api-item api-body-follow' + deprecated + '  follow' + styleMethod + '">';
                        for (var d = 0; d < instrs.length; d++) {
                            html += '<Strong>' + instrs[d].title + '</Strong>';
                            html += '<textarea class="api-body-explain' + deprecated + ' explain' + styleMethod + '" rows="1" readonly="readonly" contenteditable="true">' + instrs[d].description + '</textarea>';
                        }
                        html += '</div>';
                    }
                }
                //附加说明 end
                html += '</div>';
            }
        }
        // 接口信息 end
        html += '<div>';
        //分组信息 end
        $("#api-dosc-main").append($(html));
        //添加分组与连接锚点
        loadGroupLinkLocation(locationData);
    });
    textareaAutoHeight();//跳转textarea高度

}

/**
 * 加载锚链接定位
 * @param data {group:分组的名字与分组的id锚点,apis{api:接口的summary,apiId接口的id锚点}}
 */
function loadGroupLinkLocation(data) {
    var html = '<li><a href=\'#' + data.group + '\'>' + data.group + '</a>';
    if (data.apis != null) {
        if (data.apis.length > 0) {
            html += '<ul class="nav">';
            for (var i = 0; i < data.apis.length; i++) {
                html += '<li><a href=\'#' + data.apis[i].apiId + '\'>' + data.apis[i].api + '</a></li>';
            }
            html += '</ul>';
        }
        html += '</li>';
        $("#api-group-main").append($(html));
    }
}

/**
 * 复制完整的URL路径
 * @param obj 按钮调用时传入按钮的this
 */
function copyFull(obj) {
    $(obj).attr("data-clipboard-target", "#copy-temp-input");
    var scheme = $("#project_scheme").val();
    var host = $("#project_host").val();
    var basePath = $("#project_basePath").val();
    var scheme_host_basePath = $(obj).parent().prev().prev().text();
    var base = scheme_host_basePath.replace("#{scheme}", scheme).replace("#{host}", host);
    if (basePath.length > 1) {
        basePath = basePath.charAt(0) == '/' ? basePath : "/" + basePath;
        base = base.replace("#{basePath}", basePath)
    } else {
        base = base.replace("#{basePath}", "")
    }
    var Path = $(obj).parent().prev().text();
    var urlValue = base + Path;
    document.getElementById("copy-temp-input").value = urlValue;
    var clipboard = new ClipboardJS(".url-copy-full");
    clipboard.on('success', function (e) {
        e.clearSelection();
        show_hide_tips_panel(true, "复制成功");
        setTimeout(function () {
            show_hide_tips_panel(false, "");
        }, 1000);
    });
    clipboard.on('error', function (e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
        alert("复制失败:请手动复制或者使用最新的谷歌火狐浏览器");
    });
}

/**
 * 复制URL的Path
 * @param obj 按钮调用时传入按钮的this
 */
function copyPath(obj) {
    var urlValue = $(obj).parent().prev().text();
    document.getElementById("copy-temp-input").value = urlValue;
    $(obj).attr("data-clipboard-target", "#copy-temp-input");
    var clipboardPath = new ClipboardJS(".url-copy-path");
    clipboardPath.on('success', function (e) {
        e.clearSelection();
        show_hide_tips_panel(true, "复制成功");
        setTimeout(function () {
            show_hide_tips_panel(false, "");
        }, 1000);
    });
    clipboardPath.on('error', function (e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
        alert("复制失败:请手动复制或者使用最新的谷歌火狐浏览器");
    });
}

/**
 * 测试运行
 * @param obj
 */
function tryItOut(obj) {
    var data = JSON.parse($(obj).attr("data"));
    var scheme = $("#project_scheme").val();
    var host = $("#project_host").val();
    var basePath = $("#project_basePath").val();
    if (basePath.length > 1) {
        basePath = basePath.charAt(0) == '/' ? basePath : "/" + basePath;
    } else {
        basePath = '';
    }
    var url = scheme + '://' + host + basePath + data.path;
    $("#try_it_out_url").val(url);
    $("#try_it_out_method").val(data.method);
    if (data.consumes != null && data.consumes.length > 0) {
        $("#try_it_out_consumes_box").show();
        $("#try_it_out_consumes").html('');
        for (var i = 0; i < data.consumes.length; i++) {
            $("#try_it_out_consumes").append($('<option value=' + data.consumes[i] + '>' + data.consumes[i] + '</option>'));
        }

    } else {
        $("#try_it_out_consumes_box").hide();
        $("#try_it_out_consumes").html('');
    }

    if (data.produces != null && data.produces.length > 0) {
        $("#try_it_out_produces_box").show();
        $("#try_it_out_produces").html('');
        for (var i = 0; i < data.produces.length; i++) {
            $("#try_it_out_produces").append($('<option value=' + data.produces[i] + '>' + data.produces[i] + '</option>'));
        }
    } else {
        $("#try_it_out_produces_box").hide();
        $("#try_it_out_produces").html('');
    }
    if (data.parameters != null && data.parameters.length > 0) {
        $("#try_it_out_parameter_box").show();
        $("#try_it_out_parameter").html('');
        for (var i = 0; i < data.parameters.length; i++) {
            var param = data.parameters[i];
            if ('path' == param.in) {
                continue;
            }
            var formatValue = param.format == null ? "" : "data-format='" + param.format + "'";
            var trHtml = '<tr data-type="' + param.type + '" ' + formatValue + '>';
            trHtml += '<td><input class="form-control" value=\'' + param.in + '\' type="text"></td>';
            trHtml += '<td><input class="form-control" value=\'' + param.name + '\' type="text"></td>';
            trHtml += '<td><input class="form-control" value=\'' + (param.default == null ? "" : param.default) + '\' type="text"></td>';
            trHtml += '<td><span class="btn btn-xs btn-danger" onclick="removeRequestParam(this)">移除</span></td>';
            trHtml += '</tr>';
            if (param['x-items'] != null && param['x-items'].length > 0) {
                trHtml += '<tr><td></td><td colspan="3">';
                trHtml += '<div class="table-responsive"><table class="table table-bordered">' +
                    '<thead>' +
                    '<tr>' +
                    '<th>参数类型</th>' +
                    '<th>参数名称</th>' +
                    '<th>参数值</th>' +
                    '<th>操作</th>' +
                    '</tr>' +
                    '</thead>';
                trHtml += '<tbody>';
                for (var j = 0; j < param['x-items'].length; j++) {
                    var items = param['x-items'][j];
                    trHtml += '<tr>';
                    trHtml += '<td><input class="form-control" value=\'' + items.type + '\' type="text"></td>';
                    trHtml += '<td><input class="form-control" value=\'' + items.name + '\' type="text"></td>';
                    trHtml += '<td><input class="form-control" type="text"></td>';
                    trHtml += '<td><span class="btn btn-xs btn-danger" onclick="javascript:if(confirm(\'确定移除吗?\')){$(this).parent().parent().remove()}">移除</span></td>';
                    trHtml += '</tr>';
                }
                trHtml += '</tbody></td></tr>';
            }
            $("#try_it_out_parameter").append($(trHtml));
        }
        $("#try_it_out_parameter_tips").append($('<div class="text-center font-size-14px">二级参数值优先于一级参数值</div>'));
    } else {
        $("#try_it_out_parameter_box").hide();
    }
    $("#try_it_out_response_box").hide();
    $("#try-it-out-modal").modal('show');
}

/**
 * 移除某一行请求参数
 * @param obj
 */
function removeRequestParam(obj) {
    if (confirm('确定移除吗?')) {
        var type = $(obj).parent().parent().attr('data-type');
        if (type == 'object' || type == 'array') {
            $(obj).parent().parent().next().remove();
        }
        $(obj).parent().parent().remove();
    }
}

/**
 * 执行请求
 */
function tryItOutApi() {
    var method = $("#try_it_out_method").val();
    var url = $("#try_it_out_url").val();
    var consumes = $("#try_it_out_consumes").val();
    var produces = $("#try_it_out_produces").val();
    var trs = $("#try_it_out_parameter").children();

    var headerParams = {};
    if (produces != null && '' != produces) {
        headerParams.accept = produces;
    }
    var queryParams = "?";
    var bodyOrDataParam = {};
    for (var i = 0; i < trs.length; i++) {
        var tr = $(trs[i]);
        var type = tr.attr('data-type');
        var format = tr.attr('data-format');
        var item = {}
        item.in = tr.children()[0].children[0].value;
        item.name = tr.children()[1].children[0].value;
        item.value = tr.children()[2].children[0].value;
        try {
            if ((type == 'array' || type == 'object') || (format != null && (format == 'array' || format == 'object'))) {
                i += 1;
                var tr_trs = $(trs[i]).children()[1].children[0].children[0].children[1].children;
                var tr_items;
                if ('array' == format) {
                    tr_items = [];
                } else {
                    tr_items = {};
                }
                for (var j = 0; j < tr_trs.length; j++) {
                    var tr_tr = $(tr_trs[j]);
                    var tr_item = {};
                    var type = tr_tr.children()[0].children[0].value;
                    var name = tr_tr.children()[1].children[0].value;
                    var value = tr_tr.children()[2].children[0].value;
                    tr_item[name] = value;
                    if ('array' == format) {
                        tr_items.push(tr_item);
                    } else {
                        tr_items[name] = value;
                    }
                }
                if (!jQuery.isEmptyObject(tr_items)) {
                    item.items = tr_items;
                }
            }
        } catch (e) {
            console.log(e);
        }
        if (item.in == 'header') {
            if (item.items != null) {
                if ('string' == format) {
                    headerParams[item.name] = JSON.stringify(item.items);
                } else {
                    headerParams[item.name] = item.items;
                }
            } else {
                headerParams[item.name] = item.value;
            }
        } else if (item.in == 'query') {
            var prefix = queryParams == '?' ? "" : "&";
            if (item.items != null) {
                var stringify = JSON.stringify(item.items);
                queryParams += prefix + item.name + '=' + stringify;
            } else {
                queryParams += prefix + item.name + '=' + item.value;
            }
        } else {
            if (item.items != null && item.items.length > 0) {
                if ('string' == format) {
                    bodyOrDataParam[item.name] = JSON.stringify(item.items);
                } else {
                    bodyOrDataParam[item.name] = item.items;
                }
            } else {
                bodyOrDataParam[item.name] = item.value;
            }
        }
    }

    var execute = {};
    execute.type = method;
    execute.url = url + queryParams;
    if (consumes != null && consumes != '') {
        execute.contentType = consumes;
    }
    execute.data = bodyOrDataParam;
    if (!jQuery.isEmptyObject(headerParams)) {
        execute.beforeSend = function (request) {
            for (key in headerParams) {
                request.setRequestHeader(key, headerParams[key]);
            }
        }
    }
    execute.success = function (data) {
        show_hide_tips_panel(false, '');
        console.log('执行请求成功:');
        console.log(data);
        var dataText = "请求成功!\n";
        if (produces != null && produces.toLowerCase().indexOf('xml') != -1) {
            dataText += formatXml(data)
        } else {
            try {
                dataText += formatJson(data);
            } catch (e) {
                dataText += data.toString();
            }
        }
        $("#try_it_out_response").html(dataText);
        $("#try_it_out_response_box").show();
    };
    execute.error = function (err) {
        show_hide_tips_panel(true, '执行请求失败,请查看控制台详细信息! ');
        setTimeout(function () {
            show_hide_tips_panel(false, "");
        }, 1000);
        console.log('执行请求失败:');
        console.log(err);
        var resultJson = formatJson(err);
        $("#try_it_out_response").html('执行请求失败,更多错误信息请查看控制台信息: ' + resultJson);
        $("#try_it_out_response_box").show();
    };

    show_hide_tips_panel(true, '请求执行中...');
    $.ajax(execute);
}

/**
 * 显示或者隐藏提示面板
 * @param show true=显示,false=隐藏
 * @param txt 文本内容
 */
function show_hide_tips_panel(show, txt) {
    if (show) {
        $("#tips-panel").text(txt);
        $("#tips-panel").show();
    } else {
        $("#tips-panel").text(txt);
        $("#tips-panel").hide();
    }
}
