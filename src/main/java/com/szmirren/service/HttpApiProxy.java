package com.szmirren.service;

import java.util.Map;

/**
 * 请求别人API的代理服务器
 * 
 * @author <a href="http://szmirren.com">Mirren</a>
 *
 */
public interface HttpApiProxy {
	/**
	 * get请求的代理
	 * 
	 * @param url
	 * @return
	 */
	Map<String, Object> getProxy(String url);
}
