package com.szmirren.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.szmirren.common.ConfigUtil;
import com.szmirren.common.ResultUtil;
import com.szmirren.common.StringUtil;
import com.szmirren.entity.Project;
import com.szmirren.entity.ProjectApi;
import com.szmirren.entity.ProjectApiGroup;
import com.szmirren.entity.ProjectInfo;
import com.szmirren.service.ProjectService;
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

}
