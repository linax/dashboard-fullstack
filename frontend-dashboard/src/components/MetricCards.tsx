import { FC } from "react"
import { useSelector } from "react-redux"
import { Grid2, Card, CardContent, Typography, Box, useTheme, alpha } from "@mui/material"
import { AttachMoney, Forest } from "@mui/icons-material"
import { RootState } from "../redux/store"
import { useStyles } from "../styles/MetricCards.styles"

export const MetricCards: FC = () => {
  const classes = useStyles()
  const theme = useTheme()
  const { totalProducts, income } = useSelector((state: RootState) => state.products)

  return (
    <Grid2 container spacing={6} className={classes.grid} size={{ xs: 12, sm: 6, md: 2 }}>
      <Card
        sx={{
          bgcolor: alpha(theme.palette.primary.main, 0.1),
          height: "100%",
          boxShadow: theme.shadows[3]
        }}
      >
        <CardContent>
          <Box className={classes.boxContainer}>
            <Forest sx={{ mr: 1 }} />
            <Typography variant="h6">Total Productos</Typography>
          </Box>
          <Typography variant="h4">{totalProducts}</Typography>
        </CardContent>
      </Card>

      <Card
        sx={{
          bgcolor: alpha(theme.palette.success.main, 0.1),
          height: "100%",
          boxShadow: theme.shadows[3]
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <AttachMoney sx={{ mr: 1 }} />
            <Typography variant="h6">Ingresos Totales</Typography>
          </Box>
          <Typography variant="h4">${income.toLocaleString()}</Typography>
        </CardContent>
      </Card>
    </Grid2>
  )
}
