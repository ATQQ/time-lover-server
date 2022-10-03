import { FilterQuery } from 'mongodb'
import { findCollection, insertCollection } from '@/lib/dbConnect/mongodb'
import { Family } from './modal'

export function queryFamilies(query: FilterQuery<Family>) {
  return findCollection<Family>('family', query)
}

export function insertFamily(family: Family) {
  return insertCollection('family', family)
}
