# time-lover-server

时光恋人服务端源码仓库

## 简介
一款情侣之间记录日常生活趣事,生活足迹的Web应用

## 效果
| 首页                                                                                        | 登录                                                                                        | 菜单                                                                                        | 体重记录                                                                                    |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| <img width="200" src="https://img.cdn.sugarat.top/mdImg/MTYzNzQ4NTA2MzkyMw==637485063923"/> | <img width="200" src="https://img.cdn.sugarat.top/mdImg/MTYzNzQ4NTE1MDExNQ==637485150115"/> | <img width="200" src="https://img.cdn.sugarat.top/mdImg/MTYzNzQ4NTE5OTA2MA==637485199060"/> | <img width="200" src="https://img.cdn.sugarat.top/mdImg/MTYzNzQ4NTI1ODAxMw==637485258013"/> |
## 功能介绍
### 基础
* [x] 验证码登录

### 体重记录
* [x] 记录体重信息
* [x] 多样化/个性化的数据统计
## 相关资料
* [数据库设计](./docs/db.md)
* [接口设计](./docs/api.md)
* [客户端仓库](https://github.com/ATQQ/timeLover)
## 启动

1. 安装相关依赖
```sh
pnpm install
```

2. 启动项目
```sh
# -------prod--------
pnpm run start
# or
pnpm start

# -------dev--------
pnpm run dev
# or
pnpm dev
```

