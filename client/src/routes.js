import React from 'react';
import Home from './components/Home';
import Products from './components/Globals/products.js';
import { Route, Switch } from 'react-router-dom';


export const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/globals/products" component={Products} />
      </Switch>
    </div>
  );
};
