# /bin/bash
compressDir="./src package.json pnpm-lock.yaml tsconfig.json .env .env.local tsup.config.ts" # 需要压缩目录 
compressFile="lover-server.tar.gz"        # 压缩后的文件名
echo "开始-----归档压缩"
tar -zvcf ${compressFile} ${compressDir}