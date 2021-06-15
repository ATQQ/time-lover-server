import { findDocument, insertDocument } from '@/lib/dbConnect/cloudbase'
import { User } from './modal'

export function queryUserList(query: User) {
    return findDocument('user', query).then(res => res.data)
}

export function inserUser(user: User) {
    return insertDocument('user', user)
}