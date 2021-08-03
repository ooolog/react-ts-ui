import React from 'react'
import FieldContext from './FieldContext';
import  useForm from './useForm';

/**
* @desc: 定义form所需的类型
* @author:  zhangyunajiang
* @creatDate 2021-05-10 21:38:51
* @param {Object} {}
* @return  {*}
*/
interface IFormProps {
    initialValues?: object;
    onFinish?: (e: React.FormEvent) => void;
    children?: React.ReactNode
}
const Form: React.FC<IFormProps> = ({ initialValues, onFinish, children }) => {
    const formInstance = useForm();
    formInstance.setCallbacks({
        onFinish
    })
    let initProps = {
        formInstance,
        initialValues
    }
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                formInstance.submit()
            }}
        >
            <FieldContext.Provider value={initProps}>
                {children}
            </FieldContext.Provider>
        </form>
    )
}
export default Form;
