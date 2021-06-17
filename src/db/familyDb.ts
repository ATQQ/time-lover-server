import { findDocument, insertDocument } from '@/lib/dbConnect/cloudbase'
import { getUniqueKey } from '@/utils/stringUtil'
import { Family } from './modal'

export function queryFamilies(query: Family) {
    return findDocument('family', query).then(res => res.data)
}

export function insertFamily(family: Family) {
    Object.assign(family, { familyId: getUniqueKey() }, family)
    return insertDocument('family', family)
}