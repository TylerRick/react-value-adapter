export const unique = (array: any[]) => (
  array.filter((v,i,a) => a.indexOf(v) == i)
)
