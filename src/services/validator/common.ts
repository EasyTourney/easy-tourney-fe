import * as Yup from 'yup'
import { EMAIL_REGEX, SPACE_END_REGEX, SPACE_START_REGEX, CHARACTERS_REGEX } from '../../constants/regex'

const email = Yup.string()
  .required('Please enter your email.')
  .matches(EMAIL_REGEX, 'Please enter a valid email address.')

const password = Yup.string()
  .trim()
  .required('Please enter your password.')
  .min(6, 'Password must be at least 6 characters')

const categoryName = Yup.string()
  .required('Please enter category name')
  .test('no-leading-whitespace', 'Category name must not contain leading whitespace', function (value) {
    if (value && SPACE_START_REGEX.test(value)) {
      return false
    }
    return true
  })
  .test('no-trailing-whitespace', 'Category name must not contain trailing whitespace', function (value) {
    if (value && SPACE_END_REGEX.test(value)) {
      return false
    }
    return true
  })
  .min(2, 'Category name must be at least 2 characters')
  .max(30, 'Category name must be less than 30 characters')
  .matches(CHARACTERS_REGEX, 'Category name must not contain special characters')

export { email, password, categoryName }
