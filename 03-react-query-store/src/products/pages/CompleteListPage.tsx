import { ProductList, useProducts } from ".."


export const CompleteListPage = () => {

  const { isFetching, products } = useProducts({})

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Todos los productos</h1>

      { isFetching && <p>Cargando...</p>}

      <ProductList products={products} />

    </div>
  )
}