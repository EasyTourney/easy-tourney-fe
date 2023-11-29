export const generateRange = (start: number, end: number) => {
  let length = end + 1 - start

  return Array.from({ length }, (_, id) => id + start)
}
