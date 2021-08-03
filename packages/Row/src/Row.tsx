import React from 'react'
import classNames from 'classnames';
interface IRowProps {
    gutter?: string | number,
    children?:React.ReactNode
}
/**
* @desc: row 布局组件
* @author:  zhangyunajiang
* @creatDate 2021-05-08 00:35:35
* @param {Object} {}
* @return  {*}
*/
const Row: React.FC<IRowProps> = (props) => {
    const { gutter,children } = props;
    let styleObj:any = {};
    if (gutter > 0) {
        styleObj['marginLeft'] = -gutter / 2 + 'px'
        styleObj['marginRight'] = -gutter / 2 + 'px'
    }
    const classe = classNames('i-row')
    return (
        <div style={styleObj} className={classe}>
            {children}
        </div>
    )
}

Row.defaultProps = {
    gutter: 0
}
export default Row;