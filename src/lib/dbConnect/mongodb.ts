import type {
  Db,
  Filter,
  InsertManyResult,
  InsertOneResult,
  UpdateFilter,
  UpdateResult,
  WithId
} from 'mongodb'
import {
  MongoClient

} from 'mongodb'
import { mongodbConfig } from '@/config'

const { host, port, user, password, database, auth } = mongodbConfig

const url = auth
  ? `mongodb://${user}:${password}@${host}:${port}/${database}`
  : `mongodb://${host}:${port}/${database}?wtimeoutMS=2000`

interface Res {
  db: MongoClient
  Db: Db
}

export function getDBConnection(): Promise<Res> {
  return new Promise((res, rej) => {
    MongoClient.connect(url)
      .then((db) => {
        res({
          db,
          Db: db.db(database),
        })
      })
      .catch((err) => {
        rej(err)
      })
  })
}

type Callback<T> = (
  db: Db,
  resolve: (value: T | PromiseLike<T>) => void
) => void

export function query<T>(callback: Callback<T>): Promise<T> {
  const p = new Promise<T>((resolve, rej) => {
    getDBConnection().then(({ db, Db }) => {
      // 执行回调
      callback(Db, resolve)
      // resolve后关闭
      p.catch(e => rej(e)).finally(() => {
        db.close()
      })
    })
  })
  return p
}

export const mongoDbQuery = query
export function updateCollection<T>(
  collection: string,
  query: Filter<T>,
  data: UpdateFilter<T>,
  many = false,
) {
  return mongoDbQuery<UpdateResult>((db, resolve) => {
    if (many) {
      db.collection<T>(collection).updateMany(query, data).then(resolve)
      return
    }
    db.collection<T>(collection).updateOne(query, data).then(resolve)
  })
}

export function insertCollection<T>(
  collection: string,
  data: T[] | T,
  many = false,
) {
  return mongoDbQuery<InsertOneResult | InsertManyResult<WithId<T>>>((db, resolve) => {
    if (many && Array.isArray(data)) {
      db.collection<T>(collection)
        .insertMany(data as any)
        .then(resolve as any)
      return
    }
    db.collection<T>(collection)
      .insertOne(data as any)
      .then(resolve)
  })
}
export function findCollection<T>(
  collection: string,
  query: Filter<T>,
) {
  return mongoDbQuery<WithId<T>[]>((db, resolve) => {
    db.collection<T>(collection)
      .find(query)
      .toArray()
      .then((data) => {
        resolve(data)
      })
  })
}

export function findCollectionCount<T>(
  collection: string,
  query: Filter<T>,
): Promise<number> {
  return mongoDbQuery<number>((db, resolve) => {
    db.collection<T>(collection)
      .countDocuments(query)
      .then((data) => {
        resolve(data)
      })
  })
}
