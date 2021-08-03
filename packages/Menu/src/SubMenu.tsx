import React, { useContext, useState } from 'react'
import classNames from 'classnames';
import { MenuContext } from './Menu';
import { IMenuItemProps } from './MenuItem'
export interface ISubMentProps {
    index?: number;
    title: string;
    className?: string;
}
/**
* @desc: 子菜单
* @author:  zhangyunajiang
* @creatDate 2021-05-08 00:35:18
* @param {Object} {}
* @return  {*}
*/
const SubMenu: React.FC<ISubMentProps> = ({ index, title, className, children }) => {
    const context = useContext(MenuContext);
    // i-menu-open
    const [menuOpen, setMenuOpen] = useState(false)
    const classes = classNames('i-menu-item i-submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.model === 'vertical'
    })
    const handleCLick = (e: React.MouseEvent) => {
        setMenuOpen(!menuOpen)
    }
    let timer: any
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(() => {
            setMenuOpen(toggle)
        }, 300)
    }
    const clickEvents = context.model === 'vertical' ? {
        onClick: handleCLick
    } : {}
    const hoverEvents = context.model !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true)},
        onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false)}
    } : {}
    const renderChildren = () => {
        const subMenuClass = classNames('i-submenu', {
            'i-menu-open': menuOpen
        });
        const chidrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child as React.FunctionComponentElement<IMenuItemProps>;
            const { displayName = ''} = childElement.type
            if (displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
                })
            } else {
                console.error("Warning: Menu has a child which is not a MenuItem component")
            }
        })
        return (
            <ul className={subMenuClass}>
                {chidrenComponent}
            </ul>
        )
    }
    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className="i-submenu-title" 
            {...clickEvents}
            >
                {title}
            </div>
            {
                renderChildren()
            }
        </li>
    )
}
SubMenu.displayName = 'SubMenu'
export default SubMenu
