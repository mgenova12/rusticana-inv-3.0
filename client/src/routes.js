import React from 'react';
import Home from './components/Home';
import { Route, Switch } from 'react-router-dom';


export const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
};
