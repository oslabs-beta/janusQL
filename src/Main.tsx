import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginContainer from './containers/LoginContainer';
import GraphContainer from './containers/GraphContainer';
import DashboardContainer from './containers/DashboardContainer';
import Navbar from './components/Navbar';
import Login from './components/Login'
import Signup from './components/Signup'

class Main extends Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Navbar />  
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/Signup' component={Signup} />
            <Route path='/Navbar' component={Navbar} />
            <Route path="/Graphs" exact>
              <DashboardContainer/>
            </Route>
          </Switch>
      </Router>
    );
  }
}

export default Main;

{/* <Router>
<Switch>

</Switch>
</Router> */}