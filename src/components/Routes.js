import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

// import Home from "./Home"
// import Recipe from "./Recipe"
import Dashboard from "./Brand"


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
                <Route path="/" component={Dashboard} />
                <Route exact path="/dashboard" component={Dashboard} />
                {/* <Route path="/users" component={Home} />
                <Route path="/recipes" component={Recipe} /> */}
            </Switch>
        </Router>
      
    );
  }
}

export default Routes;
