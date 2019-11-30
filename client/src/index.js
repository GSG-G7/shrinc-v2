import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';

const client = new ApolloClient({
  uri: 'http://localhost:5000/shrinc',
});

const ProviderSetUp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<ProviderSetUp />, document.getElementById('root'));
