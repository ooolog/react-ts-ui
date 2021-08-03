import React, { useState } from 'react'
import { Button, Drawer } from 't-ui'
import { useDocumentTitle } from '../hook/list'

export default function DomDrawer() {
    useDocumentTitle('Drawer')
    const [state, setState] = useState(false)
    const [placement, setplacement] = useState({
        placement:'left'
    })
  
    const strArr = ['left','top','right','bottom']
    function DrawerFn(str){
        console.log(str,'-str')
        setState(!state)
        setplacement({
            placement: str
        })
    }
    return (
        <div>
            {
                strArr.map((item,index)=>{
                    return(<React.Fragment key={index}>
                        <Button
                            onClick={()=> DrawerFn(item)}
                        >
                            基本使用 {item}
                        </Button>
                    </React.Fragment>)
                })
            }
            {
                state && <Drawer
                    title={
                        <div>标题</div>
                    }
                    setState={setState} visible={state}
                    {
                        ...placement
                    }
                   
                >

                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>
            }
            {/* <Button onClick={() => setState1(!state1)}>基本使用 left</Button>
            {
                state1 && <Drawer
                    title="标题"
                    setState={setState1} visible={state1}
                    placement="left"
                >

                    内容
                </Drawer>
            }
            <Button onClick={() => setState2(!state2)}>基本使用 top</Button>
            {
                state2 && <Drawer
                    title="标题"
                    setState={setState2} visible={state2}
                    placement="top"
                >

                    内容
                </Drawer>
            }
            <Button onClick={() => setState3(!state3)}>基本使用 bottom</Button>
            {
                state3 && <Drawer
                    title="标题"
                    setState={setState3} visible={state3}
                    placement="bottom"
                >

                    内容
                </Drawer>
            } */}
        </div>
    )
}
