import React from 'react'
import { Menu} from 't-ui'
import { useDocumentTitle } from '../hook/list'
// , MenuItem, Submenu 

export default function DomMenu() {
    useDocumentTitle('Menu')
    const onSelect = (ev) => {
        console.log(ev, 'evg')
    }
    return (
        <div>
            <h2>横向菜单栏</h2><br></br>
            <Menu defaultIndex="2" onSelect={onSelect} >
                <Menu.Item >菜单一</Menu.Item>
                <Menu.Item disabled>菜单二</Menu.Item>
                <Menu.SubMenu title="deopdown">
                    <Menu.Item index="1-1">dropdown1</Menu.Item>
                    <Menu.Item index="1-2">dropdown2</Menu.Item>
                    <Menu.Item index="1-3">dropdown3</Menu.Item>
                </Menu.SubMenu>
                <Menu.Item >菜单三</Menu.Item>
                <Menu.Item >菜单四</Menu.Item>
            </Menu>
            <Menu defaultIndex="4" size="middle">
                <Menu.Item >菜单一</Menu.Item>
                <Menu.Item>菜单二</Menu.Item>
                <Menu.Item>菜单三</Menu.Item>
                <Menu.Item >菜单四</Menu.Item>
            </Menu>

            <Menu defaultIndex="1" size="large">
                <Menu.Item >菜单一</Menu.Item>
                <Menu.Item >菜单二</Menu.Item>
                <Menu.Item >菜单三</Menu.Item>
                <Menu.Item >菜单四</Menu.Item>
            </Menu>
            <h2>纵向菜单栏</h2><br></br>
            <div style={{ display: 'flex' }}>
                <Menu defaultIndex="0" model="vertical" style={{ width: 256 }}>
                    <Menu.Item >菜单一</Menu.Item>
                    <Menu.SubMenu title="deopdown">
                        <Menu.Item index="1-1">dropdown1</Menu.Item>
                        <Menu.Item index="1-2">dropdown2</Menu.Item>
                        <Menu.Item index="1-3">dropdown3</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item  >菜单二</Menu.Item>
                    <Menu.Item >菜单三</Menu.Item>
                    <Menu.Item >菜单四</Menu.Item>
                </Menu>
                <Menu defaultIndex="1" size="middle" model="vertical" style={{ width: 256, margin: '0 20px' }}>
                    <Menu.Item index="0">菜单一</Menu.Item>
                    <Menu.Item index="1" >菜单二</Menu.Item>
                    <Menu.Item index="2" disabled>菜单三</Menu.Item>
                    <Menu.Item index="3">菜单四</Menu.Item>
                </Menu>
                <Menu defaultIndex="3" size="large" model="vertical" style={{ width: 256 }}
                    axis="right"
                >
                    <Menu.Item index="0">菜单一</Menu.Item>
                    <Menu.Item index="1" >菜单二</Menu.Item>
                    <Menu.Item index="2" >菜单三</Menu.Item>
                    <Menu.Item index="3" disabled>菜单四</Menu.Item>
                </Menu>
            </div>

        </div>
    )
}
