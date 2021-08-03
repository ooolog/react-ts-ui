import React from 'react'
import { Button } from 't-ui'
import { useDocumentTitle } from '../hook/list';
export default function DomButton() {
    const handleClick = () => {
        console.log('handleClick');
    }
    useDocumentTitle('Button')
    return (
        <div>
             <h2>Button 按钮</h2>
                <Button btnType="primary" onClick={() => handleClick()}>按钮 onClick</Button>
                <Button btnType="primary" loading onClick={() => handleClick()}>按钮 loading</Button>
                <Button btnType="danger">按钮</Button>
                <Button btnType="info">按钮</Button>
                <Button btnType="success">按钮</Button>
                <Button btnType="warning">按钮</Button>
                <Button btnType="warning" disabled>按钮 disabled </Button>
                <Button btnType="Link" href="//www.baidu.com">链接</Button>
                <Button btnType="Link" href="//www.baidu.com" disabled style={{ marginLeft: 10 }}>disabled链接</Button>
                <br />
                <Button size="small">按钮</Button>
                <Button size="middle">按钮</Button>
                <Button size="large">按钮</Button>
        </div>
    )
}
