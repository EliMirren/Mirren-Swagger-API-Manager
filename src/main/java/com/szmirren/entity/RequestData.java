package com.szmirren.entity;

/**
 * 执行请求需要的数据
 * 
 * @author <a href="http://szmirren.com">Mirren</a>
 *
 */
public class RequestData {
	/** 请求方法 */
	private String type;
	/** 请求路径 */
	private String url;
	/** consumes */
	private String contentType;
	/** header */
	private String headers;
	/** query参数 */
	private String queryParams;
	/** body参数 */
	private String data;
	public String getType() {
		return type == null ? "GET" : type.toUpperCase();
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getContentType() {
		return contentType;
	}
	public void setContentType(String contentType) {
		this.contentType = contentType;
	}
	public String getHeaders() {
		return headers;
	}
	public void setHeaders(String headers) {
		this.headers = headers;
	}
	public String getQueryParams() {
		return queryParams == null ? "" : queryParams;
	}
	public void setQueryParams(String queryParams) {
		this.queryParams = queryParams;
	}
	public String getData() {
		return data;
	}
	public void setData(String data) {
		this.data = data;
	}
	@Override
	public String toString() {
		return "RequestData [type=" + type + ", url=" + url + ", contentType=" + contentType + ", headers=" + headers + ", queryParams="
				+ queryParams + ", data=" + data + "]";
	}

}
