import React, { CSSProperties, FC, PropsWithChildren, ReactNode, useMemo, useRef } from 'react'
import classNames from 'classnames'
import { createPortal } from 'react-dom'
import { Transition } from 't-ui';
import { ISzie } from '@t-ui/types/types';
type IPlacement = 'left' | 'right' | 'top' | 'bottom'
interface IDawerProps {
    visible?: boolean
    mask?: boolean;
    //容器位置
    container?: Element;
    className?: string;
    title?: ReactNode;
    body?: ReactNode;
    delay?: number
    //点击mask是否关闭模态框
    maskClose?: boolean;
    //父组件用来显示状态的setState
    setState: React.Dispatch<React.SetStateAction<boolean>>;
    //portral的回调
    refCallback?: (res: HTMLDivElement) => void;
    //没点击确认于取消 直接关闭的回调
    closeCallback?: () => void;
    footer?: ReactNode;
    //定义宽度
    width?: string | number; //placement left right
    height?: string | number; //placement top bottom
    //自定义模态框位置
    style?: CSSProperties;
    placement?: IPlacement | string;
    //默认确认按钮大小
    btnSize?: ISzie;
}
const Drawer: FC<PropsWithChildren<IDawerProps>> = (props) => {
    const {
        visible,
        className,
        title,
        body,
        footer,
        container,
        delay,
        mask,
        maskClose,
        setState,
        closeCallback,
        style,
        width,
        placement,
        btnSize,
        height
    } = props
    let _style = {}
    if (width) {
        if (['top', 'bottom'].includes(placement)) {
            _style = {
                width: '100%',
                height: height,
                ...style
            }
        } else {
            _style = {
                width,
                height: '100%',
                ...style
            }
        }

    }
    const ref = useRef<HTMLDivElement>(null);
    const render = useMemo(() => {
        return createPortal(
            <Transition
                nodeRef={ref}
                in={visible}
                timeout={delay!}
                classNames={`i-drawer-animation`}
            >
                <div className={`i-drawer-potral ${visible ? 'open' : ''} ${className ? className : ''}`}
                    ref={ref}
                >
                    <div
                        className={`i-drawer-viewport ${className ? className : ""} i-drawer-viewport-${placement}`}
                        style={_style}
                    >
                        <div className={`i-drawer-title ${className ? className : ''} ${btnSize ? 'i-drawer-size-' + btnSize : ''}`} style={{ height: !title ? 0 : '' }}>
                            {title ? <div className="header-title">{title}</div> : null}
                        </div>
                        {props.children && (
                            <div
                                className={`i-drawer-children 
                                ${className ? className : ""}`}>
                                <div className={`i-drawer-body`}>
                                    {props.children}
                                </div>
                            </div>
                        )}
                        {
                            !footer &&
                            <div className={`i-drawer-footer`}>

                            </div>
                        }
                    </div>
                    {
                        mask && (
                            <div className="i-drawer-mask"
                                onClick={() => {
                                    if (maskClose) {
                                        setState(false);
                                        if (closeCallback) {
                                            closeCallback()
                                        }

                                    }
                                }}
                            ></div>
                        )
                    }
                </div>
            </Transition>,
            container!
        )
    }, [])
    return (visible && render)
}
Drawer.defaultProps = {
    visible: true,
    container: window.document.body,
    mask: true,
    maskClose: true,
    delay: 200,
    btnSize: "small",
    placement: 'right',
    width: '25%',
    height: '30%'
}
export default Drawer
