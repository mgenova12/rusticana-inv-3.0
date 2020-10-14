import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';	
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import * as serviceWorker from './serviceWorker';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client'
import { HashRouter } from 'react-router-dom'
import { getToken } from './token'
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_API_URL}/graphql`
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getToken()
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
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


