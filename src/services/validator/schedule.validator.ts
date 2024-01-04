import * as Yup from 'yup'
import { startTimeEventDate, endTimeEventDate } from './common'

export const ScheduleSchema = Yup.object().shape({
  startTimeEventDate,
  endTimeEventDate
})
