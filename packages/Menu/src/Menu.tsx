import React, { createContext, useState } from 'react'
import classNames from 'classnames';
import { IMenuMode, ISzie } from '@t-ui/types/types';
import { IMenuItemProps } from './MenuItem'
type ISelectCallbak = (selectIndex: number | string) => void;
export interface IMenuProps {
    defaultIndex?: number | string;
    className?: string;
    model?: IMenuMode;
    style?: React.CSSProperties;
    onSelect?: ISelectCallbak;
    children?: React.ReactNode;
    size?: ISzie;
    axis?: string; //坐标方向 默认坐标  'left',right
    back?: string;
    backActive?: string;
    color?: string;
    colorActive?: string;
}
interface ImenuContext {
    index?: string | number;
    onSelect?: ISelectCallbak;
    model?: IMenuMode;
    back?: string;
    backActive?: string;
    color?: string;
    colorActive?: string;
}

export const MenuContext = createContext<ImenuContext>({ index: '0' })
/**
* @desc: 菜单栏组件
* @author:  zhangyunajiang
* @creatDate 2021-05-08 00:34:50
* @param {Object} {}
* @return  {*}
*/
const Menu: React.FC<IMenuProps> = (props) => {
    const {
        defaultIndex,
        className,
        model,
        style,
        onSelect,
        children,
        size,
        axis,
        back,
        backActive,
        color,
        colorActive,
    } = props;
    const [currActive, setCurrActive] = useState(defaultIndex);

    const classe = classNames('i-menu', className, {
        'i-menu-vertical': model === 'vertical',
        [`i-menu-${size}`]: size,
        [`i-menu-${axis}`]: axis,
    })
    const handleCLick = (index: number | string) => {
        setCurrActive(index)
        if (onSelect) {
            onSelect(index)
        }
    }
    const propsContext: ImenuContext = {
        index: currActive ? currActive : '0',
        onSelect: handleCLick,
        model,
        back,
        backActive,
        color,
        colorActive,
    }

    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<IMenuItemProps>
            const { displayName = ''} = childElement.type
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: index.toString()
                })
            } else {
                console.error("Warning: Menu has a child which is not a MenuItem component")
            }
        })
    }
    return (
        <ul className={classe} style={style}>
            <MenuContext.Provider value={propsContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '0',
    model: 'horizontal',
    size: 'small', //默认大小 
    axis: 'left'
}
export default Menu

