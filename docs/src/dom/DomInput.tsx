import React from 'react'
import { Input } from 't-ui'
import { useDocumentTitle } from '../hook/list'
const { TextArea,Password,Search } = Input
export default function DomTabs() {
    useDocumentTitle('Input')
    return (
        <div>
            <Input defaultValue="33" ></Input>
            <Input disabled style={{ margin: '0 10px' }} placeholder="禁用" label="禁用:"></Input>
            <Input prepend={<div>prepend</div>} placeholder="前标签" style={{ margin: '0 10px' }} ></Input>
            <Input append={<div style={{ padding: '0 10px' }}>append</div>} style={{ margin: '0 10px' }} placeholder="后标签"></Input>
            <Input
                size="large"
                style={{ margin: '0 10px' }} placeholder="搜索值"></Input>
            <Input
                size="middle"
                 style={{ margin: '0 10px' }} placeholder="搜索值"></Input>
            <Input style={{ margin: '5px 10px' }} placeholder="后标签"></Input>

            <TextArea style={{ margin: '5px 10px' }}
                placeholder="输入框"
                defaultValue="输入框55"
            ></TextArea>
             <TextArea style={{ margin: '5px 10px' }}
                disabled
                placeholder="输入框"
            ></TextArea>

            <Password style={{ margin: '5px 10px' }} defaultValue="343432"></Password>
            <Password style={{ margin: '5px 10px' }} size="middle" visibilityToggle></Password>
            <Password style={{ margin: '5px 10px' }} size="large" visibilityToggle></Password>
            <Password style={{ margin: '5px 10px' }} size="small" defaultValue="5553" visibilityToggle disabled></Password>
            <Password style={{ margin: '5px 10px' }} size="large" defaultValue="5553" disabled></Password>

            <Search/>
            
        </div>
    )
}
