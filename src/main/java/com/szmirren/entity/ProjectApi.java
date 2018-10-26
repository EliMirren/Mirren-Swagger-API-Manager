package com.szmirren.entity;

public class ProjectApi {
	/** 分组的id */
	private String groupId;
	/** 接口的路径 */
	private String path;
	/** 接口的请求方法 */
	private String method;

	/** 以下是swagger的属性 */
	private String operationId;
	private String tags;
	private String summary;
	private String description;
	private String schemes;
	private String consumes;
	private String produces;
	/**
	 * parameters拓展了Swagger的Parameter中vendorExtensions加多了<br>
	 * items[{type:数据类型,name:参数,description:参数描述}]<br>
	 * min最小值或最小长度<br>
	 * max最大值或最大长度<br>
	 */
	private String parameters;
	/**
	 * responses拓展了Swagger的Response加多一个statusCode,Response的vendorExtensions加多一个<br>
	 * parameters{type:类型,name:名字,description:描述,items(items只有在array或object时有用与parameters类型一样)}
	 */
	private String responses;
	private String security;
	private String externalDocs;
	private String deprecated;
	private String vendorExtensions;

	public String getGroupId() {
		return groupId;
	}
	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}

	public String getOperationId() {
		return operationId;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public String getMethod() {
		return method;
	}
	public void setMethod(String method) {
		this.method = method;
	}
	public void setOperationId(String operationId) {
		this.operationId = operationId;
	}
	public String getTags() {
		return tags;
	}
	public void setTags(String tags) {
		this.tags = tags;
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
	public String getSchemes() {
		return schemes;
	}
	public void setSchemes(String schemes) {
		this.schemes = schemes;
	}
	public String getConsumes() {
		return consumes;
	}
	public void setConsumes(String consumes) {
		this.consumes = consumes;
	}
	public String getProduces() {
		return produces;
	}
	public void setProduces(String produces) {
		this.produces = produces;
	}
	public String getParameters() {
		return parameters;
	}
	public void setParameters(String parameters) {
		this.parameters = parameters;
	}
	public String getResponses() {
		return responses;
	}
	public void setResponses(String responses) {
		this.responses = responses;
	}
	public String getSecurity() {
		return security;
	}
	public void setSecurity(String security) {
		this.security = security;
	}
	public String getExternalDocs() {
		return externalDocs;
	}
	public void setExternalDocs(String externalDocs) {
		this.externalDocs = externalDocs;
	}
	public String getDeprecated() {
		return deprecated;
	}
	public void setDeprecated(String deprecated) {
		this.deprecated = deprecated;
	}
	public String getVendorExtensions() {
		return vendorExtensions;
	}
	public void setVendorExtensions(String vendorExtensions) {
		this.vendorExtensions = vendorExtensions;
	}
	@Override
	public String toString() {
		return "ProjectApi [groupId=" + groupId + ", path=" + path + ", method=" + method + ", operationId=" + operationId + ", tags=" + tags
				+ ", summary=" + summary + ", description=" + description + ", schemes=" + schemes + ", consumes=" + consumes + ", produces="
				+ produces + ", parameters=" + parameters + ", responses=" + responses + ", security=" + security + ", externalDocs=" + externalDocs
				+ ", deprecated=" + deprecated + ", vendorExtensions=" + vendorExtensions + "]";
	}

}
