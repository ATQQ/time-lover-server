import { Provide } from 'flash-wolves'
import { insertUser, queryUserList } from '@/db/userDb'
import type { User } from '@/db/modal'
import tokenUtil from '@/utils/tokenUtil'

@Provide()
export class UserService {
  findUserListByPhone(phone: string) {
    return queryUserList({
      phone,
    })
  }

  addUser(user: User) {
    return insertUser(user)
  }

  async createToken(user: User, expires?: number) {
    const token = await tokenUtil.createToken(user, expires || 60 * 60 * 24 * 30)
    return token
  }
}
