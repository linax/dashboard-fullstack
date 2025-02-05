import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material"

export const useStyles = makeStyles((theme: Theme) => ({
  grid: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  boxContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2)
  }
}))
