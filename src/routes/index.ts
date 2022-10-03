// types
import { Route } from 'flash-wolves'

// router
import user from './modules/user'
import family from './modules/family'
import record from './modules/record'

// 这里注册路由
const routers = [user, family, record]

export default routers.reduce((pre: Route[], router) => {
  return pre.concat(router.getRoutes())
}, [])
