import { FC, useState, useEffect } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, CircularProgress, Box } from "@mui/material"
import { Product } from "../models/product"
import { useStyles } from "../styles/ProductModal.styles"

interface ProductModalProps {
  open: boolean
  onClose: () => void
  onSave: (product: Product) => void
  initialProduct: Product
  isLoading: boolean
}

export const ProductModal: FC<ProductModalProps> = ({ open, onClose, onSave, initialProduct, isLoading }) => {
  const classes = useStyles()
  const [product, setProduct] = useState<Product>(initialProduct)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    setProduct(initialProduct)
    setErrors({})
  }, [initialProduct])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!product.name.trim()) {
      newErrors.name = "El nombre del producto es requerido"
    }
    if (product.price <= 0) {
      newErrors.price = "El precio debe ser mayor a 0"
    }
    if (product.stock < 0) {
      newErrors.stock = "El stock no puede ser negativo"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(product)
    }
  }

  const handleChange = (field: keyof Product) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = field === "name" ? event.target.value : Number(event.target.value)
    setProduct(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialProduct.id === 0 ? "Agregar Producto" : "Editar Producto"}</DialogTitle>
      <DialogContent>
        <Box className={classes.modalContainer}>
          <TextField label="Nombre" value={product.name} onChange={handleChange("name")} error={!!errors.name} helperText={errors.name} disabled={isLoading} fullWidth />
          <TextField label="Precio" type="number" value={product.price} onChange={handleChange("price")} error={!!errors.price} helperText={errors.price} disabled={isLoading} fullWidth />
          <TextField label="Stock" type="number" value={product.stock} onChange={handleChange("stock")} error={!!errors.stock} helperText={errors.stock} disabled={isLoading} fullWidth />
        </Box>
      </DialogContent>
      <DialogActions className={classes.modalActions}>
        <Button onClick={onClose} disabled={isLoading}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={isLoading} startIcon={isLoading ? <CircularProgress size={20} /> : null}>
          {isLoading ? "Guardando..." : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
