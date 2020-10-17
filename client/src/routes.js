import React from 'react';
import Home from './components/Home';
import Products from './components/Globals/_Products.js';
import PreppedProducts from './components/Globals/_PreppedProducts.js';
import Distributors from './components/Globals/_Distributors.js';
import Login from './components/Auth/Login.js';
import { getToken } from './token'
import { Route, Switch, Redirect } from 'react-router-dom';
import { Navbar } from './navbar'


const PrivateRoute = ({ component: Component, nav, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
      	console.log(props)
      	console.log(`isAuth - ${!!getToken()}`)
      	const isLoggedIn = !!getToken();
        if (isLoggedIn) {
          return (
            <React.Fragment>
              <Navbar />
              <Component {...props} />;
            </React.Fragment> 
          )
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
	        <PrivateRoute exact path="/" component={Home}  />
	        <PrivateRoute exact path="/globals/products" component={Products}/>
          <PrivateRoute exact path="/globals/prepped_products" component={PreppedProducts} />
	        <PrivateRoute exact path="/globals/distributors" component={Distributors} />
      		
      		<Route exact path='/login' component={Login} />
      </Switch>
      
    </div>
  );
};
