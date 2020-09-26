import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';	
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import * as serviceWorker from './serviceWorker';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client'
import { HashRouter } from 'react-router-dom'

// import store from "./store/index";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: `${process.env.REACT_APP_API_URL}/graphql`,
  })
})


ReactDOM.render(
	<HashRouter basename="/">
  	<ApolloProvider client={client}>
    	<App />
  	</ApolloProvider>
  </HashRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


