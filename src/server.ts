// polyfill
import 'core-js/es/array'
import { App } from 'flash-wolves'
import { routeInterceptor, serverInterceptor } from './middleware'
import { controllers } from './controllers'

const app = new App(serverInterceptor, {
  beforeRunRoute: routeInterceptor,
  catchRuntimeError(req, res, err) {
    console.log(err)
  },
})

// 注册路由
app.addController(controllers)
app.listen()
