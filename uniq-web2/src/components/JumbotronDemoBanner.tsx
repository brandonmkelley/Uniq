
import React from 'react'

import Jumbotron from 'react-bootstrap/Jumbotron'

export interface JumbotronDemoBannerParams {
    height: string,
}

export default function(params: JumbotronDemoBannerParams) {
    return (
        <Jumbotron className="m-0" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: params.height }}>
            <div className="text-center">
                <h1>Maximize your Social &amp; Professional Presence</h1>
                <p className="m-0"><i>Take a <b>UNIQ</b> approach to effective collaboration with modern productivity tools</i></p>
            </div>
        </Jumbotron>
    )
}
