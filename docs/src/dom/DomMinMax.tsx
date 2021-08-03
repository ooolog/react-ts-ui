
import React from 'react'
import {MaxMinInput} from 't-ui'
export default function DomMinMax() {
    return (<div>
           <MaxMinInput /> <br/>
           <MaxMinInput size="middle"/>  <br/>
           <MaxMinInput  size="large" width={120}/>  <br/>
           <MaxMinInput size="middle" disabled/>  <br/>
           <MaxMinInput size="middle" defaultValue={[1,2]} />  <br/>
        </div>
    )
}
