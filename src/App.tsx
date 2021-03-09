import React from 'react';
import ReactDom from 'react-dom';
import Homepage from './Homepage';
import Login from './components/Login'
import Signup from './components/Signup'
import Main from './Main';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, 
} from "react-router-dom";

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

//login is a place holder to see the render of the login page
const App = () => {
  return (
    <main className="entryContainer">
      <Router>
        <Switch>
          <Route path="./components/Signup" />
            <Route path="./components/Login" />
       
        </Switch>
      </Router>
     
    </main>
      
  )
}

ReactDom.render(<App />, mainElement);
