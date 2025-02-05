import { FC } from "react"
import { useSelector } from "react-redux"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Box, Typography, Card, CardContent, CircularProgress, useTheme } from "@mui/material"
import { Edit, Delete, Forest } from "@mui/icons-material"
import { RootState } from "../redux/store"
import { Product } from "../models/product"
import { useStyles } from "../styles/ProductTable.styles"

interface ProductTableProps {
  onEditProduct: (product: Product) => void
  onDeleteProduct: (id: number) => void
  isLoading: {
    update: boolean
    delete: boolean
  }
}

export const ProductTable: FC<ProductTableProps> = ({ onEditProduct, onDeleteProduct, isLoading }) => {
  const classes = useStyles()
  const theme = useTheme()
  const { filteredProducts } = useSelector((state: RootState) => state.products)

  if (filteredProducts.length === 0) {
    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography variant="body1" color="textSecondary">
            <Forest style={{ marginRight: theme.spacing(1) }} />
            No hay productos que coincidan con los filtros
          </Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" gutterBottom className={classes.title}>
          <Forest style={{ marginRight: theme.spacing(1) }} />
          Lista de Productos
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map(product => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price.toLocaleString()}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Box className={classes.actionButtons}>
                      <IconButton color="primary" onClick={() => onEditProduct(product)} size="small" disabled={isLoading.update}>
                        {isLoading.update ? <CircularProgress size={20} /> : <Edit />}
                      </IconButton>
                      <IconButton color="error" onClick={() => onDeleteProduct(product.id)} size="small" disabled={isLoading.delete}>
                        {isLoading.delete ? <CircularProgress size={20} /> : <Delete />}
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}
