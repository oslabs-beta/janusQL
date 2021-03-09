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
      <Router>
        <div>  
          <Switch>
          <Route path="/Signup" component={Signup} />
          <Route path="/Login" component={Login} />
       
        </Switch>
        </div>
      
      </Router>
     
  )
}

ReactDom.render(<App />, mainElement);
