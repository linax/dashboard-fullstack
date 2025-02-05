import { Product } from "../../../models/product"

export interface LoadingState {
  fetchProducts: boolean
  addProduct: boolean
  updateProduct: boolean
  deleteProduct: boolean
}

export interface ProductState {
  products: Product[]
  totalProducts: number
  income: number
  filteredProducts: Product[]
  loading: LoadingState
}
