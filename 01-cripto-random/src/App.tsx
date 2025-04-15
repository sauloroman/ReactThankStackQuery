import React from 'react'
import { useRandom } from './hooks/useRandom'

export const App: React.FC = () => {

  const { randomQuery } = useRandom()

  return (
    <>
      {
        randomQuery.isFetching
        ? (<p>Cargando...</p>)
        : (<h1>Numero: {randomQuery.data}</h1>)
      }

      <div>{ randomQuery.isError && JSON.stringify(randomQuery.error)}</div>

      <button
        disabled={randomQuery.isFetching}
        onClick={ () => randomQuery.refetch() }
      >
        Nuevo Número
      </button>

    </>
  )
}
