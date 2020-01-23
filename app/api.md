# Api文档

## 结构命名

|命名|方法|功能|
|---|---|---|
|login|POST|登录|
|exit|POST|退出|
|home|Restful|首页|
|user|Restful|用户|
|affair|Restful|事务|

## 返回信息

|返回码|模块|提示语|
|---|---|---|
|0|所有|成功|
|1000|登录|用户名或密码不正确|
|1001|登录|请输入用户名|
|1002|登录|请输入密码|
|2000|用户||
|2001|用户、事务|分页数据条数缺失|
|2002|用户、事务|分页数据页数缺失|
|2003|用户||