package com.szmirren.entity;
/**
 * 项目的信息的实体类
 * 
 * @author <a href="http://szmirren.com">Mirren</a>
 *
 */
public class Project {
	/** 项目的id */
	private String key;
	/** Swagger的info */
	private String info;

	public String getKey() {
		return key;
	}
	public Project setKey(String key) {
		this.key = key;
		return this;
	}
	public String getInfo() {
		return info;
	}
	public Project setInfo(String info) {
		this.info = info;
		return this;
	}

}
