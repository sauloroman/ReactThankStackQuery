export { productsApi } from './api/products.api'

export { ProductCard } from './components/ProductCard';
export { ProductList } from './components/ProductList';

export { useProducts } from './hooks/useProducts'
export { useProduct } from './hooks/useProduct'
export { usePrefetchProduct } from './hooks/usePrefetchProduct'
export { useProductMutation } from './hooks/useProductMutation'

export type { Product } from './interfaces/product.interface'

export { StoreLayout } from './layout/StoreLayout';

export { CompleteListPage } from './pages/CompleteListPage';
export { MensPage } from './pages/MensPage';
export { NewProduct } from './pages/NewProduct';
export { WomensPage } from './pages/WomensPage';
export { ProductById } from './pages/ProductById'

export * as productActions from './services/actions'