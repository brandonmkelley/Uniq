
import React from 'react'

import { useSelector } from 'react-redux'

import Col from 'react-bootstrap/Col'
import CardGroup from 'react-bootstrap/CardGroup'

import JumbotronDemoBanner from '../components/JumbotronDemoBanner'
import CardDemo from '../components/CardDemo'

import mediaData from '../data/media.json'

export default function() {
    const jumboHeight = useSelector((state: any) => state.layoutJumboHeight) || ''
    const cardsHeight = useSelector((state: any) => state.layoutCardHeight) || ''

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
