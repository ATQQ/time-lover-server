import process from 'node:process'
import type { Context } from 'flash-wolves'
import { Get, Inject, InjectCtx, Post, ReqBody, ReqQuery, Response, RouterController } from 'flash-wolves'
import { UserService } from '@/service'
import { getUniqueKey } from '@/utils/stringUtil'
import { GlobalError, UserError } from '@/constants/errorMsg'
import { expiredRedisKey, getRedisVal, setRedisValue } from '@/db/redisDb'
import { rMobilePhone, rVerCode } from '@/utils/regExp'
import { randomNumStr } from '@/utils/randUtil'
import { sendMessage } from '@/utils/tencent'

@RouterController('user')
export class UserController {
  @InjectCtx()
  private ctx: Context

  @Inject(UserService)
  private userService: UserService

  @Post('login')
  async userLogin(@ReqBody('phone') phone: string, @ReqBody('code') code: string) {
    // 测试账号数据
    if (phone === '13245678910' && code === '1234') {
      let [user] = await this.userService.findUserListByPhone(phone)
      if (!user) {
        user = {
          userId: getUniqueKey(),
          phone,
          joinTime: new Date(),
        }
        await this.userService.addUser(user)
      }
      const token = this.userService.createToken(user)
      return {
        token,
      }
    }
    // 参数格式不正确
    if (!rMobilePhone.test(phone) || !rVerCode.test(code)) {
      return Response.failWithError(GlobalError.paramsError)
    }
    const v = await getRedisVal(`code-${phone}`)
    if (code !== v) {
      return Response.failWithError(UserError.errorCode)
    }
    let [user] = await this.userService.findUserListByPhone(phone)
    // 不存在就插入
    if (!user) {
      user = {
        userId: getUniqueKey(),
        phone,
        joinTime: new Date(),
      }
      await this.userService.addUser(user)
    }
    // 12个月有效
    const token = await this.userService.createToken(user, 60 * 60 * 24 * 30 * 12)
    expiredRedisKey(`code-${phone}`)
    return {
      token,
    }
  }

  @Get('code')
  async sendCode(@ReqQuery('phone') phone: string) {
    // 参数格式不正确
    if (!rMobilePhone.test(phone)) {
      return Response.failWithError(GlobalError.paramsError)
    }
    const code = randomNumStr(4)
    await setRedisValue(`code-${phone}`, code, 60 * 2)
    if (process.env.NODE_ENV !== 'development') {
      //  发送验证码
      await sendMessage(phone, code, 2)
    }
    console.log(code)
  }
}
