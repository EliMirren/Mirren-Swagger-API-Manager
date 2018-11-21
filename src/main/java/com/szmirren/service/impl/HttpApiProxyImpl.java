package com.szmirren.service.impl;

import java.util.Map;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Service;

import com.szmirren.common.ResultUtil;
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

}
