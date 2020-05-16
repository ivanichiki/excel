export function capitalize(string) {
  if (typeof string!=='string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}
export function range(start, end) {
  if (start > end ) {
    [end, start] = [start, end]
  }
  const array = []
  for (let i = start; i<= end; i++) {
    array.push(i)
  }
  return array
}