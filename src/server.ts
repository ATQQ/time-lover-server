// polyfill
import 'core-js/es/array'
import { App } from 'flash-wolves'
import routes from './routes'
import { serverInterceptor, routeInterceptor } from './middleware'

const app = new App(serverInterceptor, {
  beforeRunRoute: routeInterceptor,
  catchRuntimeError(req, res, err) {
    console.log(err)
  }
})

// 注册路由
app.addRoutes(routes)

app.listen()

module.exports = app
