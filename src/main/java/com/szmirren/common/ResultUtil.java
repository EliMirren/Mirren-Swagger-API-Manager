package com.szmirren.common;

import java.util.HashMap;
import java.util.Map;

/**
 * 返回结果工具
 * 
 * @author <a href="http://szmirren.com">Mirren</a>
 *
 */
public class ResultUtil {
	/** 成功的默认状态码 */
	public final static int SC = 200;
	/** 成功的模式的默认提示 */
	public final static String SM = "成功";

	/** 失败的默认状态码 */
	public final static int FC = 500;
	/** 失败的模式的默认提示 */
	public final static String FM = "失败";

	/**
	 * 返回code=200,msg=成功,data=数据
	 * 
	 * @param data
	 * @return
	 */
	public static Map<String, Object> succeed(Object data) {
		return format(SC, SM, data);
	}
	/**
	 * 返回code=200,msg=消息,data=数据
	 * 
	 * @param data
	 * @return
	 */
	public static Map<String, Object> succeed(String msg, Object data) {
		return format(SC, msg, data);
	}
	/**
	 * 返回code=500,msg=失败,data=数据
	 * 
	 * @param data
	 * @return
	 */
	public static Map<String, Object> failed(Object data) {
		return format(FC, FM, data);
	}
	/**
	 * 返回code=200,msg=消息,data=数据
	 * 
	 * @param data
	 * @return
	 */
	public static Map<String, Object> failed(String msg, Object data) {
		return format(FC, msg, data);
	}

	/**
	 * 返回格式化
	 * 
	 * @param code
	 *          状态码
	 * @param msg
	 *          返回结果
	 * @param data
	 *          数据
	 * @return
	 * @throws Exception
	 */
	public static Map<String, Object> format(int code, String msg, Object data) {
		Map<String, Object> result = new HashMap<>();
		result.put("code", code);
		result.put("msg", msg);
		result.put("data", data);
		return result;
	}

}
