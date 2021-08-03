import React, { CSSProperties, useMemo, useState } from 'react';
import classnames from "classnames";
import { ISzie } from '@t-ui/types/types';
interface ICheckBoxProps {
    data: Array<string>;
    defaultIndexArr?: Array<number>
    callback?: (arr: Array<boolean>) => void;
    className?: string;
    disableIndex?: Array<number>;
    parentSetStateCallback?: (e: boolean[], index: number) => void;
    parentState?: Array<boolean>;
    text?: boolean;
    style?: CSSProperties;
    size?: ISzie;
}
const CheckBox: React.FC<ICheckBoxProps> = (props) => {
    const {
        defaultIndexArr,
        callback,
        data,
        className,
        disableIndex,
        parentSetStateCallback,
        parentState,
        style,
        size,
        text
    } = props;
    const disableRef = useMemo(() => {
        let arr = new Array(data.length).fill(false)
        if (disableIndex) {
            disableIndex.forEach((v) => (arr[v] = true))
        }
        return arr;
    }, [data.length, disableIndex])
    const initArr = useMemo(() => {
        let arr = new Array(data.length).fill(false);
        if (defaultIndexArr) {
            defaultIndexArr.forEach((v) => (arr[v] = true));
        }
        return arr;
    }, [data.length, defaultIndexArr]);
    const [state, setState] = useState<Array<boolean>>(initArr);
    const classes = classnames('i-checkbox i-checkbox-wrapper',{
       
    })
    return (
        <div className={classes} style={style}>
            {
                data.map((value, index) => {
                    const judgeStateIndex = parentState ? parentState[index] : state[index];
                    return (
                        <label
                            className={`checkbox-label  ${disableRef[index] ? "checkbox-disabled" : ""
                                } ${size ? `i-checkbox-${size}` : `
                                `}`}
                            key={index}
                        >
                            <input type="checkbox"
                                className={`checkbox-input  `}
                                checked={
                                    judgeStateIndex ? true : false
                                }
                                onChange = {()=>{
                                    if(parentState){
                                        if(parentSetStateCallback){
                                            parentSetStateCallback(parentState,index)
                                        }
                                        if(callback) callback(parentState);
                                    } else {
                                        if(!disableRef[index]){
                                            state[index] = !state[index];
                                            setState([...state]);
                                            if(callback) callback(state);

                                        }
                                    }
                                }}
                            ></input>
                            <span className={`checkbox-dot ${judgeStateIndex ? "checkbox-active" : ""
                                }`}></span>
                            {text ?
                                <span className={"checkbox-value"}>
                                    {value}
                                </span> : null}
                        </label>
                    )
                })
            }
        </div>
    );
}
CheckBox.defaultProps = {
    size: 'small'
}
export default CheckBox
