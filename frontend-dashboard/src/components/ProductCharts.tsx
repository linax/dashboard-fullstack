import { FC } from "react"
import { useSelector } from "react-redux"
import Plot from "react-plotly.js"
import { Card, CardContent, Typography, useTheme } from "@mui/material"
import { ShowChart, TrendingUp } from "@mui/icons-material"
import { RootState } from "../redux/store"
import { useStyles } from "../styles/ProductChart.styles"

export const ProductCharts: FC = () => {
  const theme = useTheme()
  const classes = useStyles()

  const { filteredProducts } = useSelector((state: RootState) => state.products)

  const productNames = filteredProducts.map(p => p.name)
  const productStocks = filteredProducts.map(p => p.stock)
  const productPrices = filteredProducts.map(p => p.price)

  const barChartData = [
    {
      x: productNames,
      y: productStocks,
      type: "bar"
    }
  ]

  const barChartLayout = {
    margin: { t: 25 },
    height: 300,
    width: 500,
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    showlegend: false
  }

  const pieChartData = [
    {
      labels: productNames,
      values: productPrices,
      type: "pie",
      marker: {
        colors: [theme.palette.primary.light, theme.palette.primary.main, theme.palette.primary.dark, theme.palette.secondary.light, theme.palette.secondary.main]
      }
    }
  ]

  const pieChartLayout = {
    margin: { t: 25 },
    height: 300,
    width: 500
  }

  const plotConfig = {
    responsive: true,
    displayModeBar: false // Hide the mode bar for plots
  }

  return (
    <div className={classes.chartsContainer}>
      <div className={classes.chartWrapper}>
        <Card>
          <CardContent>
            <Typography variant="h6" className={classes.chartTitle}>
              <ShowChart className={classes.icon} />
              Stock por Producto
            </Typography>
            <div className={classes.plotContainer}>
              <Plot data={barChartData} layout={barChartLayout} config={plotConfig} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className={classes.chartWrapper}>
        <Card>
          <CardContent>
            <Typography variant="h6" className={classes.chartTitle}>
              <TrendingUp className={classes.icon} />
              Distribución de Precios
            </Typography>
            <div className={classes.plotContainer}>
              <Plot data={pieChartData} layout={pieChartLayout} config={plotConfig} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
