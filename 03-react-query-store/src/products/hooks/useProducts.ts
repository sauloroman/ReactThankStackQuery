import { useQuery } from "@tanstack/react-query"
import { productActions } from ".."

interface UseProductsOptions {
  filterKey?: string
}

export const useProducts = ({ filterKey }: UseProductsOptions) => {

  const { isLoading, isError, error, data: products = [], isFetching } = useQuery({
    queryKey: ['products', { filterKey }],
    queryFn: () => productActions.getProducts({filterKey}),
    staleTime: 1000 * 60 * 60,
  })

  return {
    products,
    error,
    isError,
    isFetching,
    isLoading,
  }

}