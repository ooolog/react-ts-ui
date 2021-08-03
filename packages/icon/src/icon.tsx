
import React from 'react'
import classNames from 'classnames'
import { ISzie } from '@t-ui/types/types'
interface IIconProps {
    classNmae?: string;
    style?: React.CSSProperties;
    icon?:string;
    szie?: ISzie;
    onClick?:()=>void
}
const Icon = (porps:IIconProps) => {
    let {
        classNmae,
        style,
        icon,
        szie,
        ...resProps
    } = porps
    let classe = classNames(`i-icon i-ui-icons i-icon-${icon} `,classNmae,{
        [`i-ui-icons-${szie}`]:szie
    })
    return (
        <>
            <i className={classe} style={style} {...resProps}></i>
        </>
    )
}
Icon.defaultProps ={
    icon: 'xiangqing'
}
export default  Icon