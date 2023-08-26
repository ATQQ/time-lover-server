#!/usr/bin/env zx
/* eslint-disable no-undef */

// user config
const originName = 'lover'
const serverName = 'lover-server'

// not care
const compressPkgName = `${originName}.tar.gz`
const user = 'root'
const origin = 'sugarat.top'
const fullOrigin = `${originName}.${origin}`
const baseServerDir = '/www/wwwroot'
const destDir = 'server'

await $`pnpm build`

await $`echo ==🔧 压缩==`
await $`tar -zvcf ${compressPkgName} dist package.json`

await $`echo ==🚀 上传到服务器 ==`
await $`scp ${compressPkgName} ${user}@${origin}:./`
await $`rm -rf ${compressPkgName}`

await $`echo ==✅ 部署代码 ==`
if (destDir) {
  await $`ssh -p22 ${user}@${origin} "mkdir -p ${baseServerDir}/${fullOrigin}/${destDir}"`
}
await $`ssh -p22 ${user}@${origin} "tar -xf ${compressPkgName} -C ${baseServerDir}/${fullOrigin}/${destDir}"`
await $`ssh -p22 ${user}@${origin} "cd ${baseServerDir}/${fullOrigin}/${destDir} && pnpm install"`

await $`echo ==🏆︎ 重启服务 ==`
await $`ssh -p22 ${user}@${origin} "pm2 restart ${serverName}"`
