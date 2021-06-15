# 数据库设计

## 用户表-user
|   字段   |  类型  |   描述   |
| :------: | :----: | :------: |
|  userId  | String | 唯一标识 |
|  phone   | String |  手机号  |
| joinTime |  Date  | 注册时间 |

## 成员表-family
|   字段   |  类型  |     描述     |
| :------: | :----: | :----------: |
| familyId | String |   唯一标识   |
|  userId  | String | 关联创建用户 |
|   name   | String |   成员名称   |

## 记录表-record
|   字段   |  类型  |     描述     |
| :------: | :----: | :----------: |
| recordId | String |   唯一标识   |
| familyId | String |   关联成员   |
|  userId  | String | 关联创建用户 |
|  weight  | Number |     体重     |
|   date   |  Date  |     日期     |