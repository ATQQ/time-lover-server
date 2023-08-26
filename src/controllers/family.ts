import type { Context } from 'flash-wolves'
import { Get, Inject, InjectCtx, Post, ReqBody, RouterController } from 'flash-wolves'
import { FamilyService } from '@/service'

@RouterController('family', { needLogin: true })
export class FamilyController {
  @InjectCtx()
  private ctx: Context

  @Inject(FamilyService)
  private familyService: FamilyService

  @Post('add')
  async addFamily(@ReqBody('name') name: string) {
    return await this.familyService.addFamily(name)
  }

  @Get('list')
  async getFamilyList() {
    return await this.familyService.getFamilyList()
  }
}
