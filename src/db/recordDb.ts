import type { Filter } from 'mongodb'
import type { Record } from './modal'
import {
  findCollection,
  findCollectionCount,
  insertCollection,
  updateCollection,
} from '@/lib/dbConnect/mongodb'

export function queryRecords(query: Filter<Record>) {
  return findCollection<Record>('record', query)
}

export function insertRecord(record: Record) {
  return insertCollection('record', record)
}

export function deleteRecord(record: Filter<Record>) {
  return updateCollection<Record>('record', record, {
    $set: {
      userId: 'trash',
    },
  })
}

export function findRecordCount(query: Filter<Record>) {
  return findCollectionCount('record', query)
}
