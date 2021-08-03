import React from 'react'
import { Button, Message } from 't-ui'
import { useDocumentTitle } from '../hook/list'

export default function DomMessage() {
    useDocumentTitle('Message')
    const messageHadel = (type) => {
        console.log(type, '=type')
        const methods = {
            info() {
                return Message({
                    type: 'info',
                    content: 'info'
                })
            },
            error() {
                Message({
                    type: 'error'
                })
            },
            success() {
                Message({
                    type: 'success'
                })
            },
            warning() {
                Message({
                    type: 'warning'
                })
            },
            show() {
                Message({
                    type: 'info',
                    content: '显示关闭按钮',
                    showClose: true
                })
            },
            hidel() {
                Message({
                    type: 'info',
                    content: '不显示关闭按钮',
                    showClose: false
                })
            },
            loading() {
                Message({
                    type: 'loading',
                    content: 'loading提示,需要手动关闭',
                    showClose: true
                })
            },
            showLoading() {
                Message({
                    type: 'loading',
                    content: '创建一个loading',
                    showClose: false
                })
            },
            closeAll() {
                console.log('closeAll')
                Message({
                    closeAll: true
                })
            },
            left() {
                Message({
                    type: 'info',
                    position: 'left',
                    content: 'left'
                })
            },
            center() {
                Message({
                    type: 'info',
                    position: 'center',
                    content: 'center'
                })
            },
            right() {
                Message({
                    type: 'info',
                    position: 'right',
                    content: 'right'
                })
            },
            alone() {
                Message({
                    type: 'info',
                    right: true
                })
            }
        }
        return methods[type]()
    }
    return (
        <div>
             <h2>message提示</h2>
            <div>
                    <Button btnType='info' onClick={() => messageHadel("info")}>info提示</Button>
                    <Button btnType='danger' onClick={() => messageHadel("error")}>error提示</Button>
                    <Button btnType='success' onClick={() => messageHadel("success")}> success提示</Button >
                    <Button btnType='warning' onClick={() => messageHadel("warning")} > warning提示</Button >
                    <Button btnType="primary" > loading提示, 需要手动关闭</Button >
                </div >
                <div  >
                    <Button onClick={() => messageHadel("show")}>显示关闭按钮</Button>
                    <Button onClick={() => messageHadel("hidel")}> 不显示关闭按钮</Button >
                    <Button onClick={() => messageHadel("closeAll")}> 立即关闭全部</Button >
                    <Button onClick={() => messageHadel("showLoading")}> 创建一个loading</Button >
                </div >
                <div >
                    <Button data-position="left" onClick={() => messageHadel("left")}>左边显示</Button>
                    <Button data-position="center" onClick={() => messageHadel("center")}> 中间显示</Button >
                    <Button data-position="right" onClick={() => messageHadel("right")}> 右边显示</Button >
                    <Button onClick={() => messageHadel("alone")}> 单独的右边</Button >
                </div >
        </div>
    )
}
