import React from 'react';
import ReactDom from 'react-dom';
import Login from './components/Login'
import Signup from './components/Signup'
import Main from './Main';
import './styles/styles.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { PerformanceContextProvider } from '../src/context/PerformanceContext';


const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

// custom MUI theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FE688B',
      contrastText: '#FFFF'
    },
    secondary: {
      main: '#FF8E53',
      npmcontrastText: '#git'
    },
  },
})

const App = () => {
  return (
    <PerformanceContextProvider>
      <MuiThemeProvider theme={theme}>
        <Main></Main>
      </MuiThemeProvider>
    </PerformanceContextProvider>
  )
}

ReactDom.render(<App />, mainElement);
