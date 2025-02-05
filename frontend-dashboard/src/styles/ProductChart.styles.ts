import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material"

export const useStyles = makeStyles((theme: Theme) => ({
  chartsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(3),
    marginBottom: theme.spacing(4)
  },
  chartWrapper: {
    flex: "1 1 calc(50% - 12px)", // 50% - mitad del gap
    minWidth: "300px"
  },
  chartTitle: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2)
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  plotContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  }
}))
