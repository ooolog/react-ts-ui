import React, { ReactChild } from 'react';
import FieldContext from './FieldContext'
interface IProps {
    name?: string;
    children?: any
}
class Field extends React.Component<IProps>{
    static contextType = FieldContext;
    getControlled = (childProps) => {
        const {formInstance = {},initialValues = {}} = this.context
        let { getFieldValue, setFieldValue,setFieldsValue} = formInstance
        const { name } = this.props; 
        if(initialValues){
            setFieldsValue(initialValues)
        }
        return {
            ...childProps,
            value: getFieldValue(name),
            defaultValue: getFieldValue(name),
            onChange: event => {
                const _value =  event.target ?  event.target.value : event
                setFieldValue(name, _value)
            }
        }
    }
    render() {
        const { children } = this.props;
        return React.cloneElement(children, this.getControlled(children.props))
    }
}

export default Field;