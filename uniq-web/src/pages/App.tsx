
import React, { useEffect, useContext } from 'react'

import * as firebase from 'firebase'

import { useSelector } from 'react-redux'

import { ServiceContext } from '../index'

import Col from 'react-bootstrap/Col'
import CardGroup from 'react-bootstrap/CardGroup'

import JumbotronDemoBanner from '../components/JumbotronDemoBanner'
import CardDemo from '../components/CardDemo'

import mediaData from '../data/media.json'



export default function() {
    const jumboHeight = useSelector((state: any) => state.layoutJumboHeight) || ''
    const cardsHeight = useSelector((state: any) => state.layoutCardHeight) || ''

    const services = useContext(ServiceContext)
    const socket = services.socket
    const firebaseApp = services.firebaseApp

    useEffect(() => {

        var currentUser = firebase.auth(firebaseApp).currentUser

        if (currentUser !== null)
            currentUser
                .getIdToken()
                .then(sid => socket.emit('read-page-app', { sid: sid }))
        
        else
            socket.emit('read-page-app')

        socket.on('read-env-list', (envs: any) => {
            //console.log('Response to read-env-list:')
            //console.log(envs)
        })

        return () => {
            socket.off('read-env-list')
        }
    })

    return (
        <React.Fragment>
            <Col xs={ 12 }>
                <JumbotronDemoBanner height={ jumboHeight } />
            </Col>
            <CardGroup style={{ width: "100%", height: cardsHeight }}>
                {mediaData.articles.map((o, i) => {
                    return (
                        <CardDemo
                            key={ i }
                            imageSource={ "/" + o.image }
                            title={ o.shortName }
                            text={ o.description }
                            footer={ o.lastEdit } />
                    )
                })}
            </CardGroup>
        </React.Fragment>
    )
}
