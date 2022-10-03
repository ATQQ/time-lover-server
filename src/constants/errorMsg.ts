import { codeMsg } from '.'

export const GlobalError = {
  unknown: codeMsg(500, 'UnKnown Error'),
  dbError: codeMsg(500, 'Database Error'),
  powerError: codeMsg(401, 'No Power'),
  paramsError: codeMsg(403, 'Error Params')
}

export const UserError = {
  errorCode: codeMsg(1001, 'Error Code')
}
