import * as tencentcloud from 'tencentcloud-sdk-nodejs'
import { SendSmsRequest } from 'tencentcloud-sdk-nodejs/tencentcloud/services/sms/v20210111/sms_models'
import { txConfig } from '@/config'
// [文档地址](https://cloud.tencent.com/document/product/382/43197)

export function sendMessage(phone, code, time = 2) {
  const SmsClient = tencentcloud.sms.v20210111.Client

  const clientConfig = {
    credential: {
      secretId: txConfig.secretId,
      secretKey: txConfig.secretKey
    },
    region: 'ap-guangzhou',
    profile: {}
  }
  console.log(clientConfig)

  const client = new SmsClient(clientConfig)
  const args = [code, `${time}`]
  const params: SendSmsRequest = {
    PhoneNumberSet: [`+86${phone}`],
    TemplateParamSet: args,
    TemplateId: txConfig.templateId,
    SmsSdkAppId: txConfig.smsSdkAppid,
    SignName: '粥里有勺糖'
  }
  console.log('---------send request-------')
  console.log(params)
  return new Promise((res, rej) => {
    client.SendSms(params, function (err, response) {
      // 请求异常返回，打印异常信息
      if (err) {
        console.log('---------request error-------')
        console.log(err)
        rej(err)
        return
      }
      // 请求正常返回，打印response对象
      console.log('---------request response-------')
      console.log(response)
      res(response)
    })
  })
}
