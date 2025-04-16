import { productsApi } from "../api/products.api";
import { type Product } from "../interfaces/product.interface";

interface GetProductsOptions {
  filterKey?: string
}

export const sleep = async ( seconds: number ): Promise<boolean> => {
  return new Promise( (res) => {
    setTimeout(() => res(true), seconds * 1000 )
  }) 
}

export const getProducts = async ({ filterKey }: GetProductsOptions ): Promise<Product[]> => {
  const filterUrl = filterKey ? `category=${filterKey}` : ''
  const { data } = await productsApi.get<Product[]>(`/products?${filterUrl}`)
  return data
}

export const getProductById = async ( id: number ): Promise<Product> => {
  const {data} = await productsApi.get<Product>(`/products/${id}`)
  return data
}

export const createProduct = async ( product: Partial<Product> ) => {
  await sleep(5)

  // Simular que falla
  throw new Error('Error creating product...')

  const { data } = await productsApi.post<Product>(`/products`, product )
  return data
}