import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import Anecdotereducer from './reducers/anecdoteReducer'
import Messagereducer from './reducers/messageReducer'
import Filterreducer from './reducers/filterReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    Anecdote: Anecdotereducer,
    Message: Messagereducer,
    Filter: Filterreducer
  })

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
      )
  )

  export default store