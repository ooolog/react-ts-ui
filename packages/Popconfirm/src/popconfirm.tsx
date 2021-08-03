import React, { CSSProperties, PropsWithChildren, ReactNode, useEffect, useRef, useState } from 'react'
import { Modal } from '@t-ui/Modal'
import { ModalType } from '@t-ui/Modal/src/Modal'
import { ISzie } from '@t-ui/types/types';
interface IPopconfirmProps extends Partial<ModalType> {
    /** 由于modal有children，所以使用wrapperNode来进行传递，被包裹的元素 */
    wrapperNode: ReactNode;
    /**显示包裹元素方位 */
    directions?: IPopDirections;
    //是否点击触发
    click?: boolean;
    hover?: boolean;
    content?: ReactNode
}

export type IPopDirections = | "TL"
    | "TOP"
    | "TR"
    | "LT"
    | "LEFT"
    | "LB"
    | "BL"
    | "BOTTOM"
    | "BR"
    | "RT"
    | "RIGHT"
    | "RB";
interface DefaultParameter {
    mask: boolean;
    className: string;
    stopScroll: false;
    btnSize: ISzie;
}
function switchPosition(
	sign: IPopDirections,
	modalrect: DOMRect,
	popconfirmrect: DOMRect,
	scroll: number
): CSSProperties {
	let triangle = 5; //小三角高度
	switch (sign) {
		case "TL":
			return {
				top: popconfirmrect.top + scroll - modalrect.height - triangle,
				left: popconfirmrect.left
			};
		case "TOP":
			return {
				top: popconfirmrect.top + scroll - modalrect.height - triangle,
				left: popconfirmrect.left - modalrect.width / 2 + popconfirmrect.width / 2
			};
		case "TR":
			return {
				top: popconfirmrect.top + scroll - modalrect.height - triangle,
				left: popconfirmrect.left - modalrect.width + popconfirmrect.width
			};
		case "LT":
			return {
				top: popconfirmrect.top + scroll,
				left: popconfirmrect.left - modalrect.width - triangle
			};
		case "LEFT":
			return {
				top: popconfirmrect.top + scroll + popconfirmrect.height / 2 - modalrect.height / 2,
				left: popconfirmrect.left - modalrect.width - triangle
			};
		case "LB":
			return {
				top: popconfirmrect.top + scroll + popconfirmrect.height - modalrect.height,
				left: popconfirmrect.left - modalrect.width - triangle
			};
		case "BL":
			return {
				top: popconfirmrect.top + scroll + popconfirmrect.height + triangle,
				left: popconfirmrect.left
			};
		case "BOTTOM":
			return {
				top: popconfirmrect.top + scroll + popconfirmrect.height + triangle,
				left: popconfirmrect.left + popconfirmrect.width / 2 - modalrect.width / 2
			};
		case "BR":
			return {
				top: popconfirmrect.top + scroll + popconfirmrect.height + triangle,
				left: popconfirmrect.left + popconfirmrect.width - modalrect.width
			};
		case "RT":
			return {
				top: popconfirmrect.top + scroll,
				left: popconfirmrect.left + popconfirmrect.width + triangle
			};
		case "RIGHT":
			return {
				top: popconfirmrect.top + scroll + popconfirmrect.height / 2 - modalrect.height / 2,
				left: popconfirmrect.left + popconfirmrect.width + triangle
			};
		case "RB":
			return {
				top: popconfirmrect.top + scroll + popconfirmrect.height - modalrect.height,
				left: popconfirmrect.left + popconfirmrect.width + triangle
			};
		default:
			console.error("you may pass error directions" + sign);
			return {};
	}
}
function Popconfirm(props: PropsWithChildren<IPopconfirmProps>) {
    const { wrapperNode, directions, visible, setState, click, hover,content, ...restprops } = props;
    const defaultPropsConfirmParameter: DefaultParameter = {
        mask: false,
        className: `i-popconfirm popconfirm-${directions}`,
        stopScroll: false,
        btnSize: 'small'
    }

    const mergeOption = {
        ...defaultPropsConfirmParameter,
        ...restprops
    }
    const [style, setStyle] = useState<CSSProperties>({});
    const [modalRef, setModalRef] = useState<HTMLDivElement>();
    const [innerstate, setInnerState] = useState(false)
    const ref = useRef<HTMLDivElement>(null);
    const refcallback = (ref: HTMLDivElement) => {
        setModalRef(ref)
    }
    useEffect(() => {
        if(ref.current && modalRef){
            const scroll = document.documentElement.scrollTop + document.body.scrollTop;
            let res = switchPosition(
                directions!,
				modalRef.getBoundingClientRect(),
				ref.current.getBoundingClientRect(),
				scroll
            )
            setStyle(res)
        }
    }, [directions,modalRef])
    return (
        <div className="i-popconfirm-wrapper"
            ref={ref}
            onClick={click ? () => setInnerState(!innerstate) : undefined}
            onMouseEnter={hover ? () => setInnerState(true) : undefined}
            onMouseLeave={hover ? () => setInnerState(false) : undefined}
        >
            {wrapperNode}
            <Modal
                visible={setState ? visible : innerstate}
                setState={setState ? setState : setInnerState}
                {...mergeOption}
                portralStyle={style}
                refCallback={refcallback}
            >
                {content && content}
            </Modal>
        </div>
    )
}

Popconfirm.defaultProps = {
    directions: "TOP",
    click: true,
    hover: false,
    content: 'Popconfirm Content'
}
export default Popconfirm
