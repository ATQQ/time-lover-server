import { Router } from 'flash-wolves'
import { GlobalError, UserError } from '@/constants/errorMsg'
import { expiredRedisKey, getRedisVal, setRedisValue } from '@/db/redisDb'
import { insertUser, queryUserList } from '@/db/userDb'
import { randomNumStr } from '@/utils/randUtil'
import { rMobilePhone, rVerCode } from '@/utils/regExp'
import { getUniqueKey } from '@/utils/stringUtil'
import { sendMessage } from '@/utils/tencent'
import tokenUtil from '@/utils/tokenUtil'

const router = new Router('user')

router.post('login', async (req, res) => {
  const { phone, code } = req.body

  // 测试账号数据
  if (phone === '13245678910' && code === '1234') {
    let [user] = await queryUserList({
      phone
    })
    if (!user) {
      user = {
        userId: getUniqueKey(),
        phone,
        joinTime: new Date()
      }
      await insertUser(user)
    }
    const token = await tokenUtil.createToken(user, 60 * 60 * 24 * 30)
    res.success({
      token
    })
    return
  }
  // 参数格式不正确
  if (!rMobilePhone.test(phone) || !rVerCode.test(code)) {
    res.failWithError(GlobalError.paramsError)
    return
  }
  const v = await getRedisVal(`code-${phone}`)
  if (code !== v) {
    res.failWithError(UserError.errorCode)
    return
  }
  let [user] = await queryUserList({
    phone
  })
  // 不存在就插入
  if (!user) {
    user = {
      userId: getUniqueKey(),
      phone,
      joinTime: new Date()
    }
    await insertUser(user)
  }
  // 12个月有效
  const token = await tokenUtil.createToken(user, 60 * 60 * 24 * 30 * 12)
  expiredRedisKey(`code-${phone}`)
  res.success({
    token
  })
})

router.get('code', async (req, res) => {
  const { phone } = req.query
  // 参数格式不正确
  if (!rMobilePhone.test(phone)) {
    res.failWithError(GlobalError.paramsError)
    return
  }
  const code = randomNumStr(4)
  if (process.env.NODE_ENV !== 'development') {
    //  发送验证码
    await sendMessage(phone, code, 2)
  }
  setRedisValue(`code-${phone}`, code, 120)
  console.log(code)
  res.success()
})

export default router
