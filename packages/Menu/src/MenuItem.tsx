import React, { useContext } from 'react'
import classNames from 'classnames';
import { MenuContext } from './Menu';

export interface IMenuItemProps {
    index?: number | string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
/**
* @desc: 菜单栏 的下拉菜单
* @author:  zhangyunajiang
* @creatDate 2021-05-08 00:35:03
* @param {Object} {}
* @return  {*}
*/
const MenuItem: React.FC<IMenuItemProps> = (props) => {
    const {
        index, disabled, className, children
    } = props;
    const context = useContext(MenuContext);
    // back?: string;
    // backActive?: string;
    // color?: string;
    // colorActive?: string;
    const classes = classNames('i-menu-item', className, {
        'is-disabled': disabled,
        'is-menu-active':context.index === index,
    });
    // let _style = {};
    // if(context.back){
    //     _style={
    //         background:context.back||'',
    //         color:context.color||''
    //     }
    // }
    // if(context.backActive){
    //     _style={
    //         background:context.backActive||'',
    //         color:context.colorActive||''
    //     }
    // }
    const handleClick = () =>{
        if(context.onSelect && !disabled){
            context.onSelect(index)
        }
    }
    return (
        <li className={classes} onClick={handleClick} >
            {children}
        </li>
    )
}
MenuItem.displayName = 'MenuItem'
MenuItem.defaultProps = {
    disabled: false,
   
}
export default MenuItem
