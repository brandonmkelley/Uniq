
import React from 'react'

import { useParams } from 'react-router-dom'

import CardGroup from 'react-bootstrap/CardGroup'
import Col from 'react-bootstrap/Col'

import CardDemo from '../components/CardDemo'

import mediaData from '../data/media.json'

export default function() {
    let { shortName } : any = useParams()

    const filteredMedia = mediaData.articles.filter((o) => o.shortName === shortName);

    const selectedMedia = (filteredMedia.length > 0) ? filteredMedia[0] : mediaData.articles[0];

    return (
        <React.Fragment>
            <CardGroup style={{ width: '100%', height: '22vh' }}>
                {mediaData.articles.map((o, i) => {
                    return (
                        <CardDemo
                            key={ i }
                            title={ o.shortName }
                            text={ o.description }
                            footer={ o.lastEdit } />
                    )
                })}
            </CardGroup>
            <Col xs="7" className="p-3" style={{ height: '70vh', display: 'flex', alignItems: 'center' }}>
                <div>
                    <h1 className="mb-4">{ selectedMedia.longName }</h1>
                    <div dangerouslySetInnerHTML={{ __html: selectedMedia.content }}></div>
                </div>
            </Col>
            <Col xs="5" className="p-3" style={{ height: '70vh', display: 'flex', alignItems: 'center' }}>
                <div className="text-right">
                    <div><img alt={ selectedMedia.shortName + ' stock image' } width="100%" src={ '/' + selectedMedia.image }/></div>
                    <div className="mt-2 float-right"><i>{ selectedMedia.description }</i></div>
                </div>
            </Col>
        </React.Fragment>
    )
}
