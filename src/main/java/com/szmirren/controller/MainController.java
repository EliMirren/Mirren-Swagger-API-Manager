package com.szmirren.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.szmirren.common.ConfigUtil;
import com.szmirren.common.ResultUtil;
import com.szmirren.entity.Project;
import com.szmirren.entity.ProjectInfo;
@CrossOrigin
@RestController
public class MainController {
	/**
	 * 获取所有项目
	 * 
	 * @return
	 */
	@GetMapping(value = "/project", produces = {"application/json;charset=UTF-8"})
	public Map<String, Object> getList() {
		try {
			List<ProjectInfo> list = ConfigUtil.getProjectList();
			return ResultUtil.succeed(list);
		} catch (Exception e) {
			System.err.println(e);
			return ResultUtil.failed(e.getMessage());
		}
	}
	/**
	 * 添加一个项目
	 * 
	 * @return
	 */
	@PostMapping(value = "/project", produces = {"application/json;charset=UTF-8"})
	public Map<String, Object> postProject(String body) {
		try {
			System.out.println(body);
			ConfigUtil.saveProject(new Project().setInfo(body));
			return ResultUtil.succeed(1);
		} catch (Exception e) {
			System.err.println(e);
			return ResultUtil.failed(e.getMessage());
		}
	}

}
