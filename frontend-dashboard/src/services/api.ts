import Axios from "axios"
import { Product } from "../models/product"

export const fetchProducts = async () => {
  try {
    const products = await Axios.get("http://localhost:8000/products")
    return products.data
  } catch (error) {
    console.log(error)
  }
}

export const addProductToStorage = async (product: Product) => {
  try {
    const productFromResponse: any = await Axios.post(`http://localhost:8000/products`, product)
    return productFromResponse.data
  } catch (error) {
    console.log(error)
  }
}

export const deleteProductFromStorage = async (id: number) => {
  try {
    const product = await Axios.delete(`http://localhost:8000/products/${id}`)
    return product.data
  } catch (error) {
    console.log(error)
  }
}

export const updateProductToStorage = async (product: Product) => {
  try {
    const productFromResponse: any = await Axios.put(`http://localhost:8000/products/${product.id}`, product)
    return productFromResponse.data
  } catch (error) {
    console.log(error)
  }
}

export const fetchMetrics = async () => {
  try {
    const metrics = await Axios.get("http://localhost:8000/metrics")
    return metrics.data
  } catch (error) {
    console.log(error)
  }
}
