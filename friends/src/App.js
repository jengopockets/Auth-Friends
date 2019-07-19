import React from 'react';
import {Route, Link, Redirect} from 'react-router-dom';
import logo from './logo.svg';
import Login from './Components/login';
import Friends from './Components/friends';
import './App.css';

const PrivateRoute =({ component: Component, ...rest }) => (
  <Route {...rest}
   render={props =>
    localStorage.getItem("token") ? (
      <Component {...props} />
    ) : (
      <Redirect to="/" />
    )
  }
 />
);


function App() {
  return (
    <div className="App">
      <Link to="/">Home</Link>
       <Link to="/login">Login</Link>
      <h1>Space Friends</h1>
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/friends" component={Friends} />
    </div>
  );
}

export default App;
