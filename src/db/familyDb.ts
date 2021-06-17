import { findDocument, insertDocument } from '@/lib/dbConnect/cloudbase'
import { Family } from './modal'

export function queryFamilies(query: Family) {
    return findDocument('family', query).then(res => res.data)
}

export function insertFamily(family: Family) {
    return insertDocument('family', family)
}