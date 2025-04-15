import { ProductList, useProducts } from ".."

export const WomensPage = () => {

  const { isFetching, products } = useProducts({ filterKey: "women's clothing" })

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Productos para mujeres</h1>

      { isFetching && <p>Cargando...</p>}

      <ProductList products={products} />

    </div>
  )
}