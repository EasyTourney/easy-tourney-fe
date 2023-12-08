export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const CHARACTERS_REGEX = /^[\p{L}0-9]+(?:\s[\p{L}0-9]+)*$/u
export const CHARACTERS_ONLY_REGEX = /^[\p{L}]+(?:\s[\p{L}]+)*$/u
export const SPACE_START_REGEX = /^\s/u
export const SPACE_END_REGEX = /\s$/u
export const PHONE_NUMBER_START_REGEX = /^0\d*$/
export const PHONE_NUMBER_REGEX = /^\d*$/
