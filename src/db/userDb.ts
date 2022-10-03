// import { findDocument, insertDocument } from '@/lib/dbConnect/cloudbase'
import { FilterQuery } from 'mongodb'
import { insertCollection, findCollection } from '@/lib/dbConnect/mongodb'
import { User } from './modal'

export function queryUserList(query: FilterQuery<User>) {
  return findCollection<User>('user', query)
}

export function insertUser(user: User) {
  return insertCollection('user', user)
}
