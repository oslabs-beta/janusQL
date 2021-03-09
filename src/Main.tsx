import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginContainer from './containers/LoginContainer';
import GraphContainer from './containers/GraphContainer';
import DashboardContainer from './containers/DashboardContainer';
import Navbar from './components/Navbar';

class Main extends Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="main">
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact>
              <DashboardContainer/>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Main;
