import { TOURNAMENT_STATUS } from '../constants/enum'

export const generateRange = (start: number, end: number) => {
  const length = end + 1 - start

  return Array.from({ length }, (_, id) => id + start)
}

export const removeEmptyFields = (obj: any) => {
  if (obj && typeof obj === 'object') {
    if (Array.isArray(obj)) {
      for (let i = obj.length - 1; i >= 0; i--) {
        removeEmptyFields(obj[i])
        if (Object.keys(obj[i]).length === 0) {
          obj.splice(i, 1)
        }
      }
    } else {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          removeEmptyFields(obj[key])
          if (obj[key] === '') {
            delete obj[key]
          }
        }
      }
    }
  }
}

export const isMultipleLine = (data: any) => {
  if (typeof data !== 'string') {
    return false
  }
  const elements = data.split(';')
  if (elements.length > 1) {
    return true
  }
  return false
}

export const isStatus = (data: string) => {
  if (TOURNAMENT_STATUS.includes(data)) {
    return true
  }
  return false
}

export const colorChip = (data: string) => {
  let color = 'white'
  switch (data) {
    case 'NEED_INFORMATION':
      color = '#f2cac7'
      break
    case 'READY':
      color = '#fff000'
      break
    case 'IN_PROGRESS':
      color = '#ccd5ff'
      break
    case 'FINISHED':
      color = '#24c73f'
      break
    case 'DISCARDED':
      color = '#d1d1c0'
      break
    case 'DELETED':
      color = '#fa4141'
      break
    default:
      break
  }
  return color
}
