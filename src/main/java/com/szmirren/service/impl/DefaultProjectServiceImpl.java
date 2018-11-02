package com.szmirren.service.impl;

import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.szmirren.common.ConfigUtil;
import com.szmirren.common.ResultUtil;
import com.szmirren.common.StringUtil;
import com.szmirren.common.SwaggerConverter;
import com.szmirren.entity.Project;
import com.szmirren.entity.ProjectApi;
import com.szmirren.entity.ProjectApiGroup;
import com.szmirren.entity.ProjectInfo;
import com.szmirren.service.ProjectService;

import io.swagger.models.Swagger;
import io.swagger.util.Json;
@Service
public class DefaultProjectServiceImpl implements ProjectService {

	@Override
	public Map<String, Object> getProjectList() {
		try {
			List<ProjectInfo> list = ConfigUtil.getProjectList();
			return ResultUtil.succeed(list);
		} catch (Throwable e) {
			e.printStackTrace();
			return ResultUtil.failed(e.getMessage());
		}
	}

	@Override
	public Map<String, Object> getProject(String id) {
		try {
			Project project = ConfigUtil.getProject(id);
			return ResultUtil.succeed(project);
		} catch (Throwable e) {
			e.printStackTrace();
			return ResultUtil.failed(e.getMessage());
		}

	}

	@Override
	public Map<String, Object> saveProject(Project project) {
		try {
			if (StringUtil.isNullOrEmpty(project.getHost(), project.getInfo())) {
				return ResultUtil.failed("存在空值,host与info都为必填");
			}
			ConfigUtil.saveProject(project);
			return ResultUtil.succeed(1);
		} catch (Exception e) {
			e.printStackTrace();
			return ResultUtil.failed(e.getMessage());
		}
	}

	@Override
	public Map<String, Object> copyProject(String key) {
		try {
			if (StringUtil.isNullOrEmpty(key)) {
				return ResultUtil.failed("存在空值,项目的id为必填");
			}
			Project project = ConfigUtil.getProject(key);
			project.setKey(UUID.randomUUID().toString());
			JSONObject info = new JSONObject(project.getInfo());
			if (info.has("title")) {
				info.put("title", info.getString("title") + "_副本");
			} else {
				info.put("title", "_副本");
			}
			project.setInfo(info.toString());
			List<ProjectApiGroup> groups = ConfigUtil.getProjectApiGroups(key);
			if (groups != null && !groups.isEmpty()) {
				for (ProjectApiGroup g : groups) {
					String gid = new String(g.getGroupId());
					g.setProjectId(project.getKey());
					g.setGroupId(UUID.randomUUID().toString());
					ConfigUtil.saveProjectApiGroup(g);
					List<ProjectApi> apiList = ConfigUtil.getProjectApiList(gid);
					if (apiList != null && !apiList.isEmpty()) {
						for (ProjectApi api : apiList) {
							api.setGroupId(g.getGroupId());
							api.setOperationId(UUID.randomUUID().toString());
							ConfigUtil.saveProjectApi(api);
						}
					}
				}
			}
			ConfigUtil.saveProject(project);
			return ResultUtil.succeed(1);
		} catch (Throwable e) {
			e.printStackTrace();
			return ResultUtil.failed(e.getMessage());
		}
	}

	@Override
	public Map<String, Object> updateProject(Project project) {
		try {
			if (StringUtil.isNullOrEmpty(project.getKey(), project.getHost(), project.getInfo())) {
				System.out.println(project);
				return ResultUtil.failed("存在空值,host,info,key都为必填");
			}
			ConfigUtil.updateProject(project);
			return ResultUtil.succeed(1);
		} catch (Exception e) {
			e.printStackTrace();
			return ResultUtil.failed(e.getMessage());
		}
	}

	@Override
	public Map<String, Object> deleteProject(String key) {
		try {
			if (StringUtil.isNullOrEmpty(key)) {
				return ResultUtil.failed("存在空值,项目的id不能为空");
			}
			ConfigUtil.delectProject(key);
			return ResultUtil.succeed(1);
		} catch (Throwable e) {
			e.printStackTrace();
			return ResultUtil.failed(e.getMessage());
		}
	}
	@Override
	public Map<String, Object> getApiGroupList(String projectId) {
		try {
			if (StringUtil.isNullOrEmpty(projectId)) {
				return ResultUtil.failed("存在空值,项目的id不能为空");
			}
			List<ProjectApiGroup> result = ConfigUtil.getProjectApiGroupList(projectId);
			return ResultUtil.succeed(result);
		} catch (Exception e) {
			e.printStackTrace();
			return ResultUtil.failed(e.getMessage());
		}
	}
	@Override
	public Map<String, Object> getApiGroup(String groupId) {
		try {
			if (StringUtil.isNullOrEmpty(groupId)) {
				return ResultUtil.failed("存在空值,项目的id不能为空");
			}
			ProjectApiGroup result = ConfigUtil.getProjectApiGroup(groupId);
			return ResultUtil.succeed(result);
		} catch (Throwable e) {
			e.printStackTrace();
			return ResultUtil.failed(e.getMessage());
		}
	}

	@Override
	public Map<String, Object> saveApiGroup(ProjectApiGroup group) {
		try {
			ConfigUtil.saveProjectApiGroup(group);
			return ResultUtil.succeed(1);
		} catch (Exception e) {
			e.printStackTrace();
			return ResultUtil.failed(e.getMessage());
		}

	}

	@Override
	public Map<String, Object> updateApiGroup(ProjectApiGroup group) {

		try {
			if (StringUtil.isNullOrEmpty(group.getGroupId())) {
				return ResultUtil.failed("存在空值,分组的id不能为空");
			}
			ConfigUtil.updateProjectApiGroup(group);
			return ResultUtil.succeed(1);
		} catch (Exception e) {
			e.printStackTrace();
			return ResultUtil.failed(e.getMessage());
		}

	}

	@Override
	public Map<String, Object> deleteApiGroup(String groupId) {
		try {
			if (StringUtil.isNullOrEmpty(groupId)) {
				return ResultUtil.failed("存在空值,分组的id不能为空");
			}
			ConfigUtil.delectProjectApiGroup(groupId);
			return ResultUtil.succeed(1);
		} catch (Exception e) {
			e.printStackTrace();
			return ResultUtil.failed(e.getMessage());
		}
	}

	@Override
	public Map<String, Object> saveApi(ProjectApi api) {
		try {
			if (StringUtil.isNullOrEmpty(api.getGroupId())) {
				return ResultUtil.failed("存在空值,分组的id不能为空");
			}
			ConfigUtil.saveProjectApi(api);
			return ResultUtil.succeed(1);
		} catch (Throwable e) {
			e.printStackTrace();
			return ResultUtil.failed(e.getMessage());
		}
	}

	@Override
	public Map<String, Object> getApi(String apiId) {
		try {
			if (StringUtil.isNullOrEmpty(apiId)) {
				return ResultUtil.failed("存在空值,id不能为空");
			}
			ProjectApi result = ConfigUtil.getProjectApi(apiId);
			return ResultUtil.succeed(result);
		} catch (Throwable e) {
			e.printStackTrace();
			return ResultUtil.failed(e.getMessage());
		}
	}

	@Override
	public Map<String, Object> updateApi(ProjectApi api) {
		try {
			ConfigUtil.updateProjectApi(api);
			return ResultUtil.succeed(1);
		} catch (Throwable e) {
			e.printStackTrace();
			return ResultUtil.failed(e.getMessage());
		}
	}

	@Override
	public Map<String, Object> deleteApi(String apiId) {
		try {
			if (StringUtil.isNullOrEmpty(apiId)) {
				return ResultUtil.failed("存在空值,id不能为空");
			}
			ConfigUtil.deleteProjectApi(apiId);
			return ResultUtil.succeed(1);
		} catch (Throwable e) {
			e.printStackTrace();
			return ResultUtil.failed(e.getMessage());
		}
	}

	@Override
	public String getSwaggerJson(String pid) {
		try {
			Project project = ConfigUtil.getProject(pid);
			Swagger swagger = new Swagger();
			swagger.setSwagger(project.getSwagger());
			swagger.setInfo(SwaggerConverter.toInfo(project));
			swagger.setHost(project.getHost());
			swagger.setBasePath(project.getBasePath());
			List<ProjectApiGroup> projectApiGroupList = ConfigUtil.getProjectApiGroupList(pid);
			SwaggerConverter.toTagsAndPaths(swagger, projectApiGroupList);
			swagger.setSchemes(SwaggerConverter.toSchemes(project));
			swagger.setConsumes(SwaggerConverter.toConsumes(project));
			swagger.setProduces(SwaggerConverter.toProduces(project));
			swagger.setSecurity(SwaggerConverter.toSecurity(project));
			swagger.setSecurityDefinitions(SwaggerConverter.toSecurityDefinitions(project));
			swagger.setDefinitions(SwaggerConverter.toDefinitions(project));
			swagger.setParameters(SwaggerConverter.toParameters(project));
			swagger.setResponses(SwaggerConverter.toResponse(project));
			swagger.setExternalDocs(SwaggerConverter.toExternalDocs(project));
			swagger.setVendorExtensions(SwaggerConverter.toVendorExtensions(project));
			String pretty = Json.pretty(swagger);
			return pretty;
		} catch (Throwable e) {
			e.printStackTrace();
			String msg = e == null ? "无法追踪错误" : e.getMessage();
			return "{\"error\":\"" + msg + "\"}";
		}

	}

	@Override
	public void downSwaggerJson(HttpServletResponse response, String pid) {
		try {
			response.setContentType("application/force-download;charset=UTF-8");
			String time = LocalDateTime.now().format(DateTimeFormatter.BASIC_ISO_DATE);
			String fileName = "MSAM_Swagger" + time + ".json";
			response.addHeader("Content-Disposition", "attachment;fileName=" + fileName);
			String swagger = getSwaggerJson(pid);
			try (PrintWriter writer = response.getWriter()) {
				String pretty = Json.pretty(swagger);
				writer.write(pretty);
			}
		} catch (Throwable e) {
			e.printStackTrace();
		}
	}
}
