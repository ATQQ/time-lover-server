import type { Filter } from 'mongodb'
import type { Family } from './modal'
import { findCollection, findCollectionCount, insertCollection, updateCollection } from '@/lib/dbConnect/mongodb'

export function queryFamilies(query: Filter<Family>) {
  query.$and = (query.$and || []).concat([
    {
      deleted: {
        $ne: true,
      },
    },
  ])
  return findCollection<Family>('family', query)
}

export function insertFamily(family: Family) {
  return insertCollection('family', family)
}

export function updateFamily(query: Filter<Family>, family: Family) {
  return updateCollection('family', query, {
    $set: family,
  })
}

export function findFamilyCount(query: Filter<Family>) {
  return findCollectionCount('family', query)
}

export function deleteFamily(query: Filter<Family>) {
  return updateCollection('family', query, {
    $set: {
      deleted: true,
    },
  })
}
