
import { createSlice } from '@reduxjs/toolkit'

import { AppState, initialState } from '../AppState'

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        onAuthStateChanged: (state: AppState, action: any) => {
            var email = action.payload.email
            return { ...state, userEmail: email }
        }
    }
})
