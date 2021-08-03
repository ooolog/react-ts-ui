import React, { useState } from 'react'
import { Button, Popconfirm } from 't-ui'
import { useDocumentTitle } from '../hook/list'

export default function DomPopconfirm() {
    useDocumentTitle('Popconfirm')
    const [state, setState] = useState(false)
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                        <div>
                            <Popconfirm
                                directions='LT'
                                wrapperNode={<Button>L44T</Button>}
                                content="ewrewrew"
                                title={false}
                                footer={true}
                                >
                            </Popconfirm>
                        </div>
                        <div>
                            <Popconfirm
                                directions='LEFT'
                                wrapperNode={<Button>LEFT</Button>}
                                title={'Are you sure to do this?'} >
                            </Popconfirm>
                        </div>
                        <div>
                            <Popconfirm
                                directions='LB'
                                wrapperNode={<Button>LB</Button>}
                                title={'Are you sure to do this?'} >
                            </Popconfirm>
                        </div>
                    </div>
                    <div>
                        <div style={{ height: '150px', width: '150px', display: 'flex', justifyContent: 'center' }}>
                            <Popconfirm
                                directions='TL'
                                wrapperNode={<Button>TL</Button>}
                                title={'Are you sure to do this?'} >
                            </Popconfirm>
                            <Popconfirm
                                wrapperNode={<Button>TOP</Button>}
                                title={'Are you sure to do this?'} >
                            </Popconfirm>
                            <Popconfirm
                                directions='TR'
                                wrapperNode={<Button>TR</Button>}
                                title={'Are you sure to do this?'} >
                            </Popconfirm>
                        </div>
                        <div>
                            <Popconfirm
                                directions='BL'
                                wrapperNode={<Button>BL</Button>}
                                title={'Are you sure to do this?'} >
                            </Popconfirm>
                            <Popconfirm
                                directions='BOTTOM'
                                wrapperNode={<Button>BOTTOM</Button>}
                                title={'Are you sure to do this?'} >
                            </Popconfirm>
                            <Popconfirm
                                directions='BR'
                                wrapperNode={<Button>BR</Button>}
                                title={'Are you sure to do this?'} >
                            </Popconfirm>
                        </div>
                    </div>
                    <div>
                        <div>
                            <Popconfirm
                                directions='RT'
                                wrapperNode={<Button>RT</Button>}
                                title={'Are you sure to do this?'} >
                            </Popconfirm>
                        </div>
                        <div>
                            <Popconfirm
                                directions='RIGHT'
                                wrapperNode={<Button>RIGHT</Button>}
                                title={'Are you sure to do this?'} >
                            </Popconfirm>
                        </div>
                        <div>
                            <Popconfirm
                                directions='RB'
                                wrapperNode={<Button>RB</Button>}
                                title={'Are you sure to do this?'} >
                            </Popconfirm>
                        </div>
                    </div>
                </div>
            </div>
            <Popconfirm
                wrapperNode={<Button onClick={() => setState(!state)}>父组件控制状态</Button>}
                title='balabalabalabala' visible={state} setState={setState}></Popconfirm>

            <div>
                <Popconfirm
                    click={false}
                    hover={true}
                    closeButton={false}
                    confirm={false}
                    wrapperNode={<Button>hover</Button>}
                    title='balabalabalabala' >
                    yehuozhili
            </Popconfirm>
            </div>
        </div>
    )
}
