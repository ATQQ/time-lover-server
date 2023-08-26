import { getClient } from '@/lib/dbConnect/redis'

export async function setRedisValue(k: string, v: string, expiredTime = -1) {
  const client = await getClient()
  await client.set(k, v)
  if (expiredTime !== -1) {
    await client.expire(k, expiredTime)
  }
  await client.quit()
}

export async function getRedisVal(k: string) {
  const client = await getClient()
  const value = client.get(k);
  await client.quit()
  return value
}

export function expiredRedisKey(k: string) {
  setRedisValue(k, '', 0)
}
