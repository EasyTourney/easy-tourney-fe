import * as Yup from 'yup'
import {
  EMAIL_REGEX,
  SPACE_END_REGEX,
  SPACE_START_REGEX,
  CHARACTERS_REGEX,
  PHONE_NUMBER_REGEX,
  CHARACTERS_ONLY_REGEX,
  PHONE_NUMBER_START_REGEX,
  MULTIPLE_SPACE_REGEX
} from '../../constants/regex'

const email = Yup.string()
  .required('Email is required.')
  .max(50, 'Email cannot be more than 50 characters')
  .matches(EMAIL_REGEX, 'Please enter a valid email address.')

const password = Yup.string().trim().required('Password is required.').min(6, 'Password must be at least 6 characters')

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

const firstName = Yup.string()
  .required('First name is required')
  .max(30, 'First name cannot be more than 30 characters')
  .matches(CHARACTERS_ONLY_REGEX, 'First name must not contain special characters')

const lastName = Yup.string()
  .required('Last name is required')
  .max(30, 'Last name cannot be more than 30 characters')
  .matches(CHARACTERS_ONLY_REGEX, 'Last name must not contain special characters')

const phoneNumber = Yup.string()
  .required('Phone number is required')
  .matches(PHONE_NUMBER_REGEX, 'Phone number must not contain special characters')
  .matches(PHONE_NUMBER_START_REGEX, 'Phone number must start with 0')
  .min(10, 'Phone number cannot be less than 10 digits')
  .max(11, 'Phone number cannot be more than 11 digits')

const title = Yup.string()
  .required('Please enter Title')
  .test('no-leading-whitespace', 'Title must not contain leading whitespace', function (value) {
    if (value && SPACE_START_REGEX.test(value)) {
      return false
    }
    return true
  })
  .test('no-trailing-whitespace', 'Title must not contain trailing whitespace', function (value) {
    if (value && SPACE_END_REGEX.test(value)) {
      return false
    }
    return true
  })
  .test(
    'no-multiple-whitespaces',
    'Title must not contain multiple whitespaces in between two words',
    function (value) {
      if (value && MULTIPLE_SPACE_REGEX.test(value)) {
        return false
      }
      return true
    }
  )
  .min(2, 'Title must be at least 2 characters')
  .max(30, 'Title must be less than 30 characters')
  .matches(CHARACTERS_REGEX, 'Title must not contain special characters')

const selectCategory = Yup.string().required('Category is required.')
export { email, password, categoryName, firstName, lastName, phoneNumber, title, selectCategory }
