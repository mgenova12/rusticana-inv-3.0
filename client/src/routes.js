import React from 'react';
import Home from './components/Home';
import Products from './components/Globals/products.js';
import Login from './components/Auth/Login.js';
import { getToken } from './token'
import { Route, Switch, Redirect } from 'react-router-dom';


const PrivateRoute = ({ component: Component, isAuth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
      	console.log(props)
      	console.log(`isAuth - ${!!getToken()}`)
      	
      	const isLoggedIn = !!getToken();
        if (isLoggedIn) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          );
        }
      }}
    />
  );
};


export const Routes = () => {
  return (
    <div>

      <Switch>
	        <PrivateRoute exact path="/"  component={Home}  />
	        <PrivateRoute exact path="/globals/products"  component={Products} />
      		
      		<Route exact path='/login' component={Login} />
      </Switch>
      
    </div>
  );
};
