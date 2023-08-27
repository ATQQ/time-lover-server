import type { Context } from 'flash-wolves'
import { InjectCtx, Provide } from 'flash-wolves'
import { deleteRecord, findRecordCount, insertRecord, queryRecords, queryRecordsByPage, updateRecord } from '@/db/recordDb'
import { getUniqueKey } from '@/utils/stringUtil'
import type { Record } from '@/db/modal'

@Provide()
export class RecordService {
  @InjectCtx()
  private ctx: Context

  async addRecord(weight: number, date: string, tips: string, familyId: string) {
    const recordId = getUniqueKey()
    await insertRecord({
      recordId,
      weight,
      date: new Date(date),
      familyId,
      userId: this.ctx.req.userInfo.userId,
      tips: tips || '',
    })
    return recordId
  }

  async getRecords(familyId: string) {
    // 获取总条数
    // 展示最近1000条记录，未来优化分页加载
    const records = await queryRecordsByPage({
      familyId,
      userId: this.ctx.req.userInfo.userId,
    }, 1, 1000)
    // const records = await queryRecords({
    //   familyId,
    //   userId: this.ctx.req.userInfo.userId,
    // })
    records.forEach((r) => {
      delete r._id
      delete r.userId
    })
    records.sort((a, b) => +new Date(b.date) - +new Date(a.date))
    return records
  }

  async getRecordsCount(familyId: string) {
    return await findRecordCount({
      familyId,
      userId: this.ctx.req.userInfo.userId,
    })
  }

  async deleteRecord(recordId: string) {
    await deleteRecord({
      recordId,
      userId: this.ctx.req.userInfo.userId,
    })
  }

  async updateRecord(record: Partial<Record>, recordId: string) {
    return await updateRecord({
      recordId
    }, record)
  }
}
