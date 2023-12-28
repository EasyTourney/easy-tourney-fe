import * as Yup from 'yup'
import { title } from './common'

export const TournamentSchema = Yup.object().shape({
  title
})
