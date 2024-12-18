import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { config } from 'dotenv';
import AppTheme from './assets/styles/index';
import './assets/styles/style.css';
import getApolloClient from './graphql/client';
import App from './components/App';
import withSession from './components/withSession';
import StateProvider from './providers/stateProvider';
import mainReducer from './providers/mainReducer';
import initialState from './providers/initialState';
import registerServiceWorker from './registerServiceWorker';
import { restoreRequests } from './graphql/offline/offlineMutation';

config();
const AppwithSession = withSession(App);

getApolloClient().then((client) => {
// Restore mutation requests
  restoreRequests(client);
  ReactDOM.render(
    <MuiThemeProvider theme={AppTheme}>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <StateProvider initialState={initialState} reducer={mainReducer}>
            <AppwithSession />
          </StateProvider>
        </ApolloProvider>
      </BrowserRouter>
    </MuiThemeProvider>,
    document.getElementById('root')
  );
});

registerServiceWorker();
