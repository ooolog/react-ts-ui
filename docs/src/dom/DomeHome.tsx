import React from 'react'
import { useDocumentTitle } from '../hook/list'

export default function DomeHome() {
    useDocumentTitle('DomeHome')
    return (
        <div>
           <h2> t-ui 介绍</h2><br/>
           <p>是一款基于 React17.0+TypeScript+scss 开发的一款UI库</p><br/>
           <p style={{margin:'0px 0px 20px',color:'#F56C6C',fontSize:24}}>
               客官！ 您好 您需要的UI组件 小二正在拼命奔跑中 敬请期待...
            </p>
           <h3>引入样式 </h3><br/>
            <pre>
                <code>
                <h4> import "theme-thunk/src/index.scss";<br /></h4>
                </code>
            </pre>
            <pre>
                <code>
                <h4> import Button from 't-ui'</h4>
                </code>
            </pre>
        </div>
    )
}
