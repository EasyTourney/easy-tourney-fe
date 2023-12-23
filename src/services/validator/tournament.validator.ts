import * as Yup from 'yup'
import { title, selectCategory } from './common'

export const TournamentSchema = Yup.object().shape({
  title,
  selectCategory
})
