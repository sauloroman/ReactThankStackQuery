import { useQuery } from "@tanstack/react-query"
import { productActions } from ".."

interface UseProductsOptions {
  id: number
}

export const useProduct = ({ id }: UseProductsOptions) => {

  const { isLoading, isError, error, data: product, isFetching } = useQuery({
    queryKey: ['products', id ],
    queryFn: () => productActions.getProductById(id),
    staleTime: 1000 * 60 * 60,
  })

  return {
    product,
    error,
    isError,
    isFetching,
    isLoading,
  }

}