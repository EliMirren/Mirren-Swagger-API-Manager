package com.szmirren.common;
/**
 * 任务执行结果
 * 
 * @author <a href="http://szmirren.com">Mirren</a>
 *
 */
public class FunctionResult<T> {
	/** 结果 */
	private T result;
	/** 异常 */
	private Throwable cause;
	/** 是否成功 */
	private boolean succeeded;
	/**
	 * 新建一个成功返回结果
	 * 
	 * @param result
	 */
	public FunctionResult(T result) {
		this.result = result;
		this.succeeded = true;
	}
	/**
	 * 新建一个失败返回结果
	 * 
	 * @param cause
	 *          异常类
	 */
	public FunctionResult(Throwable cause) {
		this.cause = cause != null ? cause : new NoStackTraceThrowable(null);
		this.succeeded = false;
	}
	/**
	 * 新建一个失败返回结果
	 * 
	 * @param failureMessage
	 *          异常信息
	 */
	public FunctionResult(String failureMessage) {
		this(new NoStackTraceThrowable(failureMessage));
		this.succeeded = false;
	}

	/**
	 * 异常信息 当succeeded=true 时永远为null
	 * 
	 * @return
	 */
	public Throwable cause() {
		return cause;
	}
	/**
	 * 执行结果,true代表执行成功
	 * 
	 * @return
	 */
	public boolean succeeded() {
		return succeeded;
	}

	/**
	 * 返回结果 当succeeded=false 时永远为null
	 * 
	 * @return
	 */
	public T result() {
		return result;
	}

}
