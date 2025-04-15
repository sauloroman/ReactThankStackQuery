import { useQuery } from '@tanstack/react-query'
import React from 'react'

const getCryptoNumber = async(): Promise<number> => {
  const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new')
  const data = await res.json()
  return Number( data )
}

export const RandomNumber: React.FC = () => {

  const { data: randomNumber } = useQuery({
    queryKey: ['randomNumber'],
    queryFn: getCryptoNumber,
    staleTime: 1000 * 5,
  })

  return (
    <div>Random Number: {randomNumber}</div>
  )
}
