import { useQuery } from '@tanstack/react-query'
import React from 'react'

const randomApiUrl: string = 'https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new'

const getCryptoNumber = async(): Promise<number> => {
  try {
    const res = await fetch( randomApiUrl )
    const data = await res.json()
    return Number(data)
  } catch (error) {
    throw new Error('No se pudo obtener el número')
  }
}

export const AppQuery: React.FC = () => {

  const { isFetching, isPending, data: randomNumber, error, refetch } = useQuery({
    queryKey: ['randomNumber'],
    queryFn: getCryptoNumber,
    // retry: 5, // *false, true
    // retryDelay: 1000,
    staleTime: 1000 * 5
  })

  return (
    <>
      { !isFetching 
        ? ( <h1>Numero: {randomNumber}</h1>)
        : ( <p>Cargando...</p>)
      }

      <div>{ error && JSON.stringify(error.message) }</div>

      <button
        disabled={isFetching}
        onClick={ () => refetch() }
      >
        Nuevo Número
      </button>

    </>
  )
}
