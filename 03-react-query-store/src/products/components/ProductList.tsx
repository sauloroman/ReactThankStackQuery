import React from "react";
import { ProductCard, usePrefetchProduct } from ".."
import { type Product } from '../interfaces/product.interface';

interface Props {
  products: Product[]
}

export const ProductList: React.FC<Props> = ({ products }) => {
  
  const { prefetchProduct } = usePrefetchProduct()
  
  return (
    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 justify-center max-w-max">
      {
        products.map( product => (
          <ProductCard prefetchProduct={prefetchProduct} key={product.id} product={product} />
        ))
      }
    </div>
  )
}