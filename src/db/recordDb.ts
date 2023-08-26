import type { Filter, UpdateFilter, WithId } from 'mongodb'
import type { Record } from './modal'
import {
  findCollection,
  findCollectionCount,
  insertCollection,
  mongoDbQuery,
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

/**
 * 分页查询
 */
export function queryRecordsByPage(query: Filter<Record>, page: number, pageSize: number) {
  query.$and = (query.$and || []).concat([
    {
      deleted: {
        $ne: true,
      },
    },
  ])

  return mongoDbQuery<WithId<Record>[]>((db, resolve) => {
    db.collection<Record>('record')
      .find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray()
      .then((data) => {
        resolve(data)
      })
  })
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
  query.$and = (query.$and || []).concat([
    {
      deleted: {
        $ne: true,
      },
    },
  ])
  return findCollectionCount('record', query)
}

export function updateRecord(record: Filter<Record>, update: Record) {
  return updateCollection('record', record, {
    $set: update,
  })
}
