import { makeStyles } from "@mui/styles"

export const useStyles = makeStyles({
  modalContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginTop: "16px"
  },
  modalActions: {
    padding: "16px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "8px"
  }
})
