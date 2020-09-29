
import { configureStore } from "@reduxjs/toolkit"
import { layoutSlice } from './slices/layout'
import { authSlice } from './slices/auth'
import reduceReducers from 'reduce-reducers'

//const store = configureStore({ reducer: combineReducers({ layoutReducer, authReducer }) })

const reducer = reduceReducers(layoutSlice.reducer, authSlice.reducer) as any

const store = configureStore({ reducer: reducer })

export default store
