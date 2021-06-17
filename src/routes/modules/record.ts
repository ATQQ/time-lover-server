import { deleteRecord, insertRecord, queryRecords } from '@/db/recordDb'
import Router from '@/lib/Router'
import { getUniqueKey } from '@/utils/stringUtil'
import { getUserInfo } from '@/utils/tokenUtil'

const router = new Router('record')

router.post(':familyId', async (req, res) => {
    const { familyId } = req.params
    const { weight, date } = req.body
    const { userId } = await getUserInfo(req)
    const recordId = getUniqueKey()
    await insertRecord({
        recordId,
        weight,
        date:new Date(date),
        familyId,
        userId
    })
    res.success({
        recordId
    })
})

router.get(':familyId',async(req,res)=>{
    const {familyId} = req.params
    const { userId } = await getUserInfo(req)

    const records = await queryRecords({
        familyId,
        userId
    })
    records.forEach(r=>{
        r._id = undefined
    })
    res.success({
        records
    })
})

router.delete(':recordId',async (req,res)=>{
    const { recordId } = req.params
    const { userId } = await getUserInfo(req)
    await deleteRecord({
        recordId,
        userId
    })
    res.success()
})

export default router
