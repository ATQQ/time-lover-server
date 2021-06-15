// types
import { Route } from '@/lib/server/types'

// router
import user from './modules/user'

// 这里注册路由
const routers = [user]

export default routers.reduce((pre: Route[], router) => {
    return pre.concat(router.getRoutes())
}, [])