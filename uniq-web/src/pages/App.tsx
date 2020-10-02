
import React, { useEffect, useContext, useState } from 'react'

import * as firebase from 'firebase'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'

import { useSelector } from 'react-redux'

import { AppState } from '../AppState'

import { ServiceContext } from '../index'

export default function() {
    const userEmail = useSelector((state: AppState) => state.userEmail)

    const services = useContext(ServiceContext)
    const socket = services.socket
    const firebaseApp = services.firebaseApp

    const [userList, setUserList] = useState([])

    useEffect(() => {
        var currentUser = firebase.auth(firebaseApp).currentUser

        if (currentUser !== null)
            currentUser
                .getIdToken()
                .then(sid => socket.emit('read-page-app', { sid: sid }))
        
        else
            socket.emit('read-page-app')

        socket.on('read-user-list', (e: any) => {
            setUserList(e)
            console.log(e)
        })

        return () => {
            socket.off('read-user-list')
        }
    }, [firebaseApp, socket, userEmail])

    return (
        <Container fluid>
            <Row>
                <Col xs="12">
                    <h3>Users</h3>
                    <Table striped bordered hover responsive style={{ width: '300px' }}>
                        <thead>
                            <tr><td>Email</td></tr>
                        </thead>
                        <tbody>
                            {
                                userList.map((o: { email: string }, i) => 
                                    <tr key={ o.email }><td>{ o.email }</td></tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}
