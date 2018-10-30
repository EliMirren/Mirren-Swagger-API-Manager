/**
 * Created by Mirren on 2018/10/19.
 */

/**
 * 加载项目列表
 * @param complete 加载完成事件
 */
function loadProjectList(complete) {
    doAJAX(METHOD_GET, 'http://localhost:8686/project', null, function (result) {
        if (result.code == 200) {
            var data = result.data;
            for (var i = 0; i < data.length; i++) {
                var txt = "<li id='" + data[i].key + "' onclick=\"requestProject('" + data[i].key + "')\" ><a class='cursor-hand'>" + data[i].name + " <span class='badge'>" + data[i].version + "</span></a></li>";
                $("#project_list").append($(txt));
            }
            complete();//执行加载完成事件
        } else {
            console.log("msg:" + result.msg + " ,data:");
            console.log(result.data);
            confirm("获取项目列表失败,");
        }
    }, function (e) {
        console.log("获取项目列表失败...");
        console.log(e);
        var state = e.readyState;
        if (state == 0) {
            alert('获取数据需要先启动服务器,请在当前目录双击start.bat');
        } else {
            confirm('获取数据失败了');
        }
    });
}
/**
 * 从服务器获取指定项目的数据
 * @param id
 */
function getProject(id, res) {
    doAJAX(METHOD_GET, 'http://localhost:8686/project/' + id, null, function (result) {
        if (result.code == 200) {
            return res(result.data);
        } else {
            console.log("msg:" + result.msg + " ,data:");
            console.log(result.data);
            confirm("获取项目失败,");
        }
    }, function (e) {
        console.log("获取数据失败...");
        console.log(e);
        var state = e.readyState;
        if (state == 0) {
            alert('获取数据需要先启动服务器,请在当前目录双击start.bat');
        } else {
            confirm('获取数据失败了');
        }
    });
}
/**
 * 请求项目
 * @param id
 */
function requestProject(id) {
    var href = location.href;
    if (href.indexOf('?') != -1) {
        href = href.substring(0, href.indexOf('?'));
    }
    location.href = href + "?pid=" + id;
}
/**
 * 显示项目
 * @param id
 */
function loadProject(id) {
    $("#project_info_body").html('<h1 class="page-header">信息加载中...</h1>');
    getProject(id, function (data) {
        try {
            loadProjectInfo(data);//加载项目信息
            loadApiGroup(id);//加载分组信息
        } catch (e) {
            $("#project_info_body").html('<h1 class="page-header">点击项目列表加载项目信息</h1>');
            console.log(e)
        }
    });
}
/**
 * 加载接口分组
 * @param projectId
 */
function loadApiGroup(projectId) {
    if (projectId == null || projectId == '') {
        alert('项目的id不能为空!');
    }
    doAJAX(METHOD_GET, 'http://localhost:8686/project/apiGroup/' + projectId, null, function (result) {
        if (result.code == 200) {
            console.log('加载项目接口分组成功!');
            loadApiGroupAndApiOpblack(result.data);
        } else {
            console.log("msg:" + result.msg + " ,data:");
            console.log(result.data);
            confirm("加载项目接口分组失败");
        }
    }, function (e) {
        console.log("加载项目接口分组失败...");
        console.log(e);
        var state = e.readyState;
        if (state == 0) {
            alert('加载项目接口分组需要先启动服务器,请在当前目录双击start.bat');
        } else {
            confirm('加载项目接口分组失败了');
        }
    });
}


/**
 * 返回项目所需要的swagger信息,创建时用,如果修改需要加入额外的属性
 */
function getProjectInfo() {
    var title = $('#info_title').val();
    var version = $('#info_version').val();
    var host = $('#swagger_host').val();
    if (title == '' || version == '' || host == '') {
        alert('项目名称,版本号,主机 为必填项');
        return;
    }
    var swagger = {};
    swagger.host = host;

    //资料
    var info = {};
    info.title = title;
    info.version = version;
    var info_description = $('#info_description').val();
    if (info_description != '') {
        info.description = info_description;
    }
    var info_termsOfService = $('#info_termsOfService').val();
    if (info_termsOfService != '') {
        info.termsOfService = info_termsOfService;
    }

    //联系方式
    var contact = {};
    var info_contact_name = $('#info_contact_name').val();
    if (info_contact_name != '') {
        contact.name = info_contact_name;
    }
    var info_contact_url = $('#info_contact_url').val();
    if (info_contact_url != '') {
        contact.url = info_contact_url;
    }
    var info_contact_email = $('#info_contact_email').val();
    if (info_contact_email != '') {
        contact.email = info_contact_email;
    }
    if (!jQuery.isEmptyObject(contact)) {
        info.contact = contact;
    }
    //协议
    var license = {};
    var info_license_name = $('#info_license_name').val();
    if (info_license_name != '') {
        license.name = info_license_name;
    }
    var info_license_url = $('#info_license_url').val();
    if (info_license_url != '') {
        license.url = info_license_url;
    }
    if (!jQuery.isEmptyObject(license)) {
        info.license = license;
    }
    var swagger_version = $("#swagger_version").val();
    if (swagger_version != '') {
        swagger.swagger = swagger_version;
    }
    var swagger_basePath = $("#swagger_basePath").val();
    if (swagger_basePath != '') {
        swagger.basePath = swagger_basePath;
    }
    var schemes = [];
    $('input:checkbox[name=swagger_schemes]:checked').each(function (k) {
        schemes.push($(this).val());
    });
    if (schemes.length > 0) {
        swagger.schemes = JSON.stringify(schemes);
    }

    var externalDocs = {};
    var externalDocs_description = $("#externalDocs_description").val();
    if (externalDocs_description != '') {
        externalDocs.description = externalDocs_description;
    }
    var externalDocs_url = $("#externalDocs_url").val();
    if (externalDocs_url != '') {
        externalDocs.url = externalDocs_url;
    }
    if (!jQuery.isEmptyObject(externalDocs)) {
        swagger.externalDocs = JSON.stringify(externalDocs);
    }
    swagger.info = JSON.stringify(info);
    return swagger;
}

/**创建项目*/
function createProject() {
    var swagger = getProjectInfo();
    if (IS_DEBUG_ENABLED) {
        console.log(swagger);
    }
    //调用Index的doAJAX
    doAJAX(METHOD_POST, 'http://localhost:8686/project', swagger, function (result) {
        if (result.code == 200) {
            if (confirm('创建成功!是否继续创建?')) {
                window.location.reload();
            } else {
                self.location = "index.html";
            }
        } else {
            alert("创建应用失败");
            console.log("msg:" + result.msg + " ,data:");
            console.log(result.data);
        }
    }, function (e) {
        console.log("创建数据失败...");
        console.log(e);
        var state = e.readyState;
        if (state == 0) {
            alert('获取数据需要先启动服务器,请在当前目录双击start.bat');
        } else {
            alert('获取数据失败了');
        }
    });
}
/**加载修改项目所需要用的相关属性*/
function loadUpdateProject(id) {
    getProject(id, function (swagger) {
        if (IS_DEBUG_ENABLED) {
            console.log(swagger);
        }
        $("#project_id").val(swagger.key);
        $("#swagger_version").val(swagger.swagger);
        $("#swagger_host").val(swagger.host);
        if (swagger.basePath != null) {
            $("#swagger_basePath").val(swagger.basePath);
        }
        if (swagger.schemes != null) {
            var schemes = JSON.parse(swagger.schemes);
            for (var i = 0; i < schemes.length; i++) {
                $("#swagger_schemes_" + schemes[i]).attr("checked", "checked");
            }
        }
        if (swagger.externalDocs != null) {
            var externalDocs = JSON.parse(swagger.externalDocs);
            $("#externalDocs_description").val(externalDocs.description);
            $("#externalDocs_url").val(externalDocs.url);
        }
        if (swagger.info != null) {
            var info = JSON.parse(swagger.info);
            $("#info_title").val(info.title);
            $("#info_version").val(info.version);
            $("#info_description").val(info.description);
            $("#info_termsOfService").val(info.termsOfService);
            if (info.contact != null) {
                $("#info_contact_name").val(info.contact.name);
                $("#info_contact_email").val(info.contact.email);
                $("#info_contact_url").val(info.contact.url);
            }
            if (info.license != null) {
                $("#info_license_name").val(info.license.name);
                $("#info_license_url").val(info.license.url);
            }
        }
        //=这里可以加载更多属性
    })
}

/**修改项目*/
function updateProject() {
    var swagger = getProjectInfo();
    if (swagger.schemes == null) {
        swagger.schemes = "[]";
    }
    if (swagger.externalDocs == null) {
        swagger.externalDocs = "{}";
    }
    if (swagger.vendorExtensions == null) {
        var ve = {};
        ve.updateTime = new Date().toLocaleString();
        swagger.vendorExtensions = JSON.stringify(ve);
    } else {
        var ve = JSON.parse(swagger.vendorExtensions);
        ve.updateTime = new Date().toLocaleString();
        swagger.vendorExtensions = JSON.stringify(ve);
    }

    if (IS_DEBUG_ENABLED) {
        console.log(swagger);
    }
    swagger.key = $("#project_id").val();
    //如果还有更多属性,可以在这里获取相应的属性,后添加到swagger中
    //调用Index的doAJAX
    doAJAX(METHOD_PUT, 'http://localhost:8686/project', swagger, function (result) {
        if (result.code == 200) {
            console.log("修改成功");
            self.location = "./index.html?pid=" + swagger.key;
        } else {
            console.log("msg:" + result.msg + " ,data:");
            console.log(result.data);
            confirm("修改项目失败");
        }
    }, function (e) {
        console.log("修改项目失败...");
        console.log(e);
        var state = e.readyState;
        if (state == 0) {
            alert('修改项目需要先启动服务器,请在当前目录双击start.bat');
        } else {
            confirm('修改项目失败了');
        }
    });
}
/**
 * 删除项目
 * @param id
 */
function deletProject(id) {
    if (confirm('确定删除该项目吗?')) {
        doAJAX(METHOD_DELETE, 'http://localhost:8686/project/' + id, null, function (result) {
            if (result.code == 200) {
                console.log("删除成功");
                location.reload();
            } else {
                confirm("删除项目失败");
                console.log("msg:" + result.msg + " ,data:");
                console.log(result.data);
                location.reload();
            }
        }, function (e) {
            console.log("删除项目失败...");
            console.log(e);
            var state = e.readyState;
            if (state == 0) {
                alert('删除项目需要先启动服务器,请在当前目录双击start.bat');
            } else {
                confirm('删除项目失败了');
            }
        });
    }
}
/**
 * 获取分组消息,给方法只获取新增时所需的数据,id等其他数据需要在调用该方法后获取
 * @returns {{}}
 */
function getApiGroupInfo() {
    var name = $("#api_group_name").val();
    var summary = $("#api_group_summary").val();
    //分组消息的信息
    var group = {};
    group.name = name;
    group.summary = summary;
    var description = $("#api_group_description").val();
    if (description != '') {
        group.description = description;
    }
    //拓展文档
    var docs = {};
    var docs_description = $("#api_group_externalDocs_description").val();
    if (docs_description != '') {
        docs.description = docs_description;
    }
    var docs_url = $("#api_group_externalDocs_url").val();
    if (docs_url != '') {
        docs.url = docs_url;
    }
    if (!jQuery.isEmptyObject(docs)) {
        group.externalDocs = JSON.stringify(docs);
    }
    return group
}

/**
 * 新建接口分组
 */
function createApiGroup() {
    var projectId = $("#hide_project_id").val();
    var group = getApiGroupInfo();
    group.projectId = projectId;
    if (group.name == '' || group.summary == '') {
        alert('分组的名称与简介为必填项!');
        return;
    }
    doAJAX(METHOD_POST, 'http://localhost:8686/apiGroup', group, function (result) {
        if (result.code == 200) {
            console.log('新增分组成功');
            location.reload();
        } else {
            console.log("msg:" + result.msg + " ,data:");
            console.log(result.data);
            confirm("新增分组失败");
            location.reload();
        }
    }, function (e) {
        console.log("新增分组失败...");
        console.log(e);
        var state = e.readyState;
        if (state == 0) {
            alert('新增分组需要先启动服务器,请在当前目录双击start.bat');
        }
    });
}
/**
 * 加载分组要修改的信息
 * @param id
 */
function loadUpdateApiGroup(id) {
    doAJAX(METHOD_GET, 'http://localhost:8686/apiGroup/' + id, null, function (result) {
        if (result.code == 200) {
            console.log('加载接口分组修改数据成功!');
            if (IS_DEBUG_ENABLED) {
                console.log(result.data)
            }
            updateApiGroupShow(result.data);
        } else {
            console.log("msg:" + result.msg + " ,data:");
            console.log(result.data);
            confirm("加载接口分组修改数据失败");
        }
    }, function (e) {
        console.log("加载接口分组修改数据失败...");
        console.log(e);
        var state = e.readyState;
        if (state == 0) {
            alert('加载项目接口分组修改数据需要先启动服务器,请在当前目录双击start.bat');
        }
    });
}

/**
 * 修改接口分组
 */
function updateApiGroup() {
    var group = getApiGroupInfo();
    group.groupId = $("#hide_api_group_id").val();
    if (group.groupId == '' || group.name == '' || group.summary == '') {
        alert('分组的名称与简介为必填项!');
        return;
    }
    if (group.description == null) {
        group.description = "";
    }
    if (group.externalDocs == null || group.externalDocs == '') {
        group.externalDocs = "{}";
    }
    if (IS_DEBUG_ENABLED) {
        console.log(group);
    }
    doAJAX(METHOD_PUT, 'http://localhost:8686/apiGroup', group, function (result) {
        if (result.code == 200) {
            console.log('修改接口分组修改数据成功!');
            refreshApiGroupInfo(group);
        } else {
            console.log("msg:" + result.msg + " ,data:");
            console.log(result.data);
            confirm("修改接口分组修改数据失败");
        }
    }, function (e) {
        console.log("修改接口分组修改数据失败...");
        console.log(e);
        var state = e.readyState;
        if (state == 0) {
            alert('修改接口分组修改数据需要先启动服务器,请在当前目录双击start.bat');
        }
    });
}
/**
 * 删除接口分组
 * @param id
 */
function deleteApiGroup(id) {
    if (confirm('确定删除该接口分组?')) {
        doAJAX(METHOD_DELETE, 'http://localhost:8686/apiGroup/' + id, null, function (result) {
            if (result.code == 200) {
                console.log('删除接口分组成功!');
                location.reload();
            } else {
                console.log("msg:" + result.msg + " ,data:");
                console.log(result.data);
                confirm("删除接口分组失败");
                location.reload();
            }
        }, function (e) {
            console.log("删除接口分组失败...");
            console.log(e);
            var state = e.readyState;
            if (state == 0) {
                alert('删除接口分组需要先启动服务器,请在当前目录双击start.bat');
            }
        });
    }
}
















