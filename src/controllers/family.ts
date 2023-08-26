import { Get, Inject, Post, Put, ReqBody, ReqParams, Response, RouterController } from 'flash-wolves'
import { FamilyService } from '@/service'
import { GlobalError } from '@/constants/errorMsg'

@RouterController('family', { needLogin: true })
export class FamilyController {
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

  @Put('update/:id')
  async updateFamily(@ReqBody('name') name: string, @ReqParams('id') id: string) {
    if (!name || !id) {
      return Response.failWithError(GlobalError.paramsError)
    }

    return await this.familyService.updateFamilyName(name, id)
  }
}
