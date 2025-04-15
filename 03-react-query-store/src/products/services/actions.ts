import { productsApi } from "../api/products.api";
import { type Product } from "../interfaces/product.interface";

interface GetProductsOptions {
  filterKey?: string
}

const sleep = async ( seconds: number ): Promise<boolean> => {
  return new Promise( (res) => {
    setTimeout(() => res(true), seconds * 1000 )
  }) 
}

export const getProducts = async ({ filterKey }: GetProductsOptions ): Promise<Product[]> => {
  await sleep(2)
  const filterUrl = filterKey ? `category=${filterKey}` : ''
  const { data } = await productsApi.get<Product[]>(`/products?${filterUrl}`)
  return data
}

export const getProductById = async ( id: number ): Promise<Product> => {
  // await sleep(2)
  const {data} = await productsApi.get<Product>(`/products/${id}`)
  return data
}