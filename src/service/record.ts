import type { Context } from 'flash-wolves'
import { InjectCtx, Provide } from 'flash-wolves'
import { deleteRecord, findRecordCount, insertRecord, queryRecords, updateRecord } from '@/db/recordDb'
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
    const records = await queryRecords({
      familyId,
      userId: this.ctx.req.userInfo.userId,
    })
    records.forEach((r) => {
      delete r._id
    })
    records.sort((a, b) => +b.date - +a.date)
    return records
  }

  async getRecordsCount(familyId: string) {
    return await findRecordCount({
      familyId,
      $nor: [
        {
          userId: 'trash'
        }
      ]
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
