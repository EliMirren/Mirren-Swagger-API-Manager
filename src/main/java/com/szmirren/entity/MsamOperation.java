package com.szmirren.entity;

import java.util.Map;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.szmirren.jackson.VendorExtensionsArraySerialize;

import io.swagger.models.Operation;
/**
 * Msam要用到的Operation,主要是要序列化Operation自定义返回结果
 * 
 * @author <a href="http://szmirren.com">Mirren</a>
 *
 */
public class MsamOperation extends Operation {
	@Override
	@JsonSerialize(using = VendorExtensionsArraySerialize.class)
	public Map<String, Object> getVendorExtensions() {
		return super.getVendorExtensions();
	}

}
