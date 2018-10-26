package com.szmirren.common;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.function.Function;

import org.json.JSONObject;

import com.szmirren.entity.Project;
import com.szmirren.entity.ProjectApi;
import com.szmirren.entity.ProjectApiGroup;
import com.szmirren.entity.ProjectInfo;

public class ConfigUtil {
	private static final String DRIVER = "org.sqlite.JDBC";
	private static final String DB_URL = "jdbc:sqlite:" + System.getProperty("user.dir") + "/config/ConfigDB.db";
	/**
	 * 获得数据库连接
	 * 
	 * @return
	 * @throws Exception
	 */
	public static Connection getConnection() throws Exception {
		Class.forName(DRIVER);
		Connection conn = DriverManager.getConnection(DB_URL);
		return conn;
	}

	/**
	 * 执行查询
	 * 
	 * @param sql
	 *          SQL语句
	 * @param handler
	 *          返回结果
	 */
	public static <R> FunctionResult<R> query(String sql, Function<ResultSet, FunctionResult<R>> handler) throws Exception {
		try (Connection conn = getConnection()) {
			try (Statement stat = conn.createStatement()) {
				try (ResultSet set = stat.executeQuery(sql)) {
					return handler.apply(set);
				}
			}
		}
	}
	/**
	 * 执行查询
	 * 
	 * @param sql
	 *          SQL语句
	 * @param params
	 *          参数 不能为null
	 * @return
	 * @throws Exception
	 */
	public static <R> FunctionResult<R> query(String sql, List<Object> params, Function<ResultSet, FunctionResult<R>> handler)
			throws Exception {
		try (Connection conn = getConnection()) {
			try (PreparedStatement stat = conn.prepareStatement(sql)) {
				for (int i = 0; i < params.size(); i++) {
					stat.setObject((i + 1), params.get(i));
				}
				try (ResultSet set = stat.executeQuery()) {
					return handler.apply(set);
				}
			}
		}
	}
	/**
	 * 执行更新操作
	 * 
	 * @param sql
	 *          SQL语句
	 * @return
	 * @throws Exception
	 */
	public static int update(String sql) throws Exception {
		try (Connection conn = getConnection()) {
			try (Statement stat = conn.createStatement()) {
				return stat.executeUpdate(sql);
			}
		}
	}
	/**
	 * 执行更新操作
	 * 
	 * @param sql
	 *          SQL语句
	 * @param params
	 *          参数,不能为null
	 * @return
	 * @throws Exception
	 */
	public static int update(String sql, List<Object> params) throws Exception {
		try (Connection conn = getConnection()) {
			try (PreparedStatement stat = conn.prepareStatement(sql)) {
				for (int i = 0; i < params.size(); i++) {
					stat.setObject((i + 1), params.get(i));
				}
				return stat.executeUpdate();
			}
		}
	}
	/**
	 * 执行更新并返回主键
	 * 
	 * @param sql
	 *          SQL语句
	 * @param params
	 *          参数,不能为null
	 * @return
	 * @throws Exception
	 */
	public static UpdateResult updateGeneratedKeys(String sql, List<Object> params) throws Exception {
		try (Connection conn = getConnection()) {
			try (PreparedStatement stat = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
				for (int i = 0; i < params.size(); i++) {
					stat.setObject((i + 1), params.get(i));
				}
				int executeUpdate = stat.executeUpdate();
				try (ResultSet set = stat.getGeneratedKeys()) {
					List<Object> keys = new ArrayList<>();
					while (set.next()) {
						keys.add(set.getObject(1));
					}
					return new UpdateResult(executeUpdate, keys);
				}
			}
		}
	}

	/**
	 * 获取项目
	 * 
	 * @param id
	 *          项目的id
	 * @return
	 * @throws Throwable
	 */
	public static Project getProject(String id) throws Throwable {
		String sql = String.format("select * from project where %s = ?", ProjectColumns.KEY);
		FunctionResult<Project> execute = query(sql, StringUtil.asList(id), resultSet -> {
			Project project = new Project();
			try {
				if (resultSet.next()) {
					project.setKey(resultSet.getString(ProjectColumns.KEY));
					project.setSwagger(resultSet.getString(ProjectColumns.SWAGGER));
					project.setInfo(resultSet.getString(ProjectColumns.INFO));
					project.setHost(resultSet.getString(ProjectColumns.HOST));
					project.setBasePath(resultSet.getString(ProjectColumns.BASE_PATH));
					project.setSchemes(resultSet.getString(ProjectColumns.SCHEMES));
					project.setConsumes(resultSet.getString(ProjectColumns.CONSUMES));
					project.setProduces(resultSet.getString(ProjectColumns.PRODUCES));
					project.setSecurity(resultSet.getString(ProjectColumns.SECURITY));
					project.setSecurityDefinitions(resultSet.getString(ProjectColumns.SECURITY_DEFINITIONS));
					project.setDefinitions(resultSet.getString(ProjectColumns.DEFINITIONS));
					project.setParameters(resultSet.getString(ProjectColumns.PARAMETERS));
					project.setResponses(resultSet.getString(ProjectColumns.RESPONSES));
					project.setExternalDocs(resultSet.getString(ProjectColumns.EXTERNAL_DOCS));
					project.setVendorExtensions(resultSet.getString(ProjectColumns.VENDOR_EXTENSIONS));
				}
				return new FunctionResult<>(project);
			} catch (SQLException e) {
				return new FunctionResult<>(e);
			}
		});

		if (execute.succeeded()) {
			return execute.result();
		} else {
			throw execute.cause();
		}

	}

	/**
	 * 获取所有项目
	 * 
	 * @param id
	 * @return
	 * @throws Throwable
	 */
	public static List<ProjectInfo> getProjectList() throws Throwable {
		String sql = "select * from project";
		FunctionResult<List<ProjectInfo>> execute = query(sql, resultSet -> {
			try {
				List<ProjectInfo> result = new ArrayList<>();
				while (resultSet.next()) {
					ProjectInfo projectInfo = new ProjectInfo();
					projectInfo.setKey(resultSet.getString(ProjectColumns.KEY));
					JSONObject info = new JSONObject(resultSet.getString(ProjectColumns.INFO));
					projectInfo.setName(info.getString("title"));
					projectInfo.setVersion(info.getString("version"));
					result.add(projectInfo);
				}
				return new FunctionResult<>(result);
			} catch (Exception e) {
				return new FunctionResult<>(e);
			}
		});

		if (execute.succeeded()) {
			return execute.result();
		} else {
			throw execute.cause();
		}
	}

	/**
	 * 保存项目
	 * 
	 * @param project
	 * @throws Exception
	 */
	public static void saveProject(Project project) throws Exception {
		String sql = String.format("insert into project (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
				ProjectColumns.KEY, ProjectColumns.SWAGGER, ProjectColumns.INFO, ProjectColumns.HOST, ProjectColumns.BASE_PATH,
				ProjectColumns.SCHEMES, ProjectColumns.CONSUMES, ProjectColumns.PRODUCES, ProjectColumns.SECURITY,
				ProjectColumns.SECURITY_DEFINITIONS, ProjectColumns.DEFINITIONS, ProjectColumns.PARAMETERS, ProjectColumns.RESPONSES,
				ProjectColumns.EXTERNAL_DOCS, ProjectColumns.VENDOR_EXTENSIONS);
		List<Object> params = new ArrayList<>();
		params.add(StringUtil.isNullOrEmpty(project.getKey()) ? UUID.randomUUID().toString() : project.getKey());
		params.add(project.getSwagger());
		params.add(project.getInfo());
		params.add(project.getHost());
		params.add(project.getBasePath());
		params.add(project.getSchemes());
		params.add(project.getConsumes());
		params.add(project.getProduces());
		params.add(project.getSecurity());
		params.add(project.getSecurityDefinitions());
		params.add(project.getDefinitions());
		params.add(project.getParameters());
		params.add(project.getResponses());
		params.add(project.getExternalDocs());
		params.add(project.getVendorExtensions());
		update(sql, params);
	}

	/**
	 * 更新项目
	 * 
	 * @param project
	 * @throws Exception
	 */
	public static void updateProject(Project project) throws Exception {
		StringBuilder set = new StringBuilder("set ");
		List<Object> params = new ArrayList<>();
		if (project.getSwagger() != null) {
			set.append(ProjectColumns.SWAGGER + " = ? ,");
			params.add(project.getSwagger());
		}
		if (project.getInfo() != null) {
			set.append(ProjectColumns.INFO + " = ? ,");
			params.add(project.getInfo());
		}
		if (project.getHost() != null) {
			set.append(ProjectColumns.HOST + " = ? ,");
			params.add(project.getHost());
		}
		if (project.getBasePath() != null) {
			set.append(ProjectColumns.BASE_PATH + " = ? ,");
			params.add(project.getBasePath());
		}
		if (project.getSchemes() != null) {
			set.append(ProjectColumns.SCHEMES + " = ? ,");
			params.add(project.getSchemes());
		}
		if (project.getConsumes() != null) {
			set.append(ProjectColumns.CONSUMES + " = ? ,");
			params.add(project.getConsumes());
		}
		if (project.getProduces() != null) {
			set.append(ProjectColumns.PRODUCES + " = ? ,");
			params.add(project.getProduces());
		}
		if (project.getSecurity() != null) {
			set.append(ProjectColumns.SECURITY + " = ? ,");
			params.add(project.getSecurity());
		}
		if (project.getSecurityDefinitions() != null) {
			set.append(ProjectColumns.SECURITY_DEFINITIONS + " = ? ,");
			params.add(project.getSecurityDefinitions());
		}
		if (project.getDefinitions() != null) {
			set.append(ProjectColumns.DEFINITIONS + " = ? ,");
			params.add(project.getDefinitions());
		}
		if (project.getParameters() != null) {
			set.append(ProjectColumns.PARAMETERS + " = ? ,");
			params.add(project.getParameters());
		}
		if (project.getResponses() != null) {
			set.append(ProjectColumns.RESPONSES + " = ? ,");
			params.add(project.getResponses());
		}

		if (project.getExternalDocs() != null) {
			set.append(ProjectColumns.EXTERNAL_DOCS + " = ? ,");
			params.add(project.getExternalDocs());
		}
		if (project.getVendorExtensions() != null) {
			set.append(ProjectColumns.VENDOR_EXTENSIONS + " = ? ,");
			params.add(project.getVendorExtensions());
		}
		params.add(project.getKey());
		String sql = "update project " + set.substring(0, set.length() - 1) + " where key = ?";
		update(sql, params);

	}
	/**
	 * 删除项目
	 * 
	 * @param key
	 * @throws Throwable
	 */
	public static void delectProject(String key) throws Throwable {
		List<Object> params = new ArrayList<>();
		params.add(key);
		String groupSql = String.format("select %s from project_api_group where %s=?", ApiGroupColumns.GROUP_ID, ApiGroupColumns.PROJECT_ID);
		FunctionResult<List<String>> groupIds = query(groupSql, params, res -> {
			try {
				List<String> result = new ArrayList<>();
				while (res.next()) {
					result.add(res.getString(ApiGroupColumns.GROUP_ID));
				}
				return new FunctionResult<>(result);
			} catch (SQLException e) {
				return new FunctionResult<>(e);
			}
		});
		if (groupIds.succeeded()) {
			for (String gid : groupIds.result()) {
				delectProjectApiGroup(gid);
			}
		} else {
			throw groupIds.cause();
		}

		String sql = String.format("delete from project where %s = ? ", ProjectColumns.KEY);
		update(sql, params);
	}
	/**
	 * 获取指定项目的所有分组
	 * 
	 * @param projectId
	 * @return
	 * @throws Exception
	 */
	public static List<ProjectApiGroup> getProjectApiGroupList(String projectId) throws Exception {
		try (Connection conn = getConnection()) {
			String sql = String.format("select * from project_api_group where %s=?", ApiGroupColumns.PROJECT_ID);
			try (PreparedStatement stat = conn.prepareStatement(sql)) {
				stat.setString(1, projectId);
				try (ResultSet resultSet = stat.executeQuery()) {
					List<ProjectApiGroup> result = new ArrayList<>();
					while (resultSet.next()) {
						ProjectApiGroup group = new ProjectApiGroup();
						group.setGroupId(resultSet.getString(ApiGroupColumns.GROUP_ID));
						group.setProjectId(resultSet.getString(ApiGroupColumns.PROJECT_ID));
						group.setName(resultSet.getString(ApiGroupColumns.NAME));
						group.setSummary(resultSet.getString(ApiGroupColumns.SUMMARY));
						group.setDescription(resultSet.getString(ApiGroupColumns.DESCRIPTION));
						group.setExternalDocs(resultSet.getString(ApiGroupColumns.EXTERNAL_DOCS));
						group.setVendorExtensions(resultSet.getString(ApiGroupColumns.VENDOR_EXTENSIONS));
						String apiSql = String.format("select * from project_api where %s=?", ApiGroupColumns.GROUP_ID);
						try (PreparedStatement statSub = conn.prepareStatement(apiSql)) {
							statSub.setString(1, group.getGroupId());
							try (ResultSet apiResult = statSub.executeQuery()) {
								List<ProjectApi> apiList = new ArrayList<>();
								while (apiResult.next()) {
									ProjectApi api = new ProjectApi();
									api.setOperationId(apiResult.getString(ApiColumns.OPERATION_ID));
									api.setGroupId(apiResult.getString(ApiColumns.GROUP_ID));
									api.setPath(apiResult.getString(ApiColumns.PATH));
									api.setMethod(apiResult.getString(ApiColumns.METHOD));
									api.setTags(apiResult.getString(ApiColumns.TAGS));
									api.setSummary(apiResult.getString(ApiColumns.SUMMARY));
									api.setDescription(apiResult.getString(ApiColumns.DESCRIPTION));
									api.setSchemes(apiResult.getString(ApiColumns.SCHEMES));
									api.setConsumes(apiResult.getString(ApiColumns.CONSUMES));
									api.setProduces(apiResult.getString(ApiColumns.PRODUCES));
									api.setParameters(apiResult.getString(ApiColumns.PARAMETERS));
									api.setResponses(apiResult.getString(ApiColumns.RESPONSES));
									api.setSecurity(apiResult.getString(ApiColumns.SECURITY));
									api.setExternalDocs(apiResult.getString(ApiColumns.EXTERNAL_DOCS));
									api.setDeprecated(apiResult.getString(ApiColumns.DEPRECATED));
									api.setVendorExtensions(apiResult.getString(ApiColumns.VENDOR_EXTENSIONS));
									apiList.add(api);
								}
								group.setApis(apiList);
							}
						}
						result.add(group);
					}
					return result;
				}
			}
		}
	}

	/**
	 * 获取指定接口分组的数据
	 * 
	 * @param groupId
	 *          分组的id
	 * @return
	 */
	public static ProjectApiGroup getProjectApiGroup(String groupId) throws Throwable {
		String sql = String.format("select * from project_api_group where %s=?", ApiGroupColumns.GROUP_ID);
		FunctionResult<ProjectApiGroup> execute = query(sql, StringUtil.asList(groupId), res -> {
			ProjectApiGroup group = new ProjectApiGroup();
			try {
				if (res.next()) {
					group.setGroupId(res.getString(ApiGroupColumns.GROUP_ID));
					group.setProjectId(res.getString(ApiGroupColumns.PROJECT_ID));
					group.setName(res.getString(ApiGroupColumns.NAME));
					group.setSummary(res.getString(ApiGroupColumns.SUMMARY));
					group.setDescription(res.getString(ApiGroupColumns.DESCRIPTION));
					group.setExternalDocs(res.getString(ApiGroupColumns.EXTERNAL_DOCS));
					group.setVendorExtensions(res.getString(ApiGroupColumns.VENDOR_EXTENSIONS));
				}
				return new FunctionResult<>(group);
			} catch (SQLException e) {
				return new FunctionResult<>(e);
			}
		});
		if (execute.succeeded()) {
			return execute.result();
		} else {
			throw execute.cause();
		}
	}

	/**
	 * 保存接口分组
	 * 
	 * @param project
	 * @throws Exception
	 */
	public static void saveProjectApiGroup(ProjectApiGroup group) throws Exception {
		String sql = String.format("insert into project_api_group (%s,%s,%s,%s,%s,%s,%s) values(?,?,?,?,?,?,?)", ApiGroupColumns.GROUP_ID,
				ApiGroupColumns.PROJECT_ID, ApiGroupColumns.NAME, ApiGroupColumns.SUMMARY, ApiGroupColumns.DESCRIPTION,
				ApiGroupColumns.EXTERNAL_DOCS, ApiGroupColumns.VENDOR_EXTENSIONS);
		List<Object> params = new ArrayList<>();
		params.add(StringUtil.isNullOrEmpty(group.getGroupId()) ? UUID.randomUUID().toString() : group.getGroupId());
		params.add(group.getProjectId());
		params.add(group.getName());
		params.add(group.getSummary());
		params.add(group.getDescription());
		params.add(group.getExternalDocs());
		params.add(group.getVendorExtensions());
		update(sql, params);
	}

	/**
	 * 删除接口分组
	 * 
	 * @param key
	 * @throws Exception
	 */
	public static void updateProjectApiGroup(ProjectApiGroup group) throws Exception {
		StringBuilder set = new StringBuilder("set ");
		List<Object> params = new ArrayList<>();
		if (group.getName() != null) {
			set.append(ApiGroupColumns.NAME + " = ? ,");
			params.add(group.getName());
		}
		if (group.getSummary() != null) {
			set.append(ApiGroupColumns.SUMMARY + " = ? ,");
			params.add(group.getSummary());
		}
		if (group.getDescription() != null) {
			set.append(ApiGroupColumns.DESCRIPTION + " = ? ,");
			params.add(group.getDescription());
		}
		if (group.getExternalDocs() != null) {
			set.append(ApiGroupColumns.EXTERNAL_DOCS + " = ? ,");
			params.add(group.getExternalDocs());
		}
		if (group.getVendorExtensions() != null) {
			set.append(ApiGroupColumns.VENDOR_EXTENSIONS + " = ? ,");
			params.add(group.getVendorExtensions());
		}
		String sql = "update project_api_group " + set.substring(0, set.length() - 1)
				+ String.format(" where %s = ? ", ApiGroupColumns.GROUP_ID);
		params.add(group.getGroupId());
		update(sql, params);
	}

	/**
	 * 删除接口分组
	 * 
	 * @param key
	 * @throws Exception
	 */
	public static void delectProjectApiGroup(String groupId) throws Exception {
		List<Object> params = new ArrayList<>();
		params.add(groupId);
		String apiSql = String.format("delete from project_api where %s = ? ", ApiColumns.GROUP_ID);
		update(apiSql, params);
		String groupSql = String.format("delete from project_api_group where %s = ? ", ApiGroupColumns.GROUP_ID);
		update(groupSql, params);
	}
	/**
	 * 新增接口
	 * 
	 * @param api
	 * @throws Exception
	 */
	public static void saveProjectApi(ProjectApi api) throws Exception {
		String sql = String.format(
				"insert into project_api (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) " + "values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
				ApiColumns.OPERATION_ID, ApiColumns.GROUP_ID, ApiColumns.PATH, ApiColumns.METHOD, ApiColumns.TAGS, ApiColumns.SUMMARY,
				ApiColumns.DESCRIPTION, ApiColumns.SCHEMES, ApiColumns.CONSUMES, ApiColumns.PRODUCES, ApiColumns.PARAMETERS, ApiColumns.RESPONSES,
				ApiColumns.SECURITY, ApiColumns.EXTERNAL_DOCS, ApiColumns.DEPRECATED, ApiColumns.VENDOR_EXTENSIONS);
		List<Object> params = new ArrayList<>();
		params.add(StringUtil.isNullOrEmpty(api.getOperationId()) ? UUID.randomUUID().toString() : api.getOperationId());
		params.add(api.getGroupId());
		params.add(api.getPath());
		params.add(api.getMethod());
		params.add(api.getTags());
		params.add(api.getSummary());
		params.add(api.getDescription());
		params.add(api.getSchemes());
		params.add(api.getConsumes());
		params.add(api.getProduces());
		params.add(api.getParameters());
		params.add(api.getResponses());
		params.add(api.getSecurity());
		params.add(api.getExternalDocs());
		params.add(api.getDeprecated());
		params.add(api.getVendorExtensions());
		update(sql, params);
	}
	/**
	 * 获取指定接口的信息
	 * 
	 * @param apiId
	 * @return
	 * @throws Throwable
	 */
	public static ProjectApi getProjectApi(String apiId) throws Throwable {
		String sql = String.format("select * from project_api where %s=?", ApiColumns.OPERATION_ID);
		FunctionResult<ProjectApi> result = query(sql, StringUtil.asList(apiId), res -> {
			try {
				ProjectApi api = new ProjectApi();
				while (res.next()) {
					api.setOperationId(res.getString(ApiColumns.OPERATION_ID));
					api.setGroupId(res.getString(ApiColumns.GROUP_ID));
					api.setPath(res.getString(ApiColumns.PATH));
					api.setMethod(res.getString(ApiColumns.METHOD));
					api.setTags(res.getString(ApiColumns.TAGS));
					api.setSummary(res.getString(ApiColumns.SUMMARY));
					api.setDescription(res.getString(ApiColumns.DESCRIPTION));
					api.setSchemes(res.getString(ApiColumns.SCHEMES));
					api.setConsumes(res.getString(ApiColumns.CONSUMES));
					api.setProduces(res.getString(ApiColumns.PRODUCES));
					api.setParameters(res.getString(ApiColumns.PARAMETERS));
					api.setResponses(res.getString(ApiColumns.RESPONSES));
					api.setSecurity(res.getString(ApiColumns.SECURITY));
					api.setExternalDocs(res.getString(ApiColumns.EXTERNAL_DOCS));
					api.setDeprecated(res.getString(ApiColumns.DEPRECATED));
					api.setVendorExtensions(res.getString(ApiColumns.VENDOR_EXTENSIONS));
				}
				return new FunctionResult<>(api);
			} catch (SQLException e) {
				return new FunctionResult<>(e);
			}
		});
		if (result.succeeded()) {
			return result.result();
		} else {
			throw result.cause();
		}
	}
	/**
	 * 更新接口
	 * 
	 * @param api
	 * @throws Exception
	 */
	public static void updateProjectApi(ProjectApi api) throws Exception {
		StringBuilder set = new StringBuilder("set ");
		List<Object> params = new ArrayList<>();
		if (api.getPath() != null) {
			set.append(ApiColumns.PATH + " = ? ,");
			params.add(api.getPath());
		}
		if (api.getMethod() != null) {
			set.append(ApiColumns.METHOD + " = ? ,");
			params.add(api.getMethod());
		}
		if (api.getTags() != null) {
			set.append(ApiColumns.TAGS + " = ? ,");
			params.add(api.getTags());
		}
		if (api.getSummary() != null) {
			set.append(ApiColumns.SUMMARY + " = ? ,");
			params.add(api.getSummary());
		}
		if (api.getDescription() != null) {
			set.append(ApiColumns.DESCRIPTION + " = ? ,");
			params.add(api.getDescription());
		}
		if (api.getSchemes() != null) {
			set.append(ApiColumns.SCHEMES + " = ? ,");
			params.add(api.getSchemes());
		}
		if (api.getConsumes() != null) {
			set.append(ApiColumns.CONSUMES + " = ? ,");
			params.add(api.getConsumes());
		}
		if (api.getProduces() != null) {
			set.append(ApiColumns.PRODUCES + " = ? ,");
			params.add(api.getProduces());
		}
		if (api.getParameters() != null) {
			set.append(ApiColumns.PARAMETERS + " = ? ,");
			params.add(api.getParameters());
		}
		if (api.getResponses() != null) {
			set.append(ApiColumns.RESPONSES + " = ? ,");
			params.add(api.getResponses());
		}
		if (api.getSecurity() != null) {
			set.append(ApiColumns.SECURITY + " = ? ,");
			params.add(api.getSecurity());
		}
		if (api.getExternalDocs() != null) {
			set.append(ApiColumns.EXTERNAL_DOCS + " = ? ,");
			params.add(api.getExternalDocs());
		}
		if (api.getDeprecated() != null) {
			set.append(ApiColumns.DEPRECATED + " = ? ,");
			params.add(api.getDeprecated());
		}
		if (api.getVendorExtensions() != null) {
			set.append(ApiColumns.VENDOR_EXTENSIONS + " = ? ,");
			params.add(api.getVendorExtensions());
		}
		String sql = "update project_api " + set.substring(0, set.length() - 1) + String.format(" where %s = ? ", ApiColumns.OPERATION_ID);
		params.add(api.getOperationId());
		update(sql, params);
	}
	/**
	 * 删除接口
	 * 
	 * @param apiId
	 * @throws Exception
	 */
	public static void deleteProjectApi(String apiId) throws Exception {
		String sql = String.format("delete from project_api where %s=?", ApiColumns.OPERATION_ID);
		update(sql, StringUtil.asList(apiId));
	}

}
