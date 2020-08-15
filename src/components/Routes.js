import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

import Home from "./Home"
import Recipe from "./Recipe"


const PrivateRoute = ({ component: Component, ...rest }) => {
  let loggedIn = JSON.parse(localStorage.getItem("user"));
  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn && loggedIn.token && loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

class Routes extends Component {
  render() {
    return (
        <Router>
            <Switch>
                <Route path="/" component={Recipe} />
                <Route exact path="/users" component={Home} />
                <Route exact path="/recipes" component={Recipe} />
            </Switch>
        </Router>
      
    );
  }
}

export default Routes;
