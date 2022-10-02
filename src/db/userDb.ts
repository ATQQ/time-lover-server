import { findDocument, insertDocument } from '@/lib/dbConnect/cloudbase'
import { getDBConnection } from '@/lib/dbConnect/mongodb'
import { User } from './modal'
export function queryUserList(query: User) {
    getDBConnection()
    return findDocument('user', query).then(res => res.data)
}

export function inserUser(user: User) {
    return insertDocument('user', user)
}