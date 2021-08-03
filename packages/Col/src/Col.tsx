import classNames from 'classnames'
import React from 'react'


interface IColProps {
    span?: string | number
    offset?: string | number
    children?: React.ReactNode
}
/**
* @
* @desc: Col栅格布局 需要搭配Row使用
* @author:  zhangyunajiang
* @creatDate 2021-05-08 00:35:55
* @param {Object} {}
* @return  {*}
*/
const Col: React.FC<IColProps> = (props) => {
    const { span, offset, children } = props;
    let ret:Array<string> = [];
    let pos = ['span','offset'] as const;
    pos.forEach(item=>{
        const _size = props[item];
        if((typeof _size == 'number' || typeof _size == 'string') && _size>0){
            ret.push(`i-col-${item}-${_size}`)
        }
    })
    const classe = classNames('i-col',...ret)
    return (
        <div className={classe}>
            {children}
        </div>
    )
}
Col.defaultProps = {
    span: 24,
    offset: 0,
}
export default Col;