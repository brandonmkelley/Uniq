
import React, { useEffect, useContext } from 'react'

import * as firebase from 'firebase'

import { ServiceContext } from './index'

import { useSelector, useDispatch } from 'react-redux'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import TopNav from './components/TopNav'

import Home from './pages/Home'
import Media from './pages/Media'
import App from './pages/App'

import { layoutSlice } from './slices/layout'
import { authSlice } from './slices/auth'

export default function() {
  const dispatch = useDispatch()
  const services = useContext(ServiceContext)
  const firebaseApp = services.firebaseApp

  useEffect(() => {
    dispatch(layoutSlice.actions.desktop())
  })

  // Bind auth state changed listener to auth slice to update UI state.
  useEffect(() => {
    firebase.auth(firebaseApp).onAuthStateChanged(result => {
      if (result)
        dispatch(authSlice.actions.onAuthStateChanged({ email: result.email }))
      else
        dispatch(authSlice.actions.onAuthStateChanged({ email: "" }))
    })
  })
  

  const navHeight = useSelector((state: any) => state.layoutNavHeight) || ''

  return (
    <BrowserRouter>
      <Row noGutters={ true }>
        <Col xs={ 12 }><TopNav height={ navHeight }/></Col>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/media/:shortName?" component={ Media } />
          <Route path="/app" component={ App } />
        </Switch>
      </Row>
    </BrowserRouter>
  )
}
