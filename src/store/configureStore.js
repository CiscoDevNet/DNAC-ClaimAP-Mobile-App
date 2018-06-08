import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

let configureStore = createStore(rootReducer, applyMiddleware(thunk));
export default configureStore;
