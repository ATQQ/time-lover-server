import { insertFamily, queryFamilies } from '@/db/familyDb'
import Router from '@/lib/Router'
import { getUserInfo } from '@/utils/tokenUtil'

const router = new Router('family')

router.post('add', async (req, res) => {
    const { name } = req.body
    const { userId } = await getUserInfo(req)
    await insertFamily({
        name,
        userId,
    })
    res.success()
})


router.get('/list', async (req, res) => {
    const { userId } = await getUserInfo(req)
    const families = await queryFamilies({
        userId
    })
    // 移除_id
    families.forEach(f => {
        f._id = undefined
    })
    res.success({
        families
    })
})
export default router
