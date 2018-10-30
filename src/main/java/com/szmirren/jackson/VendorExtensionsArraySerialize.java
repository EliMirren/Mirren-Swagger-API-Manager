package com.szmirren.jackson;

import java.io.IOException;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class VendorExtensionsArraySerialize extends JsonSerializer<Map<String, Object>> {

	@Override
	public void serialize(Map<String, Object> obj, JsonGenerator gen, SerializerProvider arg2) throws IOException {
		if (obj.get("x-additionalInstructions") != null) {
			gen.writeFieldName("x-additionalInstructions");
			gen.writeStartArray();
			JSONArray ais = (JSONArray) obj.get("x-additionalInstructions");
			for (int i = 0; i < ais.length(); i++) {
				try {
					JSONObject ai = ais.getJSONObject(i);
					gen.writeStartObject();
					gen.writeFieldName("title");
					if (ai.has("title")) {
						gen.writeString(ai.getString("title"));
					} else {
						gen.writeString("");
					}
					gen.writeFieldName("description");
					if (ai.has("description")) {
						gen.writeString(ai.getString("description"));
					} else {
						gen.writeString("");
					}
					gen.writeEndObject();
				} catch (JSONException e) {
					e.printStackTrace();
				}
			}
			gen.writeEndArray();
		}
		if (obj.get("x-items") != null) {
			gen.writeFieldName("x-items");
			gen.writeStartArray();
			JSONArray ais = (JSONArray) obj.get("x-items");
			for (int i = 0; i < ais.length(); i++) {
				try {
					JSONObject ai = ais.getJSONObject(i);
					gen.writeStartObject();
					gen.writeFieldName("type");
					if (ai.has("type")) {
						gen.writeString(ai.getString("type"));
					} else {
						gen.writeString("");
					}
					gen.writeFieldName("name");
					if (ai.has("name")) {
						gen.writeString(ai.getString("name"));
					} else {
						gen.writeString("");
					}
					gen.writeFieldName("description");
					if (ai.has("description")) {
						gen.writeString(ai.getString("description"));
					} else {
						gen.writeString("");
					}
					gen.writeEndObject();
				} catch (JSONException e) {
					e.printStackTrace();
				}
			}
			gen.writeEndArray();

		}

		if (obj.get("x-parameters") != null) {
			gen.writeFieldName("x-parameters");
			gen.writeStartArray();
			JSONArray ais = (JSONArray) obj.get("x-parameters");
			for (int i = 0; i < ais.length(); i++) {
				try {
					JSONObject ai = ais.getJSONObject(i);
					gen.writeStartObject();
					gen.writeFieldName("type");
					if (ai.has("type")) {
						gen.writeString(ai.getString("type"));
					} else {
						gen.writeString("");
					}
					gen.writeFieldName("name");
					if (ai.has("name")) {
						gen.writeString(ai.getString("name"));
					} else {
						gen.writeString("");
					}
					gen.writeFieldName("description");
					if (ai.has("description")) {
						gen.writeString(ai.getString("description"));
					} else {
						gen.writeString("");
					}
					if (ai.has("items")) {
						JSONArray items = null;
						if (ai.get("items") instanceof JSONArray) {
							items = ai.getJSONArray("items");
						} else {
							items = new JSONArray(ai.getString("items"));
						}
						gen.writeFieldName("items");
						gen.writeStartArray();
						for (int j = 0; j < items.length(); j++) {
							JSONObject item = items.getJSONObject(j);
							gen.writeStartObject();
							gen.writeFieldName("type");
							if (item.has("type")) {
								gen.writeString(item.getString("type"));
							} else {
								gen.writeString("");
							}
							gen.writeFieldName("name");
							if (item.has("name")) {
								gen.writeString(item.getString("name"));
							} else {
								gen.writeString("");
							}
							gen.writeFieldName("description");
							if (item.has("description")) {
								gen.writeString(item.getString("description"));
							} else {
								gen.writeString("");
							}
							gen.writeEndObject();
						}
						gen.writeEndArray();
					}

					gen.writeEndObject();
				} catch (JSONException e) {
					e.printStackTrace();
				}
			}
			gen.writeEndArray();
		}

	}

}
