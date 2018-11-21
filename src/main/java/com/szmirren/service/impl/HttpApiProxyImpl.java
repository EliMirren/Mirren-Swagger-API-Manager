package com.szmirren.service.impl;

import java.net.URISyntaxException;
import java.net.UnknownHostException;
import java.util.Iterator;
import java.util.Map;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.entity.ByteArrayEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.szmirren.common.ResultUtil;
import com.szmirren.entity.MsamHttpRequest;
import com.szmirren.entity.RequestData;
import com.szmirren.service.HttpApiProxy;
@Service
public class HttpApiProxyImpl implements HttpApiProxy {

	@Override
	public Map<String, Object> getProxy(String url) {
		try {
			HttpClient client = HttpClientBuilder.create().build();
			HttpGet get = new HttpGet(url);
			HttpResponse response = client.execute(get);
			if (response.getStatusLine().getStatusCode() != 200) {
				return ResultUtil.failed(response.getStatusLine());
			} else {
				String result = EntityUtils.toString(response.getEntity());
				return ResultUtil.succeed(result);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResultUtil.failed(e.getMessage());
		}
	}

	@Override
	public Map<String, Object> executeProxy(RequestData data) {
		try {
			MsamHttpRequest request = new MsamHttpRequest(data.getType(), data.getUrl() + data.getQueryParams());
			HttpClient client = HttpClientBuilder.create().build();
			if (data.getHeaders() != null) {
				JSONObject object = new JSONObject(data.getHeaders());
				Iterator<?> keys = object.keys();
				while (keys.hasNext()) {
					String key = (String) keys.next();
					if (object.has(key)) {
						request.setHeader(key, object.getString(key));
					}
				}
			}
			if (data.getContentType() != null) {
				request.setHeader("Content-Type", data.getContentType());
			}
			if (data.getData() != null) {
				request.setEntity(new ByteArrayEntity(new JSONObject(data.getData()).toString().getBytes()));
			}
			HttpResponse response = client.execute(request);
			if (response.getStatusLine().getStatusCode() != 200) {
				return ResultUtil.failed(response.getStatusLine());
			} else {
				String result = EntityUtils.toString(response.getEntity());
				return ResultUtil.succeed(result);
			}
		} catch (Exception e) {
			if (e instanceof URISyntaxException || e instanceof IllegalArgumentException) {
				return ResultUtil.failed("\n无效的URL路径,如果有Path参数请填充Path参数\n" + e.getMessage());
			} else if (e instanceof UnknownHostException) {
				return ResultUtil.failed("\n无法识别主机:" + e.getMessage());
			}
			e.printStackTrace();
			return ResultUtil.failed(e.getMessage());
		}
	}
}
