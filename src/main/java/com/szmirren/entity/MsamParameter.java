package com.szmirren.entity;

import java.util.Map;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.szmirren.jackson.VendorExtensionsArraySerialize;

import io.swagger.models.parameters.AbstractSerializableParameter;
/**
 * Msam要用到的Parameter,主要是要序列化Parameter自定义返回结果
 * 
 * @author <a href="http://szmirren.com">Mirren</a>
 *
 */
public class MsamParameter extends AbstractSerializableParameter<MsamParameter> {

	@Override
	@JsonSerialize(using = VendorExtensionsArraySerialize.class)
	public Map<String, Object> getVendorExtensions() {
		return super.getVendorExtensions();
	}

}
