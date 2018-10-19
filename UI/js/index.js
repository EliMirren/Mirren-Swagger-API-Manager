/**
 * Created by Mirren on 2018/10/19.
 */

/**加载项目列表*/
function loadProject() {

}

/**创建项目*/
function createProject() {
    var title=$('#info_title').val();
    var version = $('#info_version').val();
    if(title==''||version==''){
        alert('项目名称与版本号为必填项');
        hideCreateProject();
        return;
    }
    //资料
    var info={};
    info.title=title;
    info.version=version;
    var info_description = $('#info_description').val();
    if(info_description!=''){
        info.description=info_description;
    }
    var info_termsOfService = $('#info_termsOfService').val();
    if(info_termsOfService!=''){
        info.termsOfService=info_termsOfService;
    }

    //联系方式
    var contact={};
    var info_contact_name = $('#info_contact_name').val();
    if(info_contact_name!=''){
        contact.name=info_contact_name;
    }
    var info_contact_url = $('#info_contact_url').val();
    if(info_contact_url!=''){
        contact.url=info_contact_url;
    }
    var info_contact_email = $('#info_contact_email').val();
    if(info_contact_email!=''){
        contact.email=info_contact_email;
    }
    if(!jQuery.isEmptyObject(contact)){
        info.contact=contact;
    }
    //协议
    var license={};
    var info_license_name = $('#info_license_name').val();
    if(info_license_name!=''){
        license.name=info_license_name;
    }
    var info_license_url = $('#info_license_url').val();
    if(info_license_url!=''){
        license.url=info_license_url;
    }
    if(!jQuery.isEmptyObject(license)){
        info.license=license;
    }
    console.log(info);
    

    // hideCreateProject();
}
/**显示或者隐藏新建项目文本框*/
function hideCreateProject() {
    $('#create-project-modal').modal('hide')
}



