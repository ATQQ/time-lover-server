import type { Context } from 'flash-wolves'
import { Inject, InjectCtx, Provide } from 'flash-wolves'
import { RecordService } from './record'
import { deleteFamily, insertFamily, queryFamilies, updateFamily } from '@/db/familyDb'
import { getUniqueKey } from '@/utils/stringUtil'

@Provide()
export class FamilyService {
  @InjectCtx()
  private ctx: Context

  @Inject(RecordService)
  private recordService: RecordService

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

  async updateFamilyName(name: string, id: string) {
    const { userId } = this.ctx.req.userInfo
    // 特殊处理default
    if (id === 'default') {
      const result = await queryFamilies({
        userId,
        familyId: 'default'
      })

      // 新增
      if (result.length === 0) {
        await insertFamily({
          name,
          userId,
          familyId: 'default',
        })
      }
    }

    await updateFamily({
      userId,
      familyId: id
    }, {
      name
    })
  }

  async deleteFamily(id: string) {
    // 先获取数据
    const recordsCount = await this.recordService.getRecordsCount(id)
    console.log(await this.recordService.getRecords(id))
    if (recordsCount > 0) {
      return false
    }

    await deleteFamily({
      userId: this.ctx.req.userInfo.userId,
      familyId: id
    })
    return true
  }
}
