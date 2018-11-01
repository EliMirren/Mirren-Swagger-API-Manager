package com.szmirren.entity;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import io.swagger.models.Operation;
import io.swagger.models.Path;
/**
 * 拓展Path添加trace,connect,other请求方式的支持
 * 
 * @author <a href="http://szmirren.com">Mirren</a>
 *
 */
@JsonPropertyOrder({"get", "head", "post", "put", "delete", "options", "patch", "trace", "connect", "other"})
public class MsamPath extends Path {
	private Operation trace;
	private Operation connect;
	private Operation other;
	@Override
	public Path set(String method, Operation op) {
		if ("get".equals(method)) {
			return get(op);
		}
		if ("put".equals(method)) {
			return put(op);
		}
		if ("head".equals(method)) {
			return head(op);
		}
		if ("post".equals(method)) {
			return post(op);
		}
		if ("delete".equals(method)) {
			return delete(op);
		}
		if ("patch".equals(method)) {
			return patch(op);
		}
		if ("options".equals(method)) {
			return options(op);
		}
		if ("trace".equals(method)) {
			return trace(op);
		}
		if ("connect".equals(method)) {
			return connect(op);
		}
		if ("other".equals(method)) {
			return other(op);
		}
		return null;
	}

	public Operation getTrace() {
		return trace;
	}
	public void setTrace(Operation trace) {
		this.trace = trace;
	}
	public Operation getConnect() {
		return connect;
	}
	public void setConnect(Operation connect) {
		this.connect = connect;
	}
	public Operation getOther() {
		return other;
	}
	public void setOther(Operation other) {
		this.other = other;
	}

	public MsamPath trace(Operation trace) {
		this.trace = trace;
		return this;
	}
	public MsamPath connect(Operation connect) {
		this.connect = connect;
		return this;
	}
	public MsamPath other(Operation other) {
		this.other = other;
		return this;
	}

}
