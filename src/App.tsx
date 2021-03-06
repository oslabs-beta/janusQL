import React from 'react';
import ReactDom from 'react-dom';
import Main from './Main';

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const App = () => {
  return (
      <Main></Main>
  )
}

ReactDom.render(<App />, mainElement);
