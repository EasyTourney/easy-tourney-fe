import * as Yup from 'yup'
import { selectCategory, title } from './common'

export const TournamentSchema = Yup.object().shape({
  title,
  selectCategory
})
