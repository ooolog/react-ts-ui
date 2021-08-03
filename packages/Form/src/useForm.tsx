import React, { useRef, useState } from "react";

// IFormStoreProps
class FormStore  {
    forceRootRender?: any;
    callbacks: {
        onFinish?: any
    };
    store?: any
    fieldEntities?: any
    constructor(forceRootRender) {
        this.forceRootRender = forceRootRender;
        this.store = {};
        this.callbacks = Object.create(null);
        this.fieldEntities = []
    }
    registerField = (fieldEntiry) => {
        this.fieldEntities.push(fieldEntiry)
    }
    setCallbacks = (callbacks) => { //设置回调
        this.callbacks = callbacks
    }
    setFieldsValue = (newStore) => {
        this.store = {
            ...this.store,
            ...newStore
        }
    }
    setFieldValue = (name, value) => {
        this.store[name] = value
        return this.store
    }
    getFieldValue = (name) => {
        return this.store[name]
    }
    getFieldsValue = () => {
        return this.store
    }
    submit = () => {
        let { onFinish } = this.callbacks;
        if (onFinish) {
            onFinish(this.store)
        }
    }
    getForm = () => {
        return {
            setFieldsValue: this.setFieldsValue,
            setFieldValue: this.setFieldValue,
            getFieldsValue: this.getFieldsValue,
            registerField: this.registerField,
            setCallbacks: this.setCallbacks,
            getFieldValue: this.getFieldValue,
            submit: this.submit
        }
    }
}

/**
* @
* @desc: 自定义 hooks
* @author:  zhangyunajiang
* @creatDate 2021-05-09 15:53:34
* @param {Object} {}
* @return  {*}
*/
export default function useForm(form?: any) {
    let formRef: {
        current: any
    } = useRef()
    let [, fourCeUpdate] = useState({});
    if (!formRef.current) {
        if (form) {
            formRef.current = form;
        } else {
            const forceReRender = () => {
                fourCeUpdate({})
            }
            let formStore = new FormStore(forceReRender);
            let formInstance = formStore.getForm();
            formRef.current = formInstance;
        }
    }
    return formRef.current
}