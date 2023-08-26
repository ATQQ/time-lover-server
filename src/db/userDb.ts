// import { findDocument, insertDocument } from '@/lib/dbConnect/cloudbase'
import type { Filter } from 'mongodb'
import type { User } from './modal'
import { findCollection, insertCollection } from '@/lib/dbConnect/mongodb'

export function queryUserList(query: Filter<User>) {
  return findCollection<User>('user', query)
}

export function insertUser(user: User) {
  return insertCollection('user', user)
}
