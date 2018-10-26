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
	/** 下面都是Swagger的对应属性 */
	private String swagger;
	private String info;
	private String host;
	private String basePath;
	private String tags;
	private String paths;
	private String schemes;
	private String consumes;
	private String produces;
	private String security;
	private String securityDefinitions;
	private String definitions;
	private String parameters;
	private String responses;
	private String externalDocs;
	private String vendorExtensions;

	public String getKey() {
		return key;
	}

	public Project setKey(String key) {
		this.key = key;
		return this;
	}

	public String getSwagger() {
		return swagger;
	}

	public Project setSwagger(String swagger) {
		this.swagger = swagger;
		return this;
	}

	public String getInfo() {
		return info;
	}

	public Project setInfo(String info) {
		this.info = info;
		return this;
	}

	public String getHost() {
		return host;
	}

	public Project setHost(String host) {
		this.host = host;
		return this;
	}

	public String getBasePath() {
		return basePath;
	}

	public Project setBasePath(String basePath) {
		this.basePath = basePath;
		return this;
	}

	public String getTags() {
		return tags;
	}

	public Project setTags(String tags) {
		this.tags = tags;
		return this;
	}

	public String getPaths() {
		return paths;
	}

	public Project setPaths(String paths) {
		this.paths = paths;
		return this;
	}

	public String getSchemes() {
		return schemes;
	}

	public Project setSchemes(String schemes) {
		this.schemes = schemes;
		return this;
	}

	public String getConsumes() {
		return consumes;
	}

	public Project setConsumes(String consumes) {
		this.consumes = consumes;
		return this;
	}

	public String getProduces() {
		return produces;
	}

	public Project setProduces(String produces) {
		this.produces = produces;
		return this;
	}

	public String getSecurity() {
		return security;
	}

	public Project setSecurity(String security) {
		this.security = security;
		return this;
	}

	public String getSecurityDefinitions() {
		return securityDefinitions;
	}

	public Project setSecurityDefinitions(String securityDefinitions) {
		this.securityDefinitions = securityDefinitions;
		return this;
	}

	public String getDefinitions() {
		return definitions;
	}

	public Project setDefinitions(String definitions) {
		this.definitions = definitions;
		return this;
	}

	public String getParameters() {
		return parameters;
	}

	public Project setParameters(String parameters) {
		this.parameters = parameters;
		return this;
	}

	public String getResponses() {
		return responses;
	}

	public Project setResponses(String responses) {
		this.responses = responses;
		return this;
	}

	public String getExternalDocs() {
		return externalDocs;
	}

	public Project setExternalDocs(String externalDocs) {
		this.externalDocs = externalDocs;
		return this;
	}

	public String getVendorExtensions() {
		return vendorExtensions;
	}

	public Project setVendorExtensions(String vendorExtensions) {
		this.vendorExtensions = vendorExtensions;
		return this;
	}

	@Override
	public String toString() {
		return "Project [key=" + key + ", swagger=" + swagger + ", info=" + info + ", host=" + host + ", basePath=" + basePath + ", tags="
				+ tags + ", paths=" + paths + ", schemes=" + schemes + ", consumes=" + consumes + ", produces=" + produces + ", security="
				+ security + ", securityDefinitions=" + securityDefinitions + ", definitions=" + definitions + ", parameters=" + parameters
				+ ", responses=" + responses + ", externalDocs=" + externalDocs + ", vendorExtensions=" + vendorExtensions + "]";
	}

	

}
