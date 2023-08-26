import 'flash-wolves'
import { User } from './db/modal'

declare module 'flash-wolves' {
  interface RouteMeta {
    // 需要登录
    needLogin?: boolean
  }

  interface FWRequest{
    userInfo?: User
  }
}
