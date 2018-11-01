package com.szmirren.common;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.szmirren.entity.MsamOperation;
import com.szmirren.entity.MsamParameter;
import com.szmirren.entity.MsamPath;
import com.szmirren.entity.MsamResponse;
import com.szmirren.entity.Project;
import com.szmirren.entity.ProjectApi;
import com.szmirren.entity.ProjectApiGroup;

import io.swagger.models.ExternalDocs;
import io.swagger.models.Info;
import io.swagger.models.Model;
import io.swagger.models.Operation;
import io.swagger.models.Path;
import io.swagger.models.Response;
import io.swagger.models.Scheme;
import io.swagger.models.SecurityRequirement;
import io.swagger.models.Swagger;
import io.swagger.models.Tag;
import io.swagger.models.auth.SecuritySchemeDefinition;
import io.swagger.models.parameters.Parameter;

/**
 * 将Project-XXX转换为Swagger-XXX相关的工具
 * 
 * @author <a href="http://szmirren.com">Mirren</a>
 *
 */
public interface SwaggerConverter {
	/**
	 * 获取项目里面Swagger需要用的Info
	 * 
	 * @param project
	 * @return
	 * @throws JsonParseException
	 * @throws JsonMappingException
	 * @throws IOException
	 */
	static Info toInfo(Project project) throws JsonParseException, JsonMappingException, IOException {
		if (project.getInfo() != null) {
			return new ObjectMapper().readValue(project.getInfo(), Info.class);
		} else {
			return null;
		}
	}

	/**
	 * 将项目分组装换为Swagger的Tag
	 * 
	 * @param group
	 * @return
	 * @throws IOException
	 * @throws JsonMappingException
	 * @throws JsonParseException
	 */
	static Tag toTag(ProjectApiGroup group) throws JsonParseException, JsonMappingException, IOException {
		Tag tag = new Tag();
		tag.setName(group.getName());
		tag.setDescription(group.getDescription());
		if (group.getExternalDocs() != null) {
			tag.setExternalDocs(new ObjectMapper().readValue(group.getExternalDocs(), ExternalDocs.class));
		}
		tag.setVendorExtension("summary", group.getSummary());
		return tag;
	}
	/**
	 * 将接口装换为Swagger的Path所需要的Operation
	 * 
	 * @param api
	 * @return
	 * @throws JsonParseException
	 * @throws JsonMappingException
	 * @throws IOException
	 * @throws JSONException
	 */
	static Operation toOperation(String tagName, ProjectApi api) throws JsonParseException, JsonMappingException, IOException, JSONException {
		Operation operation = new MsamOperation();
		operation.setTags(StringUtil.asListString(tagName));
		operation.setSummary(api.getSummary());
		operation.setDescription(api.getDescription());
		operation.setOperationId(api.getOperationId());
		ObjectMapper objectMapper = new ObjectMapper();
		if (api.getSchemes() != null) {
			operation.setSchemes(objectMapper.readValue(api.getSchemes(), new TypeReference<List<Scheme>>() {
			}));
		}
		if (api.getConsumes() != null) {
			operation.setConsumes(objectMapper.readValue(api.getConsumes(), new TypeReference<List<String>>() {
			}));
		}
		if (api.getProduces() != null) {
			operation.setProduces(objectMapper.readValue(api.getProduces(), new TypeReference<List<String>>() {
			}));
		}
		// request
		if (api.getParameters() != null) {
			JSONArray array = new JSONArray(api.getParameters());
			List<Parameter> list = new ArrayList<>();
			for (int i = 0; i < array.length(); i++) {
				MsamParameter msamParameter = new MsamParameter();
				JSONObject object = array.getJSONObject(i);
				msamParameter.setRequired(object.getBoolean("required"));
				msamParameter.setType(object.getString("type"));
				msamParameter.setIn(object.getString("in"));
				msamParameter.setName(object.getString("name"));
				if (object.has("description")) {
					msamParameter.setDescription(object.getString("description"));
				}
				if (object.has("pattern")) {
					msamParameter.setPattern(object.getString("pattern"));
				}

				if (object.has("format")) {
					msamParameter.setFormat(object.getString("format"));
				}
				if (object.has("default")) {
					msamParameter.setDefault(object.get("default"));
				}
				if (object.has("enum")) {
					String string = object.getString("enum");
					JSONArray array1 = new JSONArray(string);
					List<String> enums = new ArrayList<>();
					for (int j = 0; j < array1.length(); j++) {
						enums.add(array1.getString(j));
					}
					msamParameter.setEnum(enums);
				}
				if (object.has("vendorExtensions")) {
					JSONObject ve = object.getJSONObject("vendorExtensions");
					Integer min = null;
					Integer max = null;
					if (ve.has("min")) {
						min = ve.getInt("min");
					}
					if (ve.has("max")) {
						max = ve.getInt("max");
					}
					if ("string".equals(msamParameter.getType())) {
						msamParameter.setMinLength(min);
						msamParameter.setMaxLength(max);
					} else if (!"boolean".equals(msamParameter.getType()) && !"array".equals(msamParameter.getType())
							&& !"object".equals(msamParameter.getType())) {
						if (min != null) {
							msamParameter.setMinimum(BigDecimal.valueOf(min));
						}
						if (max != null) {
							msamParameter.setMaximum(BigDecimal.valueOf(max));
						}
					}
					Map<String, Object> veMap = new LinkedHashMap<>();
					if (ve.has("items")) {
						JSONArray items = null;
						if (ve.get("items") instanceof JSONArray) {
							items = ve.getJSONArray("items");
						} else {
							items = new JSONArray(ve.getString("items"));
						}

						veMap.put("x-items", items);
					}
					msamParameter.setVendorExtensions(veMap);
				}
				list.add(msamParameter);
			}
			operation.setParameters(list);
		}
		if (api.getResponses() != null) {
			Map<String, Response> responseMap = new LinkedHashMap<>();
			JSONArray respList = new JSONArray(api.getResponses());
			for (int i = 0; i < respList.length(); i++) {
				JSONObject object = respList.getJSONObject(i);
				Response response = new MsamResponse();
				if (object.has("description")) {
					response.setDescription(object.getString("description"));
				}
				if (object.has("vendorExtensions")) {
					JSONObject ve = new JSONObject(object.getString("vendorExtensions"));
					if (ve.has("parameters")) {
						JSONArray parameters = new JSONArray(ve.getString("parameters"));
						response.setVendorExtension("x-parameters", parameters);
					}
				}
				responseMap.put(object.getString("statusCode"), response);
			}
			operation.setResponses(responseMap);

		}

		if (api.getSecurity() != null) {
			operation.setSecurity(objectMapper.readValue(api.getSecurity(), new TypeReference<List<Map<String, List<String>>>>() {
			}));
		}
		if (api.getExternalDocs() != null) {
			operation.setExternalDocs(objectMapper.readValue(api.getExternalDocs(), ExternalDocs.class));
		}
		if (api.getDeprecated() != null) {
			operation.setDeprecated("true".equalsIgnoreCase(api.getDeprecated().trim()));
		}
		if (api.getVendorExtensions() != null) {
			JSONObject object = new JSONObject(api.getVendorExtensions());
			if (object.has("additionalInstructions")) {
				Map<String, Object> veMap = new LinkedHashMap<>();
				JSONArray array = new JSONArray(object.getString("additionalInstructions"));
				veMap.put("x-additionalInstructions", array);
				operation.vendorExtensions(veMap);
			}
		}

		return operation;
	}

	/**
	 * 将分组以及接口装换到swagger的tags与paths中
	 * 
	 * @param swagger
	 *          swagger
	 * @param groups
	 *          分组以及接口的信息
	 * @throws JsonParseException
	 * @throws JsonMappingException
	 * @throws IOException
	 * @throws JSONException
	 */
	static void toTagsAndPaths(Swagger swagger, List<ProjectApiGroup> groups)
			throws JsonParseException, JsonMappingException, IOException, JSONException {
		List<Tag> tags = new ArrayList<>();
		Map<String, Path> paths = new LinkedHashMap<>();
		for (ProjectApiGroup group : groups) {
			tags.add(toTag(group));
			List<ProjectApi> apis = group.getApis();
			for (ProjectApi api : apis) {
				Path path = new MsamPath();
				path.set(api.getMethod(), toOperation(group.getName(), api));
				paths.put(api.getPath(), path);
			}
		}
		swagger.setTags(tags);
		swagger.setPaths(paths);

	}

	/**
	 * 获取项目里面Swagger需要用的Schemes
	 * 
	 * @param project
	 * @return
	 * @throws JsonParseException
	 * @throws JsonMappingException
	 * @throws IOException
	 */
	static List<Scheme> toSchemes(Project project) throws JsonParseException, JsonMappingException, IOException {
		if (project.getSchemes() != null) {
			return new ObjectMapper().readValue(project.getSchemes(), new TypeReference<List<Scheme>>() {
			});
		} else {
			return null;
		}
	}
	/**
	 * 获取项目里面Swagger需要用的consumes
	 * 
	 * @param project
	 * @return
	 * @throws JsonParseException
	 * @throws JsonMappingException
	 * @throws IOException
	 */
	static List<String> toConsumes(Project project) throws JsonParseException, JsonMappingException, IOException {
		if (project.getConsumes() != null) {
			return new ObjectMapper().readValue(project.getConsumes(), new TypeReference<List<String>>() {
			});
		} else {
			return null;
		}
	}
	/**
	 * 获取项目里面Swagger需要用的Produces
	 * 
	 * @param project
	 * @return
	 * @throws JsonParseException
	 * @throws JsonMappingException
	 * @throws IOException
	 */
	static List<String> toProduces(Project project) throws JsonParseException, JsonMappingException, IOException {
		if (project.getProduces() != null) {
			return new ObjectMapper().readValue(project.getProduces(), new TypeReference<List<String>>() {
			});
		} else {
			return null;
		}
	}

	/**
	 * 获取项目里面Swagger需要用的Security
	 * 
	 * @param project
	 * @return
	 * @throws JsonParseException
	 * @throws JsonMappingException
	 * @throws IOException
	 */
	static List<SecurityRequirement> toSecurity(Project project) throws JsonParseException, JsonMappingException, IOException {
		if (project.getSecurity() != null) {
			return new ObjectMapper().readValue(project.getSecurity(), new TypeReference<List<SecurityRequirement>>() {
			});
		} else {
			return null;
		}
	}

	/**
	 * 获取项目里面Swagger需要用的SecurityDefinitions
	 * 
	 * @param project
	 * @return
	 * @throws JsonParseException
	 * @throws JsonMappingException
	 * @throws IOException
	 */
	static Map<String, SecuritySchemeDefinition> toSecurityDefinitions(Project project)
			throws JsonParseException, JsonMappingException, IOException {
		if (project.getSecurityDefinitions() != null) {
			return new ObjectMapper().readValue(project.getSecurityDefinitions(), new TypeReference<Map<String, SecuritySchemeDefinition>>() {
			});
		} else {
			return null;
		}
	}

	/**
	 * 获取项目里面Swagger需要用的Definitions
	 * 
	 * @param project
	 * @return
	 * @throws JsonParseException
	 * @throws JsonMappingException
	 * @throws IOException
	 */
	static Map<String, Model> toDefinitions(Project project) throws JsonParseException, JsonMappingException, IOException {
		if (project.getDefinitions() != null) {
			return new ObjectMapper().readValue(project.getDefinitions(), new TypeReference<Map<String, Model>>() {
			});
		} else {
			return null;
		}
	}
	/**
	 * 获取项目里面Swagger需要用的Parameter
	 * 
	 * @param project
	 * @return
	 * @throws JsonParseException
	 * @throws JsonMappingException
	 * @throws IOException
	 */
	static Map<String, Parameter> toParameters(Project project) throws JsonParseException, JsonMappingException, IOException {
		if (project.getParameters() != null) {
			return new ObjectMapper().readValue(project.getParameters(), new TypeReference<Map<String, Parameter>>() {
			});
		} else {
			return null;
		}
	}

	/**
	 * 获取项目里面Swagger需要用的Response
	 * 
	 * @param project
	 * @return
	 * @throws JsonParseException
	 * @throws JsonMappingException
	 * @throws IOException
	 */
	static Map<String, Response> toResponse(Project project) throws JsonParseException, JsonMappingException, IOException {
		if (project.getResponses() != null) {
			return new ObjectMapper().readValue(project.getResponses(), new TypeReference<Map<String, Response>>() {
			});
		} else {
			return null;
		}
	}

	/**
	 * 获取项目里面Swagger需要用的ExternalDocs
	 * 
	 * @param project
	 * @return
	 * @throws JsonParseException
	 * @throws JsonMappingException
	 * @throws IOException
	 */
	static ExternalDocs toExternalDocs(Project project) throws JsonParseException, JsonMappingException, IOException {
		if (project.getExternalDocs() != null) {
			return new ObjectMapper().readValue(project.getExternalDocs(), ExternalDocs.class);
		} else {
			return null;
		}
	}

	/**
	 * 获取项目里面Swagger需要用的VendorExtensions
	 * 
	 * @param project
	 * @return
	 * @throws JsonParseException
	 * @throws JsonMappingException
	 * @throws IOException
	 */
	static Map<String, Object> toVendorExtensions(Project project) throws JsonParseException, JsonMappingException, IOException {
		if (project.getVendorExtensions() != null) {
			return new ObjectMapper().readValue(project.getVendorExtensions(), new TypeReference<Map<String, Object>>() {
			});
		} else {
			return null;
		}
	}

}
