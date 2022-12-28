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

import PrepcenterOrders from './components/Prepcenter/_Orders.js';
import PrepcenterOrder from './components/Prepcenter/_Order.js';
import PrepcenterInventory from './components/Prepcenter/_Inventory.js';
import StartPrepcenterInventory from './components/Prepcenter/_StartInventory.js';
import StoreOrders from './components/Prepcenter/_StoreOrders.js';
import StoreOrder from './components/Prepcenter/_StoreOrder.js';
import ReasonCodes from './components/Prepcenter/_ReasonCodes.js';
import PrepcenterStoreGoods from './components/Prepcenter/_StoreGoods.js';
import CombinedStoreOrders from './components/Prepcenter/_CombinedStoreOrders.js';
import PrepcenterLocations from './components/Prepcenter/_Locations.js';
import AddPrepcenterStoreGood from './components/Prepcenter/_AddStoreGood.js';
import PrintLabels from './components/Prepcenter/_PrintLabels.js';
import StartQuickOrder from './components/Prepcenter/_StartQuickOrder.js';
import QuickOrder from './components/Prepcenter/_QuickOrder.js';
import SubmitQuickOrder from './components/Prepcenter/_SubmitQuickOrder.js';
import QuickOrderSuccess from './components/Prepcenter/_QuickOrderSuccess.js';

import GiftCards from './components/GiftCards/_GiftCards.js';
import SwipeGiftCard from './components/GiftCards/_SwipeGiftCard.js';
import GiftCardLogs from './components/GiftCards/_GiftCardLogs.js';

import Users from './components/Users/_Users.js';

import Invoices from './components/Invoices/_Invoices.js';
import Invoice from './components/Invoices/_Invoice.js';

import Login from './components/Auth/Login.js';
import { getToken } from './token'
import { Route, Switch, Redirect } from 'react-router-dom';
import { Navbar } from './navbar'

import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from './components/Auth/auth.query'
// import { GET_CURRENT_STORE} from './components/Auth/auth.query'
import BeatLoader from "react-spinners/BeatLoader"

const PrivateRoute = ({ component: Component, ...rest }) => {

  const {data: currentUserQuery, loading: currentUserQueryLoading} = useQuery(GET_CURRENT_USER)
  // const {data: currentStoreQuery, loading: currentStoreQueryLoading} = useQuery(GET_CURRENT_STORE, {
  //   fetchPolicy: "network-only",
  //   variables: {
  //     id: rest.computedMatch.params.storeId ? parseInt(rest.computedMatch.params.storeId) : parseInt(rest.computedMatch.params.prepcenterId),
  //     storeName: rest.computedMatch.path.split('/')[1]
  //   } 
  // })

  if (currentUserQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>
  // if (currentStoreQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>

  return (
    <Route
      {...rest}
      render={props => {
       //  console.log(props)

        const isLoggedIn = !!getToken();

        if (isLoggedIn && currentUserQuery) {
          return (
            <React.Fragment>
              <Navbar
                {...props}
                currentUser={currentUserQuery.currentUser}
                // currentStore={currentStoreQuery}
              />
           
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

          <PrivateRoute exact path="/store/:storeId/order/:orderId/inventory" component={Inventory} />
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
          <PrivateRoute exact path="/prepcenter/:prepcenterId/order/:orderId/inventory" component={PrepcenterInventory} />
          <PrivateRoute exact path="/prepcenter/:prepcenterId/inventory_success" component={InventorySuccess} />
          <PrivateRoute exact path="/prepcenter/:prepcenterId/orders" component={PrepcenterOrders} />
          <PrivateRoute exact path="/prepcenter/:prepcenterId/orders/:orderId" component={PrepcenterOrder} />
          <PrivateRoute exact path="/prepcenter/:prepcenterId/print_labels" component={PrintLabels} />
          
          <PrivateRoute exact path="/prepcenter/:prepcenterId/start_quick_order" component={StartQuickOrder} />
          <PrivateRoute exact path="/prepcenter/:prepcenterId/order/:orderId/quick_order" component={QuickOrder} />
          <PrivateRoute exact path="/prepcenter/:prepcenterId/order/:orderId/submit_quick_order" component={SubmitQuickOrder} />
          <PrivateRoute exact path="/prepcenter/:prepcenterId/order/:orderId/quick_order_success" component={QuickOrderSuccess} />

          <PrivateRoute exact path="/invoices" component={Invoices} />
          <PrivateRoute exact path="/invoices/order/:orderId" component={Invoice} />

          <PrivateRoute exact path="/users" component={Users} />

          <PrivateRoute exact path="/gift_cards/:storeId/activate" component={GiftCards} />
          <PrivateRoute exact path="/gift_cards/:storeId/swipe" component={SwipeGiftCard} />
          <PrivateRoute exact path="/gift_cards/logs" component={GiftCardLogs} />

      		<Route exact path='/login' component={Login} />
      </Switch>
      
    </div>
  );
};
