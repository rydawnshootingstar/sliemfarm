import React from 'react';
import { render } from 'react-dom';
import { createStore, compose ,applyMiddleware} from 'redux';
import axios from 'axios';
import { Provider } from 'react-redux';
import thunk  from 'redux-thunk';

import Root from './components/Root';
import rootReducer from './reducers/reducer';
import { fetchAuthenticated } from './actions/account';


/*
    APP ENTRY POINT:
    -configure the redux store with redux devtool extension compatibility and thunk middleware
    -define DOM element to render to ('root')
    -render the App component
*/

const prettyPrint = (thing)=> {
    console.log(JSON.stringify(thing,undefined,2 ));
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk)
    )
);

//DEBUG NOTE: this runs after all state changes
store.subscribe(()=> {
    return prettyPrint(store.getState());
})

const root = document.getElementById('root');

const jsx = (
    <Provider store={store}>
        <Root />
    </Provider>
);

//only render once initial call to db has completed 
store.dispatch(fetchAuthenticated()).then(()=> {
    render(jsx, root);
});




