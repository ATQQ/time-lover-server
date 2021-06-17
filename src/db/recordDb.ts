import { deleteDocument, findDocument, insertDocument } from '@/lib/dbConnect/cloudbase'
import { Record } from './modal'

export function queryRecords(query: Record) {
    return findDocument('record', query).then(res => res.data)
}

export function insertRecord(record: Record) {
    return insertDocument('record', record)
}

export function deleteRecord(record: Record) {
    return deleteDocument('record', record)
}