import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';	

import * as serviceWorker from './serviceWorker';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'

import store from "./store/index";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:5000/graphql',
  })
})


ReactDOM.render(
	<BrowserRouter>
  	<ApolloProvider client={client} store={store}>
    	<App />
  	</ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


