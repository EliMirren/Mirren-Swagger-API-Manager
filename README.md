# QQ交流群号: 796665306
# Mirren-Swagger-API-Manager
MSAM是一个API接口文档管理器,MSAM的属性根据swagger-models-1.5.20.jar进行定义并添加了拓展属性<br>
MSAM以项目-接口分组-接口三个单位,项目最终生成的结果理论上兼容Swagger的Swagger UI<br>
不过MSAM也有一个属于自己的Client-UI,可以方便的查看检索接口文档<br>

## 一些疑问
- 问:为什么有Swagger了还要这个东西?
- 答:因为大多前后端分离的公司基本都跟本人公司一样,先接口文档然后才有项目;而Swagger是用注解现有的项目生产接口,如果用Swagger Editor写又觉得不方便管理,所以就有了这个东西
- 问:为什么已经有了Swagger UI了还要搞一个MSAM Client-UI?
- 答:本人不喜欢Swagger UI的风格,本人的同事看Client-UI的风格已经很久了
- 问:市面上已经有接口文档管理了(比如阿里的RAP等)为什么你还要自己写
- 答:本人蛋疼

## 项目的结构
- 项目的后台采用了大部分人熟悉的SpringBoot写(其实本人与公司已经用Vert.x一年多了,不是很喜欢Spring),
- 文件存储使用JDBC操作Sqlite3数据库
- Server-UI用于管理接口文档(Bootstrap)
- Client-UI用于展示接口文档(Bootstrap Docs)

## 项目如何运行
- 运行环境要求,开发环境为java 1.8.0_121,理论上java1.8以上都可以运行,如果没有java运行环境,可以看使用说明里面的免JDK教程
- 项目可以在releases(发行版)里面下载已经打包好的也可以自己打包项目
- 执行 `mvn clean package` 进行项目打包
- 执行完毕后 进入target/MSAM目录,该目录包含了Client-UI(展示接口文档的UI),Server-UI(管理接口的UI),config(存放接口文档的Sqlite,旧版升级可以将旧版的数据拷贝到新版中),Mirren-Swagger-API-Manager.jar
- 在MSAM目录中执行`java -jar Mirren-Swagger-API-Manager.jar` 或直接运行start.bat(windows)start.sh(unix)启动MSAM服务,端口号默认为8686
- 修改端口号可以修改为`java -jar -Dserver.port=端口号  Mirren-Swagger-API-Manager.jar` 
- 启动MSAM服务后在浏览器访问http://服务地址:端口号/
- 选择服务端UI或客户端UI进行操作
- 服务端地址: http://服务地址:端口号/Server-UI/index.html
- 客户端地址: http://服务地址:端口号/Client-UI/index.html

## 拓展与二次开发
数据库里面定义了项目,接口分组,以及接口三张表,属性对应Swagger的Swagger,Tags,Operation这三个类,前端操作需要将Json类型转换为String类型

## 使用说明
- 第一步 启动Mirren-Swagger-API-Manager.jar(start.bat / start.sh)
- 第二步 访问http://服务地址:端口号/
- 第三步 选择服务端UI,新建项目,输入项目信息后确定创建项目
- 第四步 在项目列表中点击项目
- 第五步 新建接口
- 第六步 新建接口
- 第七步 在项目信息中选择将项目转为Swagger_2.0 .Json文件并下载或在线查看获得文件路径
- 第八步 访问http://服务地址:端口号/Client-UI/index.html
- 第九步 打开保存的文件,或者输入文件路径加载数据

## 界面展示

### Server-UI
![Server-UI](https://raw.githubusercontent.com/shenzhenMirren/MyGithubResources/master/image/MSAM_server_index.png) 
### Client-UI
![Client-UI](https://raw.githubusercontent.com/shenzhenMirren/MyGithubResources/master/image/MSAM_client_index.png) 
![Client-UI](https://raw.githubusercontent.com/shenzhenMirren/MyGithubResources/master/image/MSAM_client_index2.png) 

