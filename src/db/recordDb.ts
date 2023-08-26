import type { Filter } from 'mongodb'
import type { Record } from './modal'
import {
  findCollection,
  findCollectionCount,
  insertCollection,
  updateCollection,
} from '@/lib/dbConnect/mongodb'

export function queryRecords(query: Filter<Record>) {
  query.$and = (query.$and || []).concat([
    {
      deleted: {
        $ne: true,
      },
    },
  ])
  return findCollection<Record>('record', query)
}

export function insertRecord(record: Record) {
  return insertCollection('record', record)
}

export function deleteRecord(record: Filter<Record>) {
  return updateCollection<Record>('record', record, {
    $set: {
      deleted: true,
    },
  })
}

export function findRecordCount(query: Filter<Record>) {
  return findCollectionCount('record', query)
}
