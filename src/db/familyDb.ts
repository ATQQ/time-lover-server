import type { Filter } from 'mongodb'
import type { Family } from './modal'
import { findCollection, insertCollection } from '@/lib/dbConnect/mongodb'

export function queryFamilies(query: Filter<Family>) {
  return findCollection<Family>('family', query)
}

export function insertFamily(family: Family) {
  return insertCollection('family', family)
}
