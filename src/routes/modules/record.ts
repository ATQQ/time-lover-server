import { deleteRecord, insertRecord, queryRecords } from '@/db/recordDb'
import { Router } from 'flash-wolves'
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
        date: new Date(date),
        familyId,
        userId
    })
    res.success({
        recordId
    })
}, {
    needLogin: true
})

router.get(':familyId', async (req, res) => {
    const { familyId } = req.params
    const { userId } = await getUserInfo(req)

    const records = await queryRecords({
        familyId,
        userId
    })
    records.forEach(r => {
        r._id = undefined
    })
    records.sort((a, b) => b.date - a.date)
    res.success({
        records
    })
}, {
    needLogin: true
})

router.delete(':recordId', async (req, res) => {
    const { recordId } = req.params
    const { userId } = await getUserInfo(req)
    await deleteRecord({
        recordId,
        userId
    })
    res.success()
}, {
    needLogin: true
})

export default router
