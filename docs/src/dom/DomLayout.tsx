import React from 'react'
import { Layout } from 't-ui'
import { useDocumentTitle } from '../hook/list'
const { Header, Sider, Content, Footer } = Layout
export default function DomLayout() {
    useDocumentTitle('Layout')
    return (
        <div>
            <Layout style={{ height: 200 }}>
                <Header style={{ background: '#7dbcea', color: '#fff' }}>头部</Header>
                <Content style={{ background: 'rgba(16, 142, 233, 1)', color: '#fff' }}>内容</Content>
                <Footer style={{ background: '#7dbcea', color: '#fff' }}>页脚</Footer>
            </Layout>
            <Layout style={{ height: 200, margin: '20px 0' }}>
                <Header style={{ background: '#7dbcea', color: '#fff' }}>头部</Header>
                <Layout className="i-layout-has-sider">
                    <Sider style={{ width: 200, background: '#3ba0e9', height: "100%", color: '#fff' }}>菜单栏</Sider>
                    <Content style={{ background: 'rgba(16, 142, 233, 1)', color: '#fff' }}>内容</Content>
                </Layout>
                <Footer style={{ background: '#7dbcea', color: '#fff' }}>页脚</Footer>
            </Layout>

            <Layout style={{ height: 200, margin: '10px 0' }}>
                <Header style={{ background: '#7dbcea', color: '#fff' }}>头部</Header>
                <Layout className="i-layout-has-sider">
                    <Content style={{ background: 'rgba(16, 142, 233, 1)', color: '#fff' }}>内容</Content>
                    <Sider style={{ width: 200, background: '#3ba0e9', height: "100%", color: '#fff' }}>菜单栏</Sider>
                </Layout>
                <Footer style={{ background: '#7dbcea', color: '#fff' }}>页脚</Footer>
            </Layout>

            <Layout style={{ height: 200, margin: '20px 0' }} className="i-layout-has-sider">
                <Sider style={{ width: 200, background: '#3ba0e9', height: "100%", color: '#fff' }}>菜单栏</Sider>
                <Layout style={{ height: 200, }}>
                    <Header style={{ background: '#7dbcea', color: '#fff' }}>头部</Header>
                    <Content style={{ background: 'rgba(16, 142, 233, 1)', color: '#fff' }}>内容</Content>
                    <Footer style={{ background: '#7dbcea', color: '#fff' }}>页脚</Footer>
                </Layout>
            </Layout>
        </div>
    )
}
