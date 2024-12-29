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

import ActivateGiftCard from './components/GiftCards/_ActivateGiftCard.js';
import SwipeGiftCard from './components/GiftCards/_SwipeGiftCard.js';
import GiftCardLogs from './components/GiftCards/_GiftCardLogs.js';
import GiftCardLog from './components/GiftCards/_GiftCardLog.js';
import GiftCardPurchase from './components/GiftCards/_GiftCardPurchase.js';
import AddValue from './components/GiftCards/_AddValue.js';
import GiftCardReview from './components/GiftCards/_GiftCardReview.js';
import GiftCardPurchaseReview from './components/GiftCards/_GiftCardPurchaseReview.js';
import AddValueReview from './components/GiftCards/_AddValueReview.js';

import GiftCardInvoices from './components/GiftCards/_GiftCardInvoices.js';

import Customers from './components/Customers/_Customers.js';

import Users from './components/Users/_Users.js';

import Invoices from './components/Invoices/_Invoices.js';
import Invoice from './components/Invoices/_Invoice.js';

import Login from './components/Auth/Login.js';
import { getToken } from './token'
import { Route, Switch, Redirect } from 'react-router-dom';
import { Navbar } from './navbar'

import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from './components/Auth/auth.query'
import BeatLoader from "react-spinners/BeatLoader"

const PrivateRoute = ({ currentLocation, component: Component, ...rest}) => {

  const {data: currentUserQuery, loading: currentUserQueryLoading} = useQuery(GET_CURRENT_USER)

  if (currentUserQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>

  return (
    <Route
      {...rest}
      render={props => {
        // console.log(rest)
        // console.log(props)

        const isLoggedIn = !!getToken();

        if (isLoggedIn && currentUserQuery) {
          return (
            <React.Fragment>
              <Navbar
                {...props}
                currentUser={currentUserQuery.currentUser}
                currentLocation={currentLocation}
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
	        <PrivateRoute exact path="/" component={Home} currentLocation={'home'}/>
          <PrivateRoute exact path="/invoices" component={Invoices} currentLocation={'home'}/>
          <PrivateRoute exact path="/invoices/order/:orderId" component={Invoice} currentLocation={'home'}/>
          <PrivateRoute exact path="/gift_card_invoices" component={GiftCardInvoices} currentLocation={'home'}/>
          <PrivateRoute exact path="/users" component={Users} currentLocation={'home'}/>
          <PrivateRoute exact path="/customers" component={Customers} currentLocation={'home'}/>


	        <PrivateRoute exact path="/globals/products" component={Products} currentLocation={'global'}/>
          <PrivateRoute exact path="/globals/prepped_products" component={PreppedProducts} currentLocation={'global'}/>
	        <PrivateRoute exact path="/globals/distributors" component={Distributors} currentLocation={'global'}/>


          <PrivateRoute exact path="/store/:storeId/locations" component={Locations} currentLocation={'store'}/>
          <PrivateRoute exact path="/store/:storeId/store_goods" component={StoreGoods} currentLocation={'store'}/>
          <PrivateRoute exact path="/store/:storeId/add_store_goods" component={AddStoreGood} currentLocation={'store'}/>
          <PrivateRoute exact path="/store/:storeId/start_inventory" component={StartInventory} currentLocation={'store'}/>
          <PrivateRoute exact path="/store/:storeId/order/:orderId/inventory" component={Inventory} currentLocation={'store'}/>
          <PrivateRoute exact path="/store/:storeId/inventory_success" component={InventorySuccess} currentLocation={'store'}/>
          <PrivateRoute exact path="/store/:storeId/orders" component={Orders} currentLocation={'store'}/>
          <PrivateRoute exact path="/store/:storeId/orders/:orderId" component={Order} currentLocation={'store'}/>


          <PrivateRoute exact path="/prepcenter/:prepcenterId/store_orders" component={StoreOrders} currentLocation={'prepcenter'}/>
          <PrivateRoute exact path="/prepcenter/:prepcenterId/store_orders/:storeOrderId/orders/:orderId" component={StoreOrder} currentLocation={'prepcenter'}/>
          <PrivateRoute exact path="/prepcenter/:prepcenterId/store_orders/:storeOrderId/orders/:orderId/reason_codes" component={ReasonCodes} currentLocation={'prepcenter'}/>
          <PrivateRoute exact path="/prepcenter/:prepcenterId/store_orders/:storeOrderId" component={CombinedStoreOrders} currentLocation={'prepcenter'}/>
          <PrivateRoute exact path="/prepcenter/:prepcenterId/start_inventory" component={StartPrepcenterInventory} currentLocation={'prepcenter'}/>
          <PrivateRoute exact path="/prepcenter/:prepcenterId/store_goods" component={PrepcenterStoreGoods} currentLocation={'prepcenter'}/>
          <PrivateRoute exact path="/prepcenter/:prepcenterId/locations" component={PrepcenterLocations} currentLocation={'prepcenter'}/>
          <PrivateRoute exact path="/prepcenter/:prepcenterId/add_store_goods" component={AddPrepcenterStoreGood} currentLocation={'prepcenter'}/>
          <PrivateRoute exact path="/prepcenter/:prepcenterId/order/:orderId/inventory" component={PrepcenterInventory} currentLocation={'prepcenter'}/>
          <PrivateRoute exact path="/prepcenter/:prepcenterId/inventory_success" component={InventorySuccess} currentLocation={'prepcenter'}/>
          <PrivateRoute exact path="/prepcenter/:prepcenterId/orders" component={PrepcenterOrders} currentLocation={'prepcenter'}/>
          <PrivateRoute exact path="/prepcenter/:prepcenterId/orders/:orderId" component={PrepcenterOrder} currentLocation={'prepcenter'}/>
          <PrivateRoute exact path="/prepcenter/:prepcenterId/print_labels" component={PrintLabels} currentLocation={'prepcenter'}/>
          <PrivateRoute exact path="/prepcenter/:prepcenterId/start_quick_order" component={StartQuickOrder} currentLocation={'prepcenter'}/>
          <PrivateRoute exact path="/prepcenter/:prepcenterId/order/:orderId/quick_order" component={QuickOrder} currentLocation={'prepcenter'}/>
          <PrivateRoute exact path="/prepcenter/:prepcenterId/order/:orderId/submit_quick_order" component={SubmitQuickOrder} currentLocation={'prepcenter'}/>
          <PrivateRoute exact path="/prepcenter/:prepcenterId/order/:orderId/quick_order_success" component={QuickOrderSuccess} currentLocation={'prepcenter'}/>


          <PrivateRoute exact path="/gift_cards/store/:storeId/swipe" component={SwipeGiftCard} currentLocation={'giftCard'}/>
          <PrivateRoute exact path="/gift_cards/store/:storeId/activate" component={ActivateGiftCard} currentLocation={'giftCard'}/>
          <PrivateRoute exact path="/gift_cards/store/:storeId/review_gift_card" component={GiftCardReview} currentLocation={'giftCard'}/>
          <PrivateRoute exact path="/gift_cards/store/:storeId/add_value_review" component={AddValueReview} currentLocation={'giftCard'}/>
          <PrivateRoute exact path="/gift_cards/store/:storeId/purchase_review" component={GiftCardPurchaseReview} currentLocation={'giftCard'}/>
          <PrivateRoute exact path="/gift_cards/store/:storeId/logs" component={GiftCardLogs} currentLocation={'giftCard'}/>
          <PrivateRoute exact path="/gift_cards/store/:storeId/gift_card/:giftCardId/log" component={GiftCardLog} currentLocation={'giftCard'}/>
          <PrivateRoute exact path="/gift_cards/store/:storeId/gift_card/:giftCardId/purchase" component={GiftCardPurchase} currentLocation={'giftCard'}/>
          <PrivateRoute exact path="/gift_cards/store/:storeId/gift_card/:giftCardId/add_value" component={AddValue} currentLocation={'giftCard'}/>

      		<Route exact path='/login' component={Login} />
      </Switch>
      
    </div>
  );
};
