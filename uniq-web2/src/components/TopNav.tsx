
import React, { useContext, useRef } from 'react'

import firebase from 'firebase'

import { useSelector } from 'react-redux'

import { authSlice } from '../slices/auth'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/FormGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

import { Link } from 'react-router-dom'

// import AppState from '../AppState'

import { ServiceContext } from '../index'

export interface TopNavParams {
    height: string,
}

export default function(params: TopNavParams) {

    const services = useContext(ServiceContext)
    const firebaseApp = services.firebaseApp

    const userEmail = useSelector((state: any) => state.userEmail)
    //const userEmail: string = ''

    console.log('nav refresh: ' + userEmail)

    const emailRef = useRef(null)
    const passRef = useRef(null)

    //firebase.auth(firebaseApp).signOut()

    const signIn = (e: any) => {
        e.preventDefault()

        firebase
            .auth(firebaseApp)
            .signInWithEmailAndPassword((emailRef.current || { value: '' }).value, (passRef.current || { value: '' }).value)
    }

    const signOut = () => {
        firebase.auth(firebaseApp).signOut()
    }

    return (
        <Navbar bg="transparent" variant="light" expand="lg" style={{ height: params.height }}>
        <Navbar.Brand as={Link} to="/">Uniq</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link as={Link} to="/media">Media</Nav.Link>
            <Nav.Link as={Link} to="/app">App</Nav.Link>
            {/*
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            */}
            </Nav>
            { !userEmail &&
                <Form inline onSubmit={ signIn }>
                    <FormControl type="text" placeholder="Email" ref={ emailRef } className="mr-sm-2" />
                    <FormControl type="password" placeholder="Password" ref={ passRef } className="mr-sm-2" />
                    <Button variant="outline-success" type="submit" /* onClick={ signIn } */>Sign in</Button>
                </Form>
            }
            { userEmail &&
                <div className="mr-2">Logged in as: <b style={{ color: '#777' }}>{ userEmail }</b></div>
            }
            { userEmail &&
                <Form inline>
                    <Button variant="outline-success" onClick={ signOut }>Sign out</Button>
                </Form>
            }
            
            { /*userEmail && 
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Submit</Button>
                </Form>
                */
            }
        </Navbar.Collapse>
        </Navbar>
    )
}
