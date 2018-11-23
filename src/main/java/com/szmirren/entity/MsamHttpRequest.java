package com.szmirren.entity;

import java.net.URI;

import org.apache.http.client.methods.HttpEntityEnclosingRequestBase;
/**
 * HttpClient的请求类
 * 
 * @author <a href="http://szmirren.com">Mirren</a>
 *
 */
public class MsamHttpRequest extends HttpEntityEnclosingRequestBase {
	/**
	 * 请求的方法的类型
	 */
	private String requestMethod = "GET";

	public MsamHttpRequest() {
		super();
	}

	public MsamHttpRequest(final URI uri) {
		super();
		setURI(uri);
	}

	public MsamHttpRequest(final String uri) {
		super();
		setURI(URI.create(uri));
	}
	public MsamHttpRequest(final String method, final String uri) {
		super();
		this.requestMethod = method;
		setURI(URI.create(uri));
	}

	@Override
	public String getMethod() {
		if (requestMethod == null) {
			requestMethod = "GET";
		}
		return requestMethod.toUpperCase();
	}

	@Override
	public String toString() {
		return "MsamHttpRequest [requestMethod=" + requestMethod + "]";
	}

}
