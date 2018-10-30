package com.szmirren.entity;

import java.util.Map;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.szmirren.jackson.VendorExtensionsArraySerialize;

import io.swagger.models.Response;
/**
 * Msam要用到的Response,主要是要序列化Response自定义返回结果
 * 
 * @author <a href="http://szmirren.com">Mirren</a>
 *
 */
public class MsamResponse extends Response {

	@Override
	@JsonSerialize(using = VendorExtensionsArraySerialize.class)
	public Map<String, Object> getVendorExtensions() {
		return super.getVendorExtensions();
	}

}
