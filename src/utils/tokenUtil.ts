import { FWRequest } from 'flash-wolves'
import { User } from '@/db/modal/index'
import { expiredRedisKey, getRedisVal, setRedisValue } from '@/db/redisDb'
import { encryption } from './stringUtil'
/**
 * Token(身份令牌)工具类
 */
class TokenUtil {
  /**
   * 生成token
   */
  async createToken(user: User, timeout = 60 * 60 * 24) {
    const { phone, userId } = user
    const token = encryption([phone, userId, Date.now()].join())
    await setRedisValue(token, JSON.stringify(user), timeout)
    return token
  }

  expiredToken(token: string) {
    expiredRedisKey(token)
  }

  async getUserInfo(token: string): Promise<User> {
    const v = await getRedisVal(token)
    if (v) {
      return JSON.parse(v)
    }
    return null
  }

  static instance: TokenUtil = null

  static getInstance() {
    if (!this.instance) {
      this.instance = new TokenUtil()
    }
    return this.instance
  }
}

export default TokenUtil.getInstance()

export async function getUserInfo(req: FWRequest) {
  const user = await TokenUtil.getInstance().getUserInfo(
    req.headers.token as string
  )
  return user
}
