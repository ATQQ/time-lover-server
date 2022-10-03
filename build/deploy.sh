# /bin/bash
compressFile="lover-server.tar.gz"        # 压缩后的文件名
user="root"                         # 远程登录用户
origin="lover.sugarat.top"                   # 远程登录origin
targetDir="/www/wwwroot/lover.sugarat.top/server"     # 目标目录

echo "开始-----上传"
scp ${compressFile} root@sugarat.top:./
echo "开始-----部署"
ssh -p22 ${user}@${origin} "rm -rf ${targetDir} && mkdir ${targetDir} -p && tar -zvxf ${compressFile} -C ${targetDir}"
echo "开始-----安装依赖"
ssh -p22 ${user}@${origin} "cd ${targetDir} && pnpm install"
echo "开始-----build"
ssh -p22 ${user}@${origin} "cd ${targetDir} && pnpm build"
echo "开始-----重新启动"
ssh -p22 ${user}@${origin} "pm2 restart lover-prod"
echo "清理-----临时的文件"
rm -rf $compressFile