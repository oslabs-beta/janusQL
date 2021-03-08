import React from 'react';
import ReactDom from 'react-dom';
import Main from './Main';
import './styles/styles.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#FF8E53'
    },
    primary: {
      main: '#FE688B'
    }
  }
})

const App = () => {
  return (
      <Main></Main>
  )
}

ReactDom.render(<App />, mainElement);
