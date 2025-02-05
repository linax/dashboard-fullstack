import { Provider } from "react-redux"

import "./App.css"
import Dashboard from "./components/Dashboard"
import { store } from "./redux/store"
import { createTheme, ThemeProvider } from "@mui/material"

const theme = createTheme()
function App() {
  return (
    <ThemeProvider theme={theme}>
      <h1>Gestión de Productos - Desafio CMPC</h1>
      <Provider store={store}>
        <Dashboard />
      </Provider>
    </ThemeProvider>
  )
}

export default App
