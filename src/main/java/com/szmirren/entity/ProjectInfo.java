package com.szmirren.entity;
/**
 * 项目的基本属性
 * 
 * @author <a href="http://szmirren.com">Mirren</a>
 *
 */
public class ProjectInfo {
	private String key;
	private String name;
	private String version;

	public ProjectInfo() {
		super();
	}
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
	@Override
	public String toString() {
		return "ProjectInfo [key=" + key + ", name=" + name + ", version=" + version + "]";
	}

}
