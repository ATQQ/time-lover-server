import { Middleware } from 'flash-wolves'
import { GlobalError } from '@/constants/errorMsg'
import { getUserInfo } from '@/utils/tokenUtil'

const interceptor: Middleware = async (req, res) => {
  if (req?.route?.meta?.needLogin) {
    const user = await getUserInfo(req)
    if (!user) {
      res.failWithError(GlobalError.powerError)
    }
  }
}
export default interceptor
