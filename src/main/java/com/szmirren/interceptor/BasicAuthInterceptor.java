package com.szmirren.interceptor;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.springframework.web.servlet.HandlerInterceptor;

import com.szmirren.common.Constant;
/**
 * 普通认证的拦截器
 * 
 * @author <a href="http://szmirren.com">Mirren</a>
 *
 */
public class BasicAuthInterceptor implements HandlerInterceptor {
	public static final String AUTHORIZATION = "Authorization";
	public static final String IS_AUTH = "isAuth";
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		String auth = request.getHeader(AUTHORIZATION);
		if (auth == null) {
			response.addHeader("WWW-Authenticate", "Basic realm=\"" + Constant.MSAM_NAME_VERSION + "\"");
			response.setStatus(401);
			return false;
		} else {
			if ("false".equals(request.getSession().getAttribute(IS_AUTH))) {
				request.getSession().removeAttribute(IS_AUTH);
				response.addHeader("WWW-Authenticate", "Basic realm=\"" + Constant.MSAM_NAME_VERSION + "\"");
				response.setStatus(401);
				return false;
			} else {
				final String suser;
				final String spass;
				String decoded = new String(Base64.getDecoder().decode(auth.split(" ")[1]));
				int colonIdx = decoded.indexOf(":");
				if (colonIdx != -1) {
					suser = decoded.substring(0, colonIdx);
					spass = decoded.substring(colonIdx + 1);
				} else {
					suser = decoded;
					spass = null;
				}

				byte[] bytes = Files.readAllBytes(Paths.get(System.getProperty("user.dir") + "/config/user.json"));
				JSONObject users = new JSONObject(new String(bytes));

				boolean authResult = false;
				if (users.has(suser)) {
					JSONObject user = users.getJSONObject(suser);
					if (user.has("pwd")) {
						if (user.get("pwd").equals(spass)) {
							request.setAttribute(IS_AUTH, "true");
							request.setAttribute(AUTHORIZATION, users);
							authResult = true;
						}
					}
				}

				if (!authResult) {
					response.addHeader("WWW-Authenticate", "Basic realm=\"" + Constant.MSAM_NAME_VERSION + "\"");
					response.setStatus(401);
				}
				return authResult;
			}
		}
	}

}
