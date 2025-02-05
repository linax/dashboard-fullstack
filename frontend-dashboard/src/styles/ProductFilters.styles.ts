import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material"

export const useStyles = makeStyles((theme: Theme) => ({
  filterContainer: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2)
  },
  searchIcon: {
    marginRight: theme.spacing(1),
    verticalAlign: "middle"
  },
  inputsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(2)
  },
  searchField: {
    flex: "2 1 300px"
  },
  numberField: {
    flex: "1 1 150px"
  }
}))
