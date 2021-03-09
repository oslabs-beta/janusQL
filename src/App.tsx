import React from 'react';
import ReactDom from 'react-dom';
import Homepage from './Homepage';
import Login from './components/Login'
import Signup from './components/Signup'
import Main from './Main';
import './styles/styles.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FE688B',
      contrastText: '#FFFF'
    },
    secondary: {
      main: '#FF8E53',
      contrastText: '#FFFF'
    },
  },
})

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Main></Main>
    </MuiThemeProvider>
  )
}

ReactDom.render(<App />, mainElement);
