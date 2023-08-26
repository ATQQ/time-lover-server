import type { Filter } from 'mongodb'
import type { Record } from './modal'
import {
  findCollection,
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
