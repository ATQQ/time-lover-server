import { GlobalError } from '@/constants/errorMsg'
import { Middleware } from '@/lib/server/types'
import { getUserInfo } from '@/utils/tokenUtil'

const interceptor: Middleware = async (req, res) => {
    const { options } = req.route
    console.log(`路由拦截:${req.method} - ${req.url}`)
    if (options && options.needLogin) {
        const user = await getUserInfo(req)
        if(!user){
            res.failWithError(GlobalError.powerError)
        }
    }
}
export default interceptor