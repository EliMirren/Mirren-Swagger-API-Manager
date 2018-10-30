package com.szmirren.controller;

import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.szmirren.entity.Project;
import com.szmirren.service.ProjectService;
@CrossOrigin
@RestController
public class ProjectController {

	/** 项目服务接口 */
	@Autowired
	private ProjectService proService;

	/**
	 * 获取所有项目
	 * 
	 * @return
	 */
	@GetMapping(value = "/project", produces = {"application/json;charset=UTF-8"})
	public Map<String, Object> getProjectList() {
		return proService.getProjectList();
	}
	/**
	 * 获取所有项目
	 * 
	 * @return
	 */
	@GetMapping(value = "/project/{id}", produces = {"application/json;charset=UTF-8"})
	public Map<String, Object> getProject(@PathVariable(value = "id") String id) {
		return proService.getProject(id);
	}
	/**
	 * 添加一个项目
	 * 
	 * @return
	 */
	@PostMapping(value = "/project", produces = {"application/json;charset=UTF-8"})
	public Map<String, Object> postProject(Project project) {
		return proService.saveProject(project);
	}
	/**
	 * 删除一个项目
	 * 
	 * @return
	 */
	@PutMapping(value = "/project", produces = {"application/json;charset=UTF-8"})
	public Map<String, Object> updateProject(Project project) {
		return proService.updateProject(project);
	}
	/**
	 * 删除项目
	 * 
	 * @return
	 */
	@DeleteMapping(value = "/project/{id}", produces = {"application/json;charset=UTF-8"})
	public Map<String, Object> postProject(@PathVariable(value = "id") String id) {
		return proService.deleteProject(id);
	}
	@GetMapping(value = "/project/downJson/{id}")
	public void downProject(HttpServletResponse response, @PathVariable(value = "id") String id) {
		proService.downSwaggerJson(response, id);
	}
	@GetMapping(value = "/project/getJson/{id}", produces = {"application/json;charset=UTF-8"})
	public String getProjectJson(@PathVariable(value = "id") String id) {
		return proService.getSwaggerJson(id);
	}

}
