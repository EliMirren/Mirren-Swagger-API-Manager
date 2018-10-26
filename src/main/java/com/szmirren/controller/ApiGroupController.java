package com.szmirren.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.szmirren.entity.ProjectApi;
import com.szmirren.entity.ProjectApiGroup;
import com.szmirren.service.ProjectService;

@CrossOrigin
@RestController
public class ApiGroupController {
	/** 项目服务接口 */
	@Autowired
	private ProjectService proService;

	/**
	 * 获取指定项目的所有接口分组
	 * 
	 * @return
	 */
	@GetMapping(value = "/project/apiGroup/{projectId}", produces = {"application/json;charset=UTF-8"})
	public Map<String, Object> getGroupsByProjectId(@PathVariable(value = "projectId") String projectId) {
		return proService.getApiGroupList(projectId);
	}
	/**
	 * 获取指定接口分组的数据
	 * 
	 * @param groupId
	 * @return
	 */
	@GetMapping(value = "/apiGroup/{groupId}", produces = {"application/json;charset=UTF-8"})
	public Map<String, Object> getGroupsById(@PathVariable(value = "groupId") String groupId) {
		return proService.getApiGroup(groupId);
	}
	/**
	 * 保存接口分组
	 * 
	 * @return
	 */
	@PostMapping(value = "/apiGroup", produces = {"application/json;charset=UTF-8"})
	public Map<String, Object> saveApiGroup(ProjectApiGroup group) {
		return proService.saveApiGroup(group);
	}
	/**
	 * 修改接口分组
	 * 
	 * @param group
	 * @return
	 */
	@PutMapping(value = "/apiGroup", produces = {"application/json;charset=UTF-8"})
	public Map<String, Object> updateApiGroup(ProjectApiGroup group) {
		return proService.updateApiGroup(group);
	}
	/**
	 * 删除接口分组
	 * 
	 * @param groupId
	 * @return
	 */
	@DeleteMapping(value = "/apiGroup/{groupId}", produces = {"application/json;charset=UTF-8"})
	public Map<String, Object> daleteApiGroup(@PathVariable(value = "groupId") String groupId) {
		return proService.deleteApiGroup(groupId);
	}

	/**
	 * 获取指定接口分组的数据
	 * 
	 * @param groupId
	 * @return
	 */
	@GetMapping(value = "/api/{apiId}", produces = {"application/json;charset=UTF-8"})
	public Map<String, Object> getApiById(@PathVariable(value = "apiId") String apiId) {
		return proService.getApi(apiId);
	}
	/**
	 * 保存接口分组
	 * 
	 * @return
	 */
	@PostMapping(value = "/api", produces = {"application/json;charset=UTF-8"})
	public Map<String, Object> saveApi(ProjectApi api) {
		return proService.saveApi(api);
	}
	/**
	 * 修改接口分组
	 * 
	 * @param group
	 * @return
	 */
	@PutMapping(value = "/api", produces = {"application/json;charset=UTF-8"})
	public Map<String, Object> updateApi(ProjectApi api) {
		return proService.updateApi(api);
	}

	@DeleteMapping(value = "/api/{apiId}", produces = {"application/json;charset=UTF-8"})
	public Map<String, Object> daleteApi(@PathVariable(value = "apiId") String apiId) {
		return proService.deleteApi(apiId);
	}

}
