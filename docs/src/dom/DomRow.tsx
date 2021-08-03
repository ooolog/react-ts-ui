import React from 'react'
import {  Row, Col } from 't-ui'
import { useDocumentTitle } from '../hook/list'
export default function DomRow() {
    useDocumentTitle('Row Col')
    return (
        <div>
            <h2>栅格布局</h2><br/>
            <Row gutter="5">
                <Col span="6">
                    <div style={{ background: '#f20' }}>12</div>
                </Col>
                <Col span="6"> <div style={{ background: '#f40' }}>222</div></Col>
                <Col span="6" offset="1"> <div style={{ background: '#f40' }}>333</div></Col>
                <Col span="6"> <div style={{ background: '#f50' }}>444</div></Col>
                <Col span="6"> <div style={{ background: '#f60' }}>555</div></Col>
                <Col span="6"> <div style={{ background: '#f70' }}>666</div></Col>
                <Col span="6"> <div style={{ background: '#f80' }}>777</div></Col>
                <Col span="6"> <div style={{ background: '#f90' }}>888</div></Col>
            </Row>
            <div style={{ margin: '20px 0px' }}>
                <Row gutter="5">
                    <Col span="8"> <div style={{ background: 'rgb(11, 122, 226)' }}>222</div></Col>
                    <Col span="8" > <div style={{ background: 'rgb(197, 142, 122)' }}>333</div></Col>
                    <Col span="8"> <div style={{ background: '#f50' }}>444</div></Col>
                    <Col span="8"> <div style={{ background: '#f50' }}>555</div></Col>
                </Row>
            </div>
            <Row gutter="5">
                <Col span="12"> <div style={{ background: 'rgb(11, 122, 226)' }}>222</div></Col>
                <Col span="12" > <div style={{ background: 'rgb(197, 142, 122)' }}>333</div></Col>
                <Col span="5"> <div style={{ background: '#f50' }}>444</div></Col>
            </Row>
        </div>
    )
}
