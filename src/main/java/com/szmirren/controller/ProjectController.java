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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.szmirren.common.Constant;
import com.szmirren.entity.Project;
import com.szmirren.entity.RequestData;
import com.szmirren.service.HttpApiProxy;
import com.szmirren.service.ProjectService;
@CrossOrigin
@RestController
public class ProjectController {

	/** 项目服务接口 */
	@Autowired
	private ProjectService proService;
	@Autowired
	private HttpApiProxy apiProxy;
	/**
	 * 
	 * @return
	 */
	@RequestMapping(value = {"/", "/index.html"}, produces = {"text/html;charset=UTF-8"})
	public String index(HttpServletResponse response) {
		response.addHeader("title", Constant.MSAM_NAME);
		return "<h1 style='text-align: center;'>欢迎使用" + Constant.MSAM_MIN_NAME + "</h1>" + "	<h1 style='text-align: center;'>"
				+ Constant.MSAM_NAME_VERSION + "</h1>"
				+ "	<h2 style='text-align: center;'><a href='/Server-UI/index.html'>服务端UI</a> <a style='margin-left:10px' href='/Client-UI/index.html'>客户端UI</a></h2>";
	}

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
	 * 代理执行
	 * 
	 * @return
	 */
	@PostMapping(value = "/proxy", produces = {"application/json;charset=UTF-8"})
	public Map<String, Object> proxy(RequestData data) {
		Map<String, Object> result = apiProxy.executeProxy(data);
		return result;
	}
	/**
	 * 代理获取获取所有项目
	 * 
	 * @return
	 */
	@GetMapping(value = "/proxy/project", produces = {"application/json;charset=UTF-8"})
	public Map<String, Object> proxyGetProject(String url) {
		Map<String, Object> result = apiProxy.getProxy(url);
		return result;
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
	@PostMapping(value = "/project/copy/{id}", produces = {"application/json;charset=UTF-8"})
	public Map<String, Object> copyProject(@PathVariable(value = "id") String id) {
		return proService.copyProject(id);
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
	/**
	 * 下载项目Json文件
	 * 
	 * @param response
	 * @param id
	 */
	@GetMapping(value = "/project/downJson/{id}")
	public void downProject(HttpServletResponse response, @PathVariable(value = "id") String id) {
		proService.downSwaggerJson(response, id);
	}
	/**
	 * 获取项目Json文件
	 * 
	 * @param id
	 * @return
	 */
	@GetMapping(value = "/project/getJson/{id}", produces = {"application/json;charset=UTF-8"})
	public String getProjectJson(@PathVariable(value = "id") String id) {
		return proService.getSwaggerJson(id);
	}

}
