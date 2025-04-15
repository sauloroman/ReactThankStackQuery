import React, { useEffect } from 'react'
import { useProduct } from '../hooks/useProduct'
import { useParams } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'

export const ProductById: React.FC = () => {

  const { id } = useParams()
  const { product, isFetching } = useProduct({ id: +id! })
  
  useEffect(() => window.scrollTo(0, 0), [])
  
  return (
    <div className='flex flex-col'>
      <h1 className="text-2xl font-bold">Producto</h1>

      { isFetching && <p>Cargando...</p>}
      { product && <ProductCard product={product} fullDescription /> }

    </div>
  )
}
