import React from 'react';
import {Input, Button, Form, Modal} from "antd";
import './registration.scss'
import 'antd/dist/antd.css';
import {IdcardTwoTone} from '@ant-design/icons';
import {registration} from "../../actions/user.js";

const layout = {
    wrapperCol: {
        span: 24,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 4,
        span: 16,
    },
};


const Registration = () => {

    const onFinish = (values) => {
        if (values.password !== values.repeatPassword) return Modal.error({
            title: 'Ошибка!',
            content: 'Пароли должны совпадать!',
        });
        registration(values.email, values.password)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div className="registration">
            <IdcardTwoTone style={{fontSize: 36}}/>
            <div className="registration__header">
                Регистрация
            </div>
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите ваш email!',
                        },
                    ]}
                >
                    <Input size='large' placeholder="Введите email"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйства, введите ваш пароль!',
                        },
                    ]}
                >
                    <Input.Password size='large' placeholder="Введите пароль"/>
                </Form.Item>
                <Form.Item
                    name="repeatPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйства, введите ваш пароль!',
                        },
                    ]}
                >
                    <Input.Password size='large' placeholder="Повторите пароль"/>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button size='large' type="primary" htmlType="submit">
                        Зарегистрироваться
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Registration;