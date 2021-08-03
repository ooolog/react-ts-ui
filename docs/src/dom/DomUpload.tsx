import React from 'react'
import { Upload } from 't-ui'
import { useDocumentTitle } from '../hook/list'

export default function DomTabs() {
    useDocumentTitle('Upload')
    return (
        <div>
            <Upload></Upload>
        </div>
    )
}
