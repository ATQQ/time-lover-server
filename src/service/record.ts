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
    // const count = await this.getRecordsCount(familyId)
    // const pageSize = 500
    // const pageCount = 3
    // const records = []
    // console.log('sum', count, 'pageCount', pageCount)

    // for (let i = 1; i <= pageCount; i++) {
    //   const rs = await queryRecordsByPage({
    //     familyId,
    //     userId: this.ctx.req.userInfo.userId,
    //   }, i, pageSize)
    //   records.push(...rs)
    // }
    // 展示最近500条记录，未来优化分页加载
    const records = await queryRecordsByPage({
      familyId,
      userId: this.ctx.req.userInfo.userId,
    }, 1, 500)
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
