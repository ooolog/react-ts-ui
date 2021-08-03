import React, {
    CSSProperties,
    PropsWithChildren,
    ReactNode,
    useMemo,
    useRef,
    useEffect
} from 'react'
import PropTypes from 'prop-types'
import { ISzie } from '@t-ui/types/types'
import { createPortal } from 'react-dom';
import { Button, Icon, Transition } from 't-ui';
import { useStopScroll } from '../../hooks';

export interface ModalType {
    //父组件用来控制状态
    visible: boolean;
    //容器位置
    container?: Element;
    //父组件用来显示状态的setState
    setState: React.Dispatch<React.SetStateAction<boolean>>;
    //弹窗窗标题
    title?: ReactNode;
    //是否有确认按钮
    confirm?: boolean;
    //改变确认按钮
    okText?: string;
    //改变取消按钮
    cancelText?: string;
    //点击确认确定回调 如果传了 需要自行处理关闭
    onOk?: () => void;
    //点击取消 如果传了 需要自行处理关闭
    onCancel?: () => void;
    //点确认或者取消都会走的回调
    callback?: (v: boolean) => void;
    //点击mask是否关闭模态框
    maskClose?: boolean;
    //是否有mask
    mask?: boolean;
    //定义宽度
    width?:string|number;
    //自定义模态框位置
    style?: CSSProperties;
    //是否有右上角关闭按钮
    closeButton?: boolean;
    //动画时间
    delay?: number;
    //额外类名
    className?: string;
    //是否停止滚动
    stopScroll?: boolean;
    //portralStyle
    portralStyle?: CSSProperties;
    //默认确认按钮大小
    btnSize?: ISzie;
    //portral的回调
    refCallback?: (res: HTMLDivElement) => void;
    //没点击确认于取消 直接关闭的回调
    closeCallback?: () => void;
    footer?: ReactNode

}
function Modal(props: PropsWithChildren<ModalType>) {
    const {
        visible,
        maskClose,
        closeButton,
        delay,
        mask,
        container,
        confirm,
        okText,
        style,
        cancelText,
        onOk,
        onCancel,
        callback,
        title,
        setState,
        className,
        stopScroll,
        portralStyle,
        btnSize,
        refCallback,
        closeCallback,
        width,
        footer
    } = props;
    const ref = useRef<HTMLDivElement>(null);
    let _style = {}
    if(width){
        _style = {
            width,
            ...style
        }
    }
    const render = useMemo(() => {
        return createPortal(
            <Transition
                nodeRef={ref}
                in={visible}
                timeout={delay!}
                classNames={`i-modal-animation`}
            >
                <div className={`i-modal-potral ${visible ? 'open' : ''} ${className ? className : ''}`}
                    ref={ref}
                    style={portralStyle}
                >
                    <div
                        className={`i-modal-viewport ${className ? className : ""}`}
                        style={_style}
                    >
                        <div className={`i-modal-title ${className ? className : ''} ${btnSize ? 'i-modal-size-' + btnSize : ''}`} style={{height:!title? 0:''}}>
                            {title ? <div className="header-title">{title}</div> : null}
                            {
                                closeButton && (
                                    <div className={`i-modal-closebtn  ${className ? className : ''} `} >
                                        <Icon icon="shanchu2" style={{ color: '#fff', background: '#ccc', 
                                        borderRadius: '325%', fontSize: 16 }}
                                            onClick={() => {
                                                setState(false);
                                                if (closeCallback) closeCallback();
                                            }}
                                        ></Icon>
                                    </div>
                                )
                            }
                        </div>
                        {props.children && (
                            <div
                                className={`i-modal-children 
                                ${className ? className : ""}`}>
                                {props.children}
                            </div>
                        )}
                        {
                           !footer && confirm && (
                                <div className={`i-modal-confirm ${className ? className : ''}  `}>
                                    
                                    <Button onClick={() => {
                                         console.log(35)
                                         if(onOk){
                                            onOk()
                                        } else {
                                            setState(false)
                                        }
                                        if (callback) callback(true);
                                    }}
                                        size={btnSize}
                                        
                                    >
                                        {
                                            okText ? okText : '确认'
                                        }
                                    </Button>
                                    <Button onClick={() => {
                                        if(onCancel){
                                            onCancel()
                                        } else {
                                            setState(false)
                                        }
                                        if (callback) callback(true);
                                    }}
                                        size={btnSize}
                                        btnType="info"
                                       
                                    >
                                        {
                                            cancelText ? cancelText : '取消'
                                        }
                                    </Button>
                                </div>
                            )
                        }
                        {
                            footer  && <div className={`i-modal-confirm ${className ? className : ''}  `} style={{padding: footer == true ? 0 :''}}>
                                {footer}
                            </div>
                        }
                    </div>
                    {
                        mask && (
                            <div className="i-modal-mask"
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
    }, [
        btnSize,
        callback,
        cancelText,
        className,
        closeButton,
        closeCallback,
        confirm,
        container,
        delay,
        mask,
        maskClose,
        okText,
        onCancel,
        onOk,
        portralStyle,
        props.children,
        setState,
        style,
        title,
        visible,
        width
    ])
    useStopScroll(visible!,300, stopScroll!);
    useEffect(()=>{
        if(refCallback && ref.current){
            refCallback(ref.current)
        }
    },[refCallback])
    return (visible && render)
}


Modal.defaultProps = {
    visible: false,
    container: window.document.body,
    confirm: true,
    title: 'title',
    maskClose: true,
    mask: true,
    closeButton: true,
    delay: 200,
    stopScroll: true,
    btnSize: "small",
    width: 0,
    // footer: null
};
export default Modal

