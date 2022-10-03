import cloudbase from '@cloudbase/node-sdk'

const app = cloudbase.init({
  secretId: process.env.secretId,
  secretKey: process.env.secretKey,
  env: process.env.envId
})

export const db = app.database()
export function insertDocument<T>(collection: string, data: T | T[]) {
  return db.collection(collection).add(data)
}

export function deleteDocument(collection: string, query: any) {
  return db.collection(collection).where(query).remove()
}

export function findDocument(collection: string, query: any) {
  // TODO: 抽空做成分页
  return db.collection(collection).where(query).limit(1000).get()
}

export function updateDocument<T>(collection: string, query: any, data: T) {
  return db.collection(collection).where(query).update(data)
}
