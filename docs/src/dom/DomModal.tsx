import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 't-ui'
import { delay } from '../../../packages/util/src/util'
import { useDocumentTitle } from '../hook/list'

function DomModal(props) {
  useDocumentTitle('Modal')
  const [state, setState] = useState(false)
  const [state1, setState1] = useState(false)
  const [state2, setState2] = useState(false)
  const [state3, setState3] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)
  return (
    <div>
       <Button onClick={() => setState(!state)}
      >基本使用</Button> 
     {
      state &&  <Modal setState={setState} visible={state} >
      <p>balabalabala</p>
      <p>balabalabalalalalallaa</p>
    </Modal>
    }
     
      <div>
        {
          state1 &&  <Modal setState={setState1} visible={state1} maskClose={false} 
          title="34"
          
          callback={(v) => console.log(v)}>
          <p>balabalabala</p>
          <p>balabalabalalalalallaa</p>
        </Modal>
        }
       
        <Button onClick={() => setState1(!state1)}>点击mask不关闭</Button>
      </div>
      <div> 
        {
          state2 && <Modal setState={setState2} visible={state2} okText='ok' cancelText='cancel' title="标题一">
          <p>balabalabala</p>
          <p>balabalabalalalalallaa</p>
        </Modal>
        }
        
        <Button onClick={() => setState2(!state2)}>改变confirm按钮文本</Button>
      </div>
      <div>
        {
          <Modal setState={setState3} visible={state3} confirm={false} title="标题二" footer={
            <>
                <Button btnType={"primary"} loading={loading} onClick={async ()=>{
                  setLoading(!loading);
                  const d = await delay({interval:3000})
                  if(d){
                    setState3(false)
                    setLoading(false)
                  }
                }}>自定义ok</Button>
                <Button btnType='info' 
                loading={loading1} 
                onClick={async ()=>{
                  setLoading1(!loading1)
                  const d = await delay({interval:3000})
                  if(d){
                    setState3(false)
                    setLoading1(false)
                  }
                }}>自定义取消</Button>
            </>
          } >
            <p>balabalabala</p>
            <p>balabalabalalalalallaa</p>
            
          </Modal>
        }
        
        <Button onClick={() => setState3(!state3)}>自定义按钮</Button>
      </div>
    </div>
  )
}

export default DomModal

