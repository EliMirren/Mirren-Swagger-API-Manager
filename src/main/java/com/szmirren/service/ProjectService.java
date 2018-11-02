package com.szmirren.service;
/**
 * 项目的服务接口
 * 
 * @author <a href="http://szmirren.com">Mirren</a>
 *
 */

import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import com.szmirren.entity.Project;
import com.szmirren.entity.ProjectApi;
import com.szmirren.entity.ProjectApiGroup;

public interface ProjectService {
	/**
	 * 获取项目列表
	 * 
	 * @return
	 */
	Map<String, Object> getProjectList();
	/**
	 * 获取项目
	 * 
	 * @param id
	 *          项目的id
	 * @return
	 */
	Map<String, Object> getProject(String id);

	/**
	 * 保存项目
	 * 
	 * @param project
	 * @return
	 */
	Map<String, Object> saveProject(Project project);
	/**
	 * 复制一份项目
	 * 
	 * @param key
	 * @return
	 */
	Map<String, Object> copyProject(String key);
	/**
	 * 更新项目
	 * 
	 * @param project
	 * @return
	 */
	Map<String, Object> updateProject(Project project);
	/**
	 * 更新项目
	 * 
	 * @param key
	 * @return
	 */
	Map<String, Object> deleteProject(String key);

	/**
	 * 获取指定Project的接口分组
	 * 
	 * @param projectId
	 * @return
	 */
	Map<String, Object> getApiGroupList(String projectId);
	/**
	 * 获取指定的接口分组
	 * 
	 * @param projectId
	 * @return
	 */
	Map<String, Object> getApiGroup(String groupId);

	/**
	 * 获取指定Project的接口分组
	 * 
	 * @param group
	 * @return
	 */
	Map<String, Object> saveApiGroup(ProjectApiGroup group);
	/**
	 * 修改指定Project的接口分组
	 * 
	 * @param group
	 * @return
	 */
	Map<String, Object> updateApiGroup(ProjectApiGroup group);
	/**
	 * 删除指定Project的接口分组
	 * 
	 * @param groupId
	 * @return
	 */
	Map<String, Object> deleteApiGroup(String groupId);
	/**
	 * 新增接口
	 * 
	 * @param api
	 * @return
	 */
	Map<String, Object> saveApi(ProjectApi api);
	/**
	 * 通过id获取接口
	 * 
	 * @param apiId
	 * @return
	 */
	Map<String, Object> getApi(String apiId);
	/**
	 * 更新接口
	 * 
	 * @param api
	 * @return
	 */
	Map<String, Object> updateApi(ProjectApi api);
	/**
	 * 通过API删除指定接口
	 * 
	 * @param apiId
	 * @return
	 */
	Map<String, Object> deleteApi(String apiId);

	/**
	 * 获得Swagger的JSON字符串
	 * 
	 * @param projectId
	 * @return
	 */
	String getSwaggerJson(String projectId);

	/**
	 * 下载Swagger的JSON文件
	 * 
	 * @param response
	 * @param projectId
	 *          项目的id
	 */
	void downSwaggerJson(HttpServletResponse response, String projectId);

}
