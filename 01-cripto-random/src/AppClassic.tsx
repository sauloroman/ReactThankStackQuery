import React, { useEffect, useState } from 'react'

const randomApiUrl: string = 'https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new'

export const AppClassic: React.FC = () => {

  const [randomNumber, setRandomNumber] = useState<number>(0)
  const [refreshToken, setRefreshToken] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {

    setIsLoading( true )

    fetch( randomApiUrl )
      .then( res => res.json() )
      .then( data => setRandomNumber(data) )
      .catch( err => setError( err ) )
      .finally( () => setIsLoading( false ) ) 

  }, [ refreshToken ])

  return (
    <>
      {
        isLoading
        ? (<p>Cargando...</p>)
        : (<h1>Numero: {randomNumber}</h1>)
      }

      <div>{ error && JSON.stringify( error )}</div>

      <button 
        disabled={isLoading}
        onClick={ () => setRefreshToken(refreshToken + 1)}
      >
        Nuevo Número
      </button>

    </>
  )
}
