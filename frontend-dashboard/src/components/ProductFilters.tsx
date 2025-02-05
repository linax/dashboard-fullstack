import { useState, FC, useEffect } from "react"
import { useDispatch } from "react-redux"
import { TextField, Card, CardContent, Typography } from "@mui/material"
import { Search } from "@mui/icons-material"
import { AppDispatch } from "../redux/store"
import { filterProducts } from "../redux/states/productSlice"
import { useStyles } from "../styles/ProductFilters.styles"

export const ProductFilters: FC = () => {
  const classes = useStyles()
  const dispatch: AppDispatch = useDispatch()
  const [localSearch, setLocalSearch] = useState("")
  const [localMinPrice, setLocalMinPrice] = useState("")
  const [localMaxPrice, setLocalMaxPrice] = useState("")
  const [localMinStock, setLocalMinStock] = useState("")
  const [localMaxStock, setLocalMaxStock] = useState("")

  const handleFilterChange = () => {
    dispatch(
      filterProducts({
        search: localSearch,
        minPrice: localMinPrice,
        maxPrice: localMaxPrice,
        minStock: localMinStock,
        maxStock: localMaxStock
      })
    )
  }

  useEffect(() => {
    handleFilterChange()
  }, [localSearch, localMinPrice, localMaxPrice, localMinStock, localMaxStock])

  return (
    <Card>
      <CardContent>
        <div className={classes.filterContainer}>
          <Typography variant="h6">
            <Search className={classes.searchIcon} />
            Filtros de Búsqueda
          </Typography>

          <div className={classes.inputsContainer}>
            <TextField className={classes.searchField} label="Buscar por nombre" variant="outlined" value={localSearch} onChange={e => setLocalSearch(e.target.value)} size="small" />
            <TextField className={classes.numberField} label="Precio mínimo" type="number" value={localMinPrice} onChange={e => setLocalMinPrice(e.target.value)} size="small" />
            <TextField className={classes.numberField} label="Precio máximo" type="number" value={localMaxPrice} onChange={e => setLocalMaxPrice(e.target.value)} size="small" />
            <TextField className={classes.numberField} label="Stock mínimo" type="number" value={localMinStock} onChange={e => setLocalMinStock(e.target.value)} size="small" />
            <TextField className={classes.numberField} label="Stock máximo" type="number" value={localMaxStock} onChange={e => setLocalMaxStock(e.target.value)} size="small" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
