// import Field from '@t-ui/Form/src/Field'
import React from 'react'
import { Button, Form, Input, Field, MaxMinInput } from 't-ui'
import { useDocumentTitle } from '../hook/list'
export default function DomForm() {
    useDocumentTitle('Form')
    const onReset = function () {
    }
    return (
        <div>
            <Form
                initialValues={{
                    username: '333', password: '123', username1: '',
                    text: '', maxmin: [55, 678]
                }}
                onFinish={values => {
                    console.log('完成:', values);
                }}
            >
                <Field name="username">
                    <Input label="用户名" placeholder="用户名" />
                </Field>
                <Field name="password">
                    <Input.Password label="密码" placeholder="密码" />
                </Field>
                <Field name="username1">
                    <Input label="用户名1" placeholder="用户名1" />
                </Field>
                <Field name="maxmin">
                    <MaxMinInput label="输入范围" maxStr="最大值" minStr="最小值" style={{ display: 'inline-flex' }} />
                </Field>

                <Field name="text">
                    <Input.TextArea label="富文本" placeholder="富文本" />
                </Field>
                <Button type="submit">提交</Button>
                <Button type="button" btnType="info">重置</Button>
            </Form>
        </div>
    )
}
