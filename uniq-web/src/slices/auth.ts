
import { createSlice } from '@reduxjs/toolkit'

import { AppState, initialState } from '../AppState'

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        onAuthStateChanged: (state: AppState, action: any) => {
            console.log('auth state changed (dispatch): ' + action.payload.email || '')
            //Object.assign(state.userEmail || '', action.payload.email)
            //return state
            var email = action.payload.email
            return { ...state, userEmail: email }
        }
    }
})
