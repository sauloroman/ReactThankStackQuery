import { useQuery } from "@tanstack/react-query"

const randomApiUrl: string = 'https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new'

const getCryptoNumber = async(): Promise<number> => {
  const res = await fetch( randomApiUrl )
  const data = await res.json()
  return Number( data )
}

export const useRandom = () => {

  const randomQuery = useQuery({
    queryKey: ['randomNumber'],
    queryFn: getCryptoNumber,
    staleTime: 1000 * 5,
  })

  return {
    randomQuery
  }

} 

