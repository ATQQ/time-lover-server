import type { Context } from 'flash-wolves'
import { InjectCtx, Provide } from 'flash-wolves'
import { insertFamily, queryFamilies } from '@/db/familyDb'
import { getUniqueKey } from '@/utils/stringUtil'

@Provide()
export class FamilyService {
  @InjectCtx()
  private ctx: Context

  async addFamily(name: string) {
    const { userId } = this.ctx.req.userInfo
    const familyId = getUniqueKey()
    await insertFamily({
      name,
      userId,
      familyId,
    })
    return {
      familyId
    }
  }

  async getFamilyList() {
    const { userId } = this.ctx.req.userInfo

    const families = await queryFamilies({
      userId,
    })
    // 移除_id
    families.forEach((f) => {
      delete f._id
    })
    return {
      families
    }
  }
}
