
import { ThemeProvider, } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createTheme } from '@material-ui/core/styles';
import { theme } from 'providers/theme';
import { useMemo } from 'react'



import { Routes } from 'routes';





function App() {

  const preferedTheme = useMemo(() => createTheme(theme), [])


  return (
    < ThemeProvider theme={preferedTheme} >
      <CssBaseline />
      <Routes />
    </ThemeProvider >
  )
}

export default App;
