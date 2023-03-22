import { message } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

export const rules = {
  required: (message: string = 'Обязательное поле') => ({
    required: true,
    message
  }),
  isDateAfter: (message: string) => () => ({
    validator(_: any, value: Dayjs) {
      if (value.isSame(dayjs()) || value.isAfter(dayjs())) {
        return Promise.resolve()
      }
      return Promise.reject(new Error(message))
    }
  })
}
