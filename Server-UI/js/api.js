/**
 * Created by Mirren on 2018/10/26.
 */
/**
 * 新建API
 */
function createApi() {
    var api = getApiInfo();
    if (IS_DEBUG_ENABLED) {
        console.log('API data is:');
        console.log(api);
    }
    if (api == null) {
        return;
    }
    doAJAX(METHOD_POST, 'http://localhost:8686/api', api, function (result) {
        if (result.code == 200) {
            console.log('新增接口成功');
            alert('新增接口成功');
        } else {
            console.log("msg:" + result.msg + " ,data:");
            console.log(result.data);
            alert("新增接口失败");
        }
    }, function (e) {
        console.log("新增接口失败...");
        console.log(e);
        var state = e.readyState;
        if (state == 0) {
            alert('新增接口需要先启动服务器,请在当前目录双击start.bat');
        }
    });
}

/**
 * 删除接口
 * @param id
 */
function deleteApi(id) {
    if (confirm('确定删除该接口?')) {
        doAJAX(METHOD_DELETE, 'http://localhost:8686/api/' + id, null, function (result) {
            if (result.code == 200) {
                console.log('删除接口成功!');
                location.reload();
            } else {
                console.log("msg:" + result.msg + " ,data:");
                console.log(result.data);
                alert("删除接口失败");
                location.reload();
            }
        }, function (e) {
            console.log("删除接口失败...");
            console.log(e);
            var state = e.readyState;
            if (state == 0) {
                alert('删除接口需要先启动服务器,请在当前目录双击start.bat');
            }
        });
    }
}



