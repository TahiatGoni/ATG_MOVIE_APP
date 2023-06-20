import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'react-sliding-side-panel/lib/index.css'
import 'bootstrap/dist/css/bootstrap.css';
import {configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import {Provider} from 'react-redux'
import authReducer from './features/authSlice'
import movieReducer from './features/movieSlice'
import movieSaga from './sagas/sagas'

let sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: movieReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware)
})

sagaMiddleware.run(movieSaga)

ReactDOM.createRoot(document.getElementById('root')).render(

    <Provider store={store}>
      <App />
    </Provider>
  ,
)
