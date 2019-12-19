import { createStore, combineReducers, applyMiddlewares } from 'react-redux'
import thunk from 'redux-thunk'

import categoriesReducer from '../reducers/categoriesReducer'

const configureStore = () => {
    const store = createStore(combineReducers({
        categories: categoriesReducer
    }), applyMiddlewares(thunk))
    return store
}

export default configureStore