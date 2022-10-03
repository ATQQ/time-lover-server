import { Router } from 'flash-wolves'
import { insertFamily, queryFamilies } from '@/db/familyDb'
import { getUniqueKey } from '@/utils/stringUtil'
import { getUserInfo } from '@/utils/tokenUtil'

const router = new Router('family')

router.post(
  'add',
  async (req, res) => {
    const { name } = req.body
    const { userId } = await getUserInfo(req)
    const familyId = getUniqueKey()
    await insertFamily({
      name,
      userId,
      familyId
    })
    res.success({
      familyId
    })
  },
  {
    needLogin: true
  }
)

router.get(
  '/list',
  async (req, res) => {
    const { userId } = await getUserInfo(req)
    const families = await queryFamilies({
      userId
    })
    // 移除_id
    families.forEach((f) => {
      delete f._id
    })
    res.success({
      families
    })
  },
  {
    needLogin: true
  }
)
export default router
