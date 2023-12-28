import * as Yup from 'yup'
import {
  EMAIL_REGEX,
  CHARACTERS_REGEX,
  PHONE_NUMBER_REGEX,
  CHARACTERS_ONLY_REGEX,
  PHONE_NUMBER_START_REGEX,
  PHONE_NUMBER_VALID_REGEX
} from '../../constants/regex'
import dayjs from 'dayjs'

const email = Yup.string()
  .trim()
  .required('Email is required.')
  .max(50, 'Email cannot be more than 50 characters')
  .matches(EMAIL_REGEX, 'Please enter a valid email address.')

const password = Yup.string().trim().required('Password is required.').min(6, 'Password must be at least 6 characters')

const categoryName = Yup.string()
  .trim()
  .required('Category name is required.')
  .min(2, 'Category name must be at least 2 characters')
  .max(30, 'Category name must be less than 30 characters')
  .matches(CHARACTERS_REGEX, 'Category name must not contain special characters')

const firstName = Yup.string()
  .trim()
  .required('First name is required')
  .test('no-number', 'First name must not contain numbers', function (value) {
    if (value && /\d/.test(value)) {
      return false
    }
    return true
  })
  .matches(CHARACTERS_ONLY_REGEX, 'First name must not contain special characters')
  .max(30, 'First name cannot be more than 30 characters')

const lastName = Yup.string()
  .trim()
  .required('Last name is required')
  .test('no-number', 'Last name must not contain numbers', function (value) {
    if (value && /\d/.test(value)) {
      return false
    }
    return true
  })
  .matches(CHARACTERS_ONLY_REGEX, 'Last name must not contain special characters')
  .max(30, 'Last name cannot be more than 30 characters')

const phoneNumber = Yup.string()
  .trim()
  .required('Phone number is required')
  .matches(PHONE_NUMBER_REGEX, 'Phone number must not contain special characters')
  .matches(PHONE_NUMBER_VALID_REGEX, 'Phone number must be valid')
  .matches(PHONE_NUMBER_START_REGEX, 'Phone number must start with 0')
  .min(10, 'Phone number cannot be less than 10 digits')
  .max(11, 'Phone number cannot be more than 11 digits')

const dateOfBirth = Yup.date()
  .test('not-today', 'Date of birth cannot be today', (value) => {
    if (value === null) return true
    return !dayjs(value).isSame(dayjs().startOf('day'), 'day')
  })
  .max(dayjs().startOf('day'), 'Date of birth cannot be a future date')
  .test('isValid', (value) => {
    if (value === null) return true
    return dayjs(value).isValid()
  })
  .typeError('Please enter a valid date')
  .nullable()

const title = Yup.string()
  .trim()
  .required('Title is required')
  .min(2, 'Title must be at least 2 characters')
  .max(30, 'Title must be less than 30 characters')
  .matches(CHARACTERS_REGEX, 'Title must not contain special characters')

const selectCategory = Yup.string().required('Category is required.')

const teamName = Yup.string()
  .trim()
  .required('Team name is required.')
  .max(30, 'Team name must be less than 30 characters')
  .matches(CHARACTERS_REGEX, 'Team name must not contain special characters')

const playerName = Yup.string()
  .trim()
  .required('Player name is required')
  .max(30, 'Player name cannot be more than 30 characters')
  .test('no-number', 'Player name must not contain numbers', function (value) {
    if (value && /\d/.test(value)) {
      return false
    }
    return true
  })
  .matches(CHARACTERS_REGEX, 'Player name must not contain special characters')

const phone = Yup.string()
  .trim()
  .required('Phone number is required')
  .matches(PHONE_NUMBER_REGEX, 'Phone number must not contain special characters')
  .matches(PHONE_NUMBER_VALID_REGEX, 'Phone number must be valid')
  .matches(PHONE_NUMBER_START_REGEX, 'Phone number must start with 0')
  .min(10, 'Phone number cannot be less than 10 digits')
  .max(11, 'Phone number cannot be more than 11 digits')

const description = Yup.string().max(1000, 'Description cannot be more than 1000 characters')
export {
  email,
  password,
  categoryName,
  firstName,
  lastName,
  phoneNumber,
  dateOfBirth,
  title,
  selectCategory,
  teamName,
  description,
  phone,
  playerName
}
