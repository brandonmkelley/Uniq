
import React from 'react'

import { Card } from 'react-bootstrap'

import { Link } from 'react-router-dom'

export interface CardDemoParams {
    imageSource?: string | null,
    title: string,
    text: string,
    footer: string
}

export default function(params: CardDemoParams) {
    return (
        <Card>
            <div className="text-center">
                { params.imageSource && <img alt={ params.title + ' stock image' } width="100%" src={ params.imageSource }/> }
            </div>
            <Card.Body>
                <Card.Title>{ params.title }</Card.Title>
                <Card.Text>{ params.text }</Card.Text>
            </Card.Body>
            <Card.Footer>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <small className="text-muted">{ params.footer }</small>
                    <small><Link to={ "/media/" + params.title }>Read more &gt;</Link></small>
                </div>
            </Card.Footer>
        </Card>
    )
}
