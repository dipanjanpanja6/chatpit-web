import {createStore,combineReducers,applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import authreduser from './reduser/authreduser';
import postReducer from './reduser/postReducer'
import userReducer from './reduser/userReducer'


const initialState ={};

const middleware = [thunk];

const reducer = combineReducers({
    auth:authreduser,
    post:postReducer,
    user:userReducer,
})

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;