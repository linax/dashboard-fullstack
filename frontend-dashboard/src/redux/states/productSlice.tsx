import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Product } from "../../models/product"
import { ProductState } from "./types/productState.types"

const initialState: ProductState = {
  products: [],
  totalProducts: 0,
  income: 0,
  filteredProducts: [],
  loading: {
    fetchProducts: false,
    addProduct: false,
    updateProduct: false,
    deleteProduct: false
  }
}

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Set Products
    setProductsStart: state => {
      state.loading.fetchProducts = true
    },
    setProductsSuccess: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
      state.filteredProducts = action.payload
      state.loading.fetchProducts = false
    },
    setProductsFailure: state => {
      state.loading.fetchProducts = false
    },

    // Add Product
    addProductStart: state => {
      state.loading.addProduct = true
    },
    addProductSuccess: (state, action: PayloadAction<Product>) => {
      const newProduct = action.payload
      state.products.push(newProduct)
      state.filteredProducts.push(newProduct)
      state.loading.addProduct = false
    },
    addProductFailure: state => {
      state.loading.addProduct = false
    },

    // Update Product
    updateProductStart: state => {
      state.loading.updateProduct = true
    },
    updateProductSuccess: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id)
      if (index !== -1) {
        state.products[index] = action.payload
        state.filteredProducts = state.products.map(p => (p.id === action.payload.id ? action.payload : p))
      }
      state.loading.updateProduct = false
    },
    updateProductFailure: state => {
      state.loading.updateProduct = false
    },

    // Delete Product
    deleteProductStart: state => {
      state.loading.deleteProduct = true
    },
    deleteProductSuccess: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(p => p.id !== action.payload)
      state.filteredProducts = state.filteredProducts.filter(p => p.id !== action.payload)
      state.loading.deleteProduct = false
    },
    deleteProductFailure: state => {
      state.loading.deleteProduct = false
    },

    setMetrics: (state, action: PayloadAction<{ income: number; totalProducts: number }>) => {
      state.income = action.payload.income
      state.totalProducts = action.payload.totalProducts
    },
    filterProducts: (
      state,
      action: PayloadAction<{
        search?: string
        minPrice?: string
        maxPrice?: string
        minStock?: string
        maxStock?: string
      }>
    ) => {
      const { search, minPrice, maxPrice, minStock, maxStock } = action.payload

      let filtered = state.products.filter(product => product.name.toLowerCase().includes((search || "").toLowerCase()))

      if (minPrice) filtered = filtered.filter(product => product.price >= parseFloat(minPrice))
      if (maxPrice) filtered = filtered.filter(product => product.price <= parseFloat(maxPrice))
      if (minStock) filtered = filtered.filter(product => product.stock >= parseFloat(minStock))
      if (maxStock) filtered = filtered.filter(product => product.stock <= parseFloat(maxStock))

      state.filteredProducts = filtered
    }
  }
})

export const { setProductsStart, setProductsSuccess, setProductsFailure, addProductStart, addProductSuccess, addProductFailure, updateProductStart, updateProductSuccess, updateProductFailure, deleteProductStart, deleteProductSuccess, deleteProductFailure, setMetrics, filterProducts } = productSlice.actions

export default productSlice.reducer
