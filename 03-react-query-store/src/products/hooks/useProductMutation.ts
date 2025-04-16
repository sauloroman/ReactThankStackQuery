import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type Product, productActions } from '..';

export const useProductMutation = () => {
  
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: productActions.createProduct,
    // onSuccess: () => {
    //   console.log('Producto creado');
    // },
    // onSettled: () => {
    //   console.log('Fin de la mutacion')
    // }

    //* PARA ACTUALIZACIONES OPTIMISTAS
    onMutate: ( product ) => {
      console.log('Mutando - Optimistic update')
    
      // Optimistic product
      const optimisticProduct = { ...product, id: Math.random() }
      console.log({optimisticProduct})

      // Almacenar el producto en el cache del query client
      queryClient.setQueryData<Product[]>(
        ['products', { 'filterKey': product.category }],
        ( old: any ) => {
          if ( !old ) return [ optimisticProduct ]
          return [...old, optimisticProduct]
        }
      )

      return { optimisticProduct }

    },

    //* 1. product -> resultado de la operacion asyncrona
    //* 2. variables -> lo que estoy mandando a la promesa
    //* 3. context -> lo que me devuelve onMutate
    onSuccess: ( product, variables, context ) => {

      //* De esta manera se fuerza a volver a hacer la peticion
      //* para traer los datos una vez que se ha realizado la mutacion
      // queryClient.invalidateQueries({
      //   queryKey: ['products', { 'filterKey': data.category }]
      // })

      //* Es una función de TanStack Query que te permite actualizar directamente el caché de una query específica, sin tener que hacer un nuevo fetch al servidor.

      //* Esto es súper útil cuando acabas de crear, actualizar o borrar un item, y quieres que el UI refleje ese cambio sin hacer otra petición.

      // queryClient.setQueryData<Product[]>(
      //   ['productos', { 'filterKey': product.category }],
      //   ( old ) => {
      //     if (!old) return [product]
      //     return [...old, product]
      //   }
      // )

      console.log({ product, variables, context })
      queryClient.removeQueries({ queryKey: ['product', context.optimisticProduct.id] })

      //* PARA LA PARTE DE OPTIMISTAS
      queryClient.setQueryData<Product[]>(
        ['products', { 'filterKey': product.category }],
        ( old ) => {
          if (!old) return [product]

          // Aqui los productos ya tienen insertado el producto optimista

          return old.map( cacheProduct => cacheProduct.id === context.optimisticProduct.id ? product : cacheProduct )

        }
      )

    },

    onError: ( error, variables, context ) => {

      console.log({ error, variables, context })

      queryClient.removeQueries({
        queryKey: ['product', context?.optimisticProduct.id] 
      })

      queryClient.setQueryData<Product[]>(
        ['products', { 'filterKey': variables.category}],
        ( old ) => {
          if ( !old ) return []
          return old.filter( cacheProduct => cacheProduct.id !== context?.optimisticProduct.id)
        }
      )

    }

  })

  return {
    mutation
  }

}
