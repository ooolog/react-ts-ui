import React from 'react'
import { Icon } from 't-ui'
import { useDocumentTitle } from '../hook/list'
import { configIcon } from './config'

export default function DomIcon() {
    useDocumentTitle('Icon')
    return (
        <div>
            {
                configIcon.map((item, index) => {
                    return <React.Fragment key={index}>
                        <div style={{
                            width: '120px',
                            height: '120px',
                            display: 'inline-block',
                            textAlign: 'center',
                            overflow: 'hidden',
                            padding: 10,
                            verticalAlign: 'middle'
                            // lineHeight: '50px'
                        }}>
                            <Icon icon={item} style={{color:'#409EFF',fontSize: 24}}/>
                            <p style={{
                                wordWrap: 'break-word',
                                textAlign: 'left'
                            }}>{item}</p>
                        </div>
                    </React.Fragment>
                })
            }

        </div>
    )
}
