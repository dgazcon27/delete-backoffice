import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { client } from './config/configStore';
import rootReducer from './reducers/rootReducer';
import verifyToken from './middleware/tokenExpiration';
import App from './App';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, verifyToken)));

/* const enhancer = composeWithDevTools(getMiddleware());
const store = createStore(rootReducer, enhancer); */

render(
	<Provider store={store}>
		<ApolloProvider client={client}>
			<Router>
				<App />
			</Router>
		</ApolloProvider>
	</Provider>,
	document.getElementById('root'),
);
