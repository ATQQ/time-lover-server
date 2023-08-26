import { createClient } from 'redis';

export async function getClient() {
  // 使用默认配置
  const client = createClient()
  client.on('error', (err) => {
    console.log(`Error ${err}`)
  })
  await client.connect();
  return client
}
