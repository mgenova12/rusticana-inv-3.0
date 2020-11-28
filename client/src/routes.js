import React from 'react';
import Home from './components/Home';
import Products from './components/Globals/_Products.js';
import PreppedProducts from './components/Globals/_PreppedProducts.js';
import Distributors from './components/Globals/_Distributors.js';

import Locations from './components/Store/_Locations.js';
import StoreGoods from './components/Store/_StoreGoods.js';
import AddStoreGood from './components/Store/_AddStoreGood.js';
import StartInventory from './components/Store/_StartInventory.js';
import Inventory from './components/Store/_Inventory.js';
import InventorySuccess from './components/Store/_InventorySuccess.js';
import Orders from './components/Store/_Orders.js';
import Order from './components/Store/_Order.js';

import StartPrepcenterInventory from './components/Prepcenter/_StartInventory.js';
import StoreOrders from './components/Prepcenter/_StoreOrders.js';
import StoreOrder from './components/Prepcenter/_StoreOrder.js';
import ReasonCodes from './components/Prepcenter/_ReasonCodes.js';
import PrepcenterStoreGoods from './components/Prepcenter/_StoreGoods.js';
import CombinedStoreOrders from './components/Prepcenter/_CombinedStoreOrders.js';
import PrepcenterLocations from './components/Prepcenter/_Locations.js';
import AddPrepcenterStoreGood from './components/Prepcenter/_AddStoreGood.js';

import Login from './components/Auth/Login.js';
import { getToken } from './token'
import { Route, Switch, Redirect } from 'react-router-dom';
import { Navbar } from './navbar'


const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
      	// console.log(props)
        // console.log(props.match.params)

      	
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

          <PrivateRoute exact path="/store/:storeId/inventory" component={Inventory} />
          <PrivateRoute exact path="/store/:storeId/inventory_success" component={InventorySuccess} />

          <PrivateRoute exact path="/store/:storeId/orders" component={Orders} />
          <PrivateRoute exact path="/store/:storeId/orders/:orderId" component={Order} />

          <PrivateRoute exact path="/prepcenter/:prepcenterId/store_orders" component={StoreOrders} />
          <PrivateRoute exact path="/prepcenter/:prepcenterId/store_orders/:storeOrderId/orders/:orderId" component={StoreOrder} />
          <PrivateRoute exact path="/prepcenter/:prepcenterId/store_orders/:storeOrderId/orders/:orderId/reason_codes" component={ReasonCodes} />
          <PrivateRoute exact path="/prepcenter/:prepcenterId/store_orders/:storeOrderId" component={CombinedStoreOrders} />
          <PrivateRoute exact path="/prepcenter/:prepcenterId/start_inventory" component={StartPrepcenterInventory} />
          <PrivateRoute exact path="/prepcenter/:prepcenterId/store_goods" component={PrepcenterStoreGoods} />
          <PrivateRoute exact path="/prepcenter/:prepcenterId/locations" component={PrepcenterLocations} />
          <PrivateRoute exact path="/prepcenter/:prepcenterId/add_store_goods" component={AddPrepcenterStoreGood} />
      		
      		<Route exact path='/login' component={Login} />
      </Switch>
      
    </div>
  );
};
