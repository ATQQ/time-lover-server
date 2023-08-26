import { Delete, Get, Inject, Post, Put, ReqBody, ReqParams, RouterController } from 'flash-wolves'
import { RecordService } from '@/service'

@RouterController('record', { needLogin: true })
export class recordController {
  @Inject(RecordService)
  private recordService: RecordService

  @Post(':familyId')
  async addRecord(@ReqBody() body: any, @ReqParams('familyId') familyId) {
    const { weight, date, tips } = body
    const recordId = await this.recordService.addRecord(weight, date, tips, familyId)
    return { recordId }
  }

  @Get(':familyId')
  async getRecords(@ReqParams('familyId') familyId) {
    const records = await this.recordService.getRecords(familyId)
    return { records }
  }

  @Delete(':recordId')
  async deleteRecord(@ReqParams('recordId') recordId) {
    await this.recordService.deleteRecord(recordId)
  }

  @Put(':recordId')
  async updateRecord(@ReqBody() body: any, @ReqParams('recordId') recordId) {
    const { weight, date, tips } = body
    await this.recordService.updateRecord({ weight, date, tips }, recordId)
  }
}
