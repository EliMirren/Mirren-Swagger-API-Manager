package com.szmirren.common;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.json.JSONObject;

import com.szmirren.entity.Project;
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
	 * 获取所有项目
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public static List<ProjectInfo> getProjectList() throws Exception {
		Connection conn = null;
		Statement stat = null;
		ResultSet rs = null;
		try {
			conn = getConnection();
			stat = conn.createStatement();
			String sql = "select * from project";
			ResultSet resultSet = stat.executeQuery(sql);
			List<ProjectInfo> result = new ArrayList<>();
			while (resultSet.next()) {
				ProjectInfo projectInfo = new ProjectInfo();
				projectInfo.setKey(resultSet.getString("key"));
				JSONObject info = new JSONObject(resultSet.getString("info"));
				projectInfo.setName(info.getString("title"));
				projectInfo.setVersion(info.getString("version"));
				result.add(projectInfo);
			}
			return result;
		} finally {
			if (rs != null)
				rs.close();
			if (stat != null)
				stat.close();
			if (conn != null)
				conn.close();
		}
	}

	/**
	 * 保存项目
	 * 
	 * @param project
	 * @throws Exception
	 */
	public static void saveProject(Project project) throws Exception {
		Connection conn = null;
		Statement stat = null;
		ResultSet rs = null;
		try {
			conn = getConnection();
			stat = conn.createStatement();
			String sql = String.format("insert into project (key,info) values('%s','%s')", UUID.randomUUID().toString(), project.getInfo());
			stat.executeUpdate(sql);
		} finally {
			if (rs != null)
				rs.close();
			if (stat != null)
				stat.close();
			if (conn != null)
				conn.close();
		}
	}

}
