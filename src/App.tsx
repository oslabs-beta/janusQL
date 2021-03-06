import React from 'react';
import ReactDom from 'react-dom';
import Homepage from './Homepage';
import Login from './components/Login'
import Signup from './components/Signup'
import Main from './Main';

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

//login is a place holder to see the render of the login page
const App = () => {
  return (
      <Login></Login>
  )
}

ReactDom.render(<App />, mainElement);
