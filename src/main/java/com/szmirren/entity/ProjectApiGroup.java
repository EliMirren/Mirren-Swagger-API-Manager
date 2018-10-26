package com.szmirren.entity;

import java.util.List;

/**
 * 接口管理的实体类
 * 
 * @author <a href="http://szmirren.com">Mirren</a>
 *
 */
public class ProjectApiGroup {
	/** 分组的id */
	private String groupId;
	/** 项目的id */
	private String projectId;
	/** 该分组下的所有接口 */
	private List<ProjectApi> apis;
	/** 以下是swagger的属性 */
	private String name;
	private String summary;
	private String description;
	private String externalDocs;
	private String vendorExtensions;

	public String getGroupId() {
		return groupId;
	}

	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}

	public String getProjectId() {
		return projectId;
	}

	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getExternalDocs() {
		return externalDocs;
	}
	public void setExternalDocs(String externalDocs) {
		this.externalDocs = externalDocs;
	}
	public String getVendorExtensions() {
		return vendorExtensions;
	}
	public void setVendorExtensions(String vendorExtensions) {
		this.vendorExtensions = vendorExtensions;
	}
	public List<ProjectApi> getApis() {
		return apis;
	}
	public void setApis(List<ProjectApi> apis) {
		this.apis = apis;
	}
	@Override
	public String toString() {
		return "ProjectApiGroup [groupId=" + groupId + ", projectId=" + projectId + ", apis=" + apis + ", name=" + name + ", summary=" + summary
				+ ", description=" + description + ", externalDocs=" + externalDocs + ", vendorExtensions=" + vendorExtensions + "]";
	}

}
