import { FilterQuery } from 'mongodb'
import {
  findCollection,
  insertCollection,
  updateCollection
} from '@/lib/dbConnect/mongodb'
import { Record } from './modal'

export function queryRecords(query: FilterQuery<Record>) {
  return findCollection<Record>('record', query)
}

export function insertRecord(record: Record) {
  return insertCollection('record', record)
}

export function deleteRecord(record: FilterQuery<Record>) {
  return updateCollection<Record>('record', record, {
    $set: {
      userId: 'trash'
    }
  })
}
