import 'flash-wolves'

declare module 'flash-wolves' {
  interface RouteMeta {
    // 需要登录
    needLogin?: boolean
  }
}
