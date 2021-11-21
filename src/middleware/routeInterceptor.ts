import { GlobalError } from '@/constants/errorMsg'
import { Middleware } from 'flash-wolves'
import { getUserInfo } from '@/utils/tokenUtil'

const interceptor: Middleware = async (req, res) => {
    console.log(`路由拦截:${req.method} - ${req.url}`)
    if (req?.route?.options?.needLogin) {
        const user = await getUserInfo(req)
        if(!user){
            res.failWithError(GlobalError.powerError)
        }
    }
}
export default interceptor