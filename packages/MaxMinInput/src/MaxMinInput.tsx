import React, { ChangeEvent, useState } from 'react'
import { Icon, Input, Message } from 't-ui'
import { ISzie } from '@t-ui/types/types';
import classNames from 'classnames';
type ITypedefaultVal = string | number | string[] | number[]
interface IMaxMinInputProps {
  value?: [];
  defaultValue?: ITypedefaultVal; //默认值
  disabled?: boolean; //禁用
  size?: ISzie;
  label?: string;
  onChange?: (e: ChangeEvent<HTMLElement> | ITypedefaultVal) => void;
  callback?: (e: ChangeEvent<HTMLElement>) => void;
  refcallback?: (e: any) => void;
  setValueCallback?: (v: string) => void;
  style?: React.CSSProperties;
  height?: string; //组件高度
  width?: string | number;
  className?: string,
  minStr?: string
  maxStr?: string
}
function MaxMinInput(props: IMaxMinInputProps) {
  const {
    disabled,
    style,
    callback,
    defaultValue,
    refcallback,
    setValueCallback,
    value,
    height,
    className,
    size,
    label,
    minStr,
    maxStr,
    onChange,
    width,
  } = props;
  const [minValue, setMaxMinValue] = useState(defaultValue);
  const calsess = classNames('i-maxmin-input',className, {
    [`i-maxmin-input-${size}`]: size,
    [`i-maxmin-input-disabled`]: disabled,
  })
  return (
      <div className={calsess} style={style}>
        {label && <label style={{ margin: '0 5px', fontSize: 14 }}>{label}</label>}
        <Input defaultValue={minValue[0] || ''}
          placeholder={minStr}
          onChange={(e: any) => {
            const _evValue = e.target ? e.target.value : e
            const _minmaxArr = [Number(_evValue) || 0, Number(minValue[1]) || 0]
            setMaxMinValue(_minmaxArr)
            setTimeout(() => {
              onChange && onChange(_minmaxArr)
            },400)
            if (Number(minValue[1]) && Number(_evValue) > Number(minValue[1])) {
              return Message({
                type: 'info',
                content: '最大值不能小于最小值',
                timeout: 1000
              })
            }

          }}
          style={{ width }}
          className="min-input"
          size={size}
          disabled={disabled}
          value={minValue[0]}
          type="number"
          
        />
        <span className={`i-maxmin-span i-maxmin-span-${size}`}>～</span>
        <Input defaultValue={minValue[1] || ''}
          placeholder={maxStr}
          callback={(e: any) => {
            const _evValue = e.target ? e.target.value : e;
            const _minmaxArr = [Number(minValue[0]) || 0, Number(_evValue) || 0]
            setMaxMinValue(_minmaxArr)
            // setMaxMinValue([5, Number(_evValue) || 0])
            setTimeout(() => {
              onChange && onChange(_minmaxArr)
            },400)
            if (Number(minValue[0]) > Number(_evValue)) {
              return Message({
                type: 'info',
                content: '最大值不能小于最小值',
                timeout: 1000
              })
            }

          }}
          value={minValue[1]}
          style={{ width }}
          className="max-input"
          size={size}
          disabled={disabled}
          type="number"
        />
        {/* <Icon icon="cuo1" onClick={()=>{
        const _minValue = [];
        setMaxMinValue(_minValue)
        onChange && onChange(_minValue)
      }}></Icon> */}
      </div>
  )
}
MaxMinInput.defaultProps = {
  minStr: '最小值',
  maxStr: '最大值',
  width: 100,
  disabled: false, //默认不禁用
  size: 'small', //默认大小
  defaultValue: []
}
// minStr?: string
// maxStr?: string
export default MaxMinInput
