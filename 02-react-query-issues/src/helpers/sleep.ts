export const sleep = ( milliseconds: number ) => {
  return new Promise(( res ) => {
    setTimeout(() => res(true), milliseconds)
  })
}