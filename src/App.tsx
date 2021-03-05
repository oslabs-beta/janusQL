import React from 'react';
import ReactDom from 'react-dom';
import Homepage from './Homepage';

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const App = () => {
  return (
      <Homepage></Homepage>
  )
}

ReactDom.render(<App />, mainElement);
