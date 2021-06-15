# 接口设计
* 查看[详细设计设计](https://easy2.w.eolinker.com/share/index?shareCode=nJMZ5t)
## User
| 方法  |    路径     |      描述      |
| :---: | :---------: | :------------: |
| POST  | /user/login |    用户登录    |
|  GET  | /user/code  | 获取登录验证码 |

## Family
| 方法  |    路径     |   描述   |
| :---: | :---------: | :------: |
| POST  | /family/add | 添加成员 |

## Record
|  方法  |       路径        |   描述   |
| :----: | :---------------: | :------: |
|  POST  |    /record/add    | 添加记录 |
| DELETE | /record/:recordId | 删除记录 |