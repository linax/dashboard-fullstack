import { makeStyles } from "@mui/styles"
import { alpha } from "@mui/material/styles"

export const useStyles = makeStyles((theme: any) => ({
  main: {
    backgroundColor: alpha(theme.palette.background.default, 0.98),
    minHeight: "100vh",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  header: {
    marginBottom: theme.spacing(4),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 300
  },
  addButton: {
    marginBottom: theme.spacing(2)
  },
  errorSnackbar: {
    width: "100%"
  },
  title: {
    fontWeight: "bold",
    color: "primary"
  },
  alert: {
    width: "100%"
  }
}))
