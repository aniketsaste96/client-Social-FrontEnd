//import files

import { createStore, applyMiddleware, combineReducers } from "redux";

import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";

//import our file

import { usersReducer } from "./reducer/usersReducer"
import { alertsReducer } from "./reducer/alertsReducer"
import { postsReducer } from "./reducer/postsReducer"
const rootReducer = combineReducers({
    //key value use same to avoid confusion
    usersReducer: usersReducer,
    alertsReducer: alertsReducer,
    postsReducer: postsReducer
})



const composeEnhancers = composeWithDevTools({
    // Specify here name, actionsBlacklist, actionsCreators and other options
});

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
        // other store enhancers if any
    )
);

export default store;

//impo it in index.js