import { useQuery } from '@tanstack/react-query';
import { getLabels } from '../actions';
import { GithubLabel } from '../interfaces';

export const useLabels = () => {
  const labelsQuery = useQuery({
    queryKey: ['labels'],
    queryFn: getLabels,
    staleTime: 1000 * 60 * 60, // 1 hora de fresh

    //* 1. Sirve para mostrar datos falsos de inmediato mientras se carga la info real
    //* 2. No se guarda en caché
    //* 3. Útil para mejorar la UX mientras se espera
    // placeholderData: [
    //   {
    //     id: 739777675,
    //     node_id: 'MDU6TGFiZWw3Mzk3Nzc2NzU=',
    //     url: 'https://api.github.com/repos/facebook/react/labels/Component:%20Component%20API',
    //     name: 'Component: Component API',
    //     color: 'd4c5f9',
    //     default: false,
    //   } satisfies GithubLabel,
    //   {
    //     id: 180616330,
    //     node_id: 'MDU6TGFiZWwxODA2MTYzMzA=',
    //     url: 'https://api.github.com/repos/facebook/react/labels/Component:%20Optimizing%20Compiler',
    //     name: 'Component: Optimizing Compiler',
    //     color: 'bfdadc',
    //     default: false,
    //   } satisfies GithubLabel,
    // ],

    //* 1. Se trata como si fueran datos reales, como si el fetch ya se hubiera hecho
    //* 2. Se guarda en caché y se comporta como si la consulta ya se hubiera completado
    //* 3. Cuando los datos "expiran" (pasa el staleTime), se vuelve a hacer la consulta y se actualiza
    // initialData: [
    //   {
    //     id: 739777675,
    //     node_id: 'MDU6TGFiZWw3Mzk3Nzc2NzU=',
    //     url: 'https://api.github.com/repos/facebook/react/labels/Component:%20Component%20API',
    //     name: 'Component: Component API',
    //     color: 'd4c5f9',
    //     default: false,
    //   } satisfies GithubLabel,

    //   {
    //     id: 180616330,
    //     node_id: 'MDU6TGFiZWwxODA2MTYzMzA=',
    //     url: 'https://api.github.com/repos/facebook/react/labels/Component:%20Optimizing%20Compiler',
    //     name: 'Component: Optimizing Compiler',
    //     color: 'bfdadc',
    //     default: false,
    //   } satisfies GithubLabel,
    // ],

    //* La diferencia entre ambos es que initialData se usa para hidratar la cache, y placeholderData solo es visual mientras carga.
  });

  return {
    labelsQuery,
  };
};
