import { useEffect, useState, FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Box, Container, Button, Typography, CircularProgress, Snackbar, Alert } from "@mui/material"
import { Add } from "@mui/icons-material"
import { fetchProducts, fetchMetrics, deleteProductFromStorage, updateProductToStorage, addProductToStorage } from "../services/api"
import { setProductsStart, setMetrics, setProductsSuccess, setProductsFailure, addProductStart, addProductSuccess, addProductFailure, updateProductStart, updateProductSuccess, updateProductFailure, deleteProductStart, deleteProductSuccess, deleteProductFailure } from "../redux/states/productSlice"
import { ProductFilters } from "./ProductFilters"
import { ProductTable } from "./ProductTable"
import { ProductModal } from "./ProductModal"
import { MetricCards } from "./MetricCards"
import { ProductCharts } from "./ProductCharts"
import { Product } from "../models/product"
import { RootState } from "../redux/store"
import { useStyles } from "../styles/Dashboard.styles"

const Dashboard: FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [dashboardErrorMessage, setDashboardErrorMessage] = useState<string | null>(null)

  const { loading } = useSelector((state: RootState) => state.products)
  const emptyProduct: Product = { id: 0, name: "", price: 0, stock: 0 }

  useEffect(() => {
    const loadDataFromService = async () => {
      try {
        dispatch(setProductsStart())
        const products: Product[] = await fetchProducts()
        const { income, totalProducts } = await fetchMetrics()
        if (products) {
          dispatch(setProductsSuccess(products))
          dispatch(setMetrics({ income, totalProducts }))
        } else {
          dispatch(setProductsFailure())
          setDashboardErrorMessage("Error obteniendo productos, contacta al administrador")
        }
      } catch (err) {}
    }
    loadDataFromService()
  }, [dispatch])

  const handleAddProduct = async (product: Product) => {
    try {
      dispatch(addProductStart())
      const result = await addProductToStorage(product)
      if (result) {
        dispatch(addProductSuccess(result))
        setShowModal(false)
      } else {
        dispatch(addProductFailure())
        setDashboardErrorMessage("Error agregando el producto, contacta al administrador")
      }
    } catch (err) {
      dispatch(addProductFailure())
      setDashboardErrorMessage("Error agregando un producto")
    }
  }

  const handleUpdateProduct = async (product: Product) => {
    try {
      dispatch(updateProductStart())
      const result = await updateProductToStorage(product)
      if (result) {
        dispatch(updateProductSuccess(product))
        setEditingProduct(null)
      } else {
        dispatch(updateProductFailure())
        setDashboardErrorMessage("Error actualizando el producto, contacta al administrador")
      }
    } catch (err) {
      dispatch(updateProductFailure())
      setDashboardErrorMessage(err instanceof Error ? err.message : "Error actualizando el producto")
    }
  }

  const handleDeleteProduct = async (id: number) => {
    try {
      dispatch(deleteProductStart())
      const result = await deleteProductFromStorage(id)
      if (result) {
        dispatch(deleteProductSuccess(id))
      } else {
        dispatch(deleteProductFailure())
        setDashboardErrorMessage("Error eliminando el producto, contacta al administrador")
      }
    } catch (err) {
      dispatch(deleteProductFailure())
      setDashboardErrorMessage(err instanceof Error ? err.message : "Error eliminando el producto")
    }
  }

  const messageHandleCloseError = () => {
    setDashboardErrorMessage(null)
  }

  return (
    <Box className={classes.main}>
      <Container maxWidth="xl">
        <Box className={classes.header}>
          <Typography variant="h4" className={classes.title}>
            Dashboard de Productos
          </Typography>
        </Box>

        {loading.fetchProducts ? (
          <Box className={classes.loadingContainer}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <ProductFilters />
            <MetricCards />
            <ProductCharts />

            <Button variant="contained" startIcon={<Add />} onClick={() => setShowModal(true)} className={classes.addButton} disabled={loading.addProduct}>
              {loading.addProduct ? <CircularProgress size={24} /> : "Agregar Producto"}
            </Button>

            <ProductTable onEditProduct={setEditingProduct} onDeleteProduct={handleDeleteProduct} isLoading={{ update: loading.updateProduct, delete: loading.deleteProduct }} />
          </>
        )}

        <ProductModal open={showModal} onClose={() => setShowModal(false)} onSave={handleAddProduct} initialProduct={emptyProduct} isLoading={loading.addProduct} />

        {editingProduct && <ProductModal open={!!editingProduct} onClose={() => setEditingProduct(null)} onSave={handleUpdateProduct} initialProduct={editingProduct} isLoading={loading.updateProduct} />}

        <Snackbar open={!!dashboardErrorMessage} autoHideDuration={10000} onClose={messageHandleCloseError} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
          <Alert onClose={messageHandleCloseError} severity="error" className={classes.alert}>
            {dashboardErrorMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  )
}

export default Dashboard
