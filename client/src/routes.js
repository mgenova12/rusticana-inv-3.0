import React from 'react';
import Home from './components/Home';
import Products from './components/Globals/_Products.js';
import PreppedProducts from './components/Globals/_PreppedProducts.js';
import Distributors from './components/Globals/_Distributors.js';
import Locations from './components/Store/_Locations.js';
import StoreGoods from './components/Store/_StoreGoods.js';
import AddStoreGood from './components/Store/_AddStoreGood.js';
import StartInventory from './components/Store/_StartInventory.js';
import Login from './components/Auth/Login.js';
import { getToken } from './token'
import { Route, Switch, Redirect } from 'react-router-dom';
import { Navbar } from './navbar'


const PrivateRoute = ({ component: Component, navbar, ...rest }) => {
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
              <Navbar {...props}/>
              <Component {...props} />
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
          
          <PrivateRoute exact path="/store/:storeId/locations" component={Locations} />
          <PrivateRoute exact path="/store/:storeId/store_goods" component={StoreGoods} />
          <PrivateRoute exact path="/store/:storeId/add_store_goods" component={AddStoreGood} />
          <PrivateRoute exact path="/store/:storeId/start_inventory" component={StartInventory} />
      		
      		<Route exact path='/login' component={Login} />
      </Switch>
      
    </div>
  );
};
