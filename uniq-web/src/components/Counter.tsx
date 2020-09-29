
import React from 'react'
import Button from 'react-bootstrap/Button'

import { createSlice } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from 'react-redux'

const slice = createSlice({
    name: 'Counter',
    initialState: 0,
    reducers: {
        increment: state => state + 1,
        decrement: state => state - 1,
        reset: state => 0
    }
})

export const { reducer } = slice

const Counter = () => {
    const count = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <React.Fragment>
            <h1>Hello counter!</h1>
            <p>{ count }</p>
            <Button onClick={ () => dispatch(slice.actions.increment()) }>Increment!</Button>
            <Button onClick={ () => dispatch(slice.actions.decrement()) }>Decrement!</Button>
            <Button onClick={ () => dispatch(slice.actions.reset()) }>Reset!</Button>
        </React.Fragment>
    )
}

export default Counter
