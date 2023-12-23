import * as Yup from 'yup'
import { teamName } from './common'

export const ParticipantSchema = Yup.object().shape({
  teamName
})
