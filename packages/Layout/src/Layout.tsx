import React, { PropsWithChildren, CSSProperties, DOMAttributes } from 'react'
import classNames from 'classnames';
export interface LayoutItemProps extends DOMAttributes<HTMLDivElement> {
	/** 样式*/
	style?: CSSProperties;
	/** 类名*/
	className?: string;
}

export interface LayoutProps extends LayoutItemProps {
	/** 子元素是否横向排列 */
	row?: boolean;
}
interface Props {
	style?: CSSProperties,
	className?: string;
	children?: React.ReactNode
}
// function Layout(props: PropsWithChildren<LayoutProps>) {
// 	const { style, children, className } = props;
// 	let classe = classNames('i-layout', className)
// 	return (
// 		<section className={classe} style={style}>
// 			{children}
// 		</section>
// 	)
// }
/**
* @desc: 布局组件
* @author:  zhangyunajiang
* @creatDate 2021-05-08 00:33:36
* @param {Object} {}
* @return  {*}
*/
function Layout(props:Props){
	const { style, children, className } = props;
	let classe = classNames('i-layout', className)
	return (
		<section className={classe} style={style}>
			{children}
		</section>
	)
}
/**
* @desc: 头部布局
* @author:  zhangyunajiang
* @creatDate 2021-05-08 00:33:49
* @param {Object} {}
* @return  {*}
*/
const Header: React.FC<Props> = (props) => {
	const { style, className, children, ...restProps } = props;
	const classes = classNames("i-layout-header", className);
	return (
		<header className={classes} style={style} {...restProps}>
			{children}
		</header>
	)
}
/**
* @desc: 中间内容区域
* @author:  zhangyunajiang
* @creatDate 2021-05-08 00:33:59
* @param {Object} {}
* @return  {*}
*/
const Content: React.FC<Props> = (props) => {
	const { style, className, children, ...restProps } = props;
	const classes = classNames("i-layout-content", className);
	return (
		<main className={classes} style={style} {...restProps}>
			{children}
		</main>
	);
}
/**
* @desc: 左侧菜单栏
* @author:  zhangyunajiang
* @creatDate 2021-05-08 00:34:10
* @param {Object} {}
* @return  {*}
*/
const Sider: React.FC<Props> = (props) => {
	const { style, className, children, ...restProps } = props;
	const classes = classNames("i-layout-sider", className);
	return (
		<aside className={classes} style={style} {...restProps}>
			{children}
		</aside>
	);
}
/**
* @desc: 页脚
* @author:  zhangyunajiang
* @creatDate 2021-05-08 00:34:21
* @param {Object} {}
* @return  {*}
*/
const Footer: React.FC<Props> = (props) => {
	const { style, className, children, ...restProps } = props;
	const classes = classNames("i-layout-footer", className);
	return (
		<footer className={classes} style={style} {...restProps}>
			{children}
		</footer>
	);
}
Layout.Header = Header;
Layout.Content = Content;
Layout.Sider = Sider;
Layout.Footer = Footer;
export default Layout;
