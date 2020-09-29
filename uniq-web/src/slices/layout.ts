
import { createSlice } from '@reduxjs/toolkit'

import { AppState, initialState } from '../AppState'

export const layoutSlice = createSlice({
    name: 'layout',
    initialState: initialState,
    reducers: {
        desktop: (state: AppState) => {
            return {
                ...state,
                layoutPlatform: 'Desktop',
                layoutNavHeight: '8vh',
                layoutJumboHeight: '32vh',
                layoutCardHeight: '60vh'
            }
        }
    }
})
