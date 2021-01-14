import React from 'react';
import {Input, Button, Form, Modal} from "antd";
import './auth.scss'
import 'antd/dist/antd.css';
import {HomeTwoTone} from '@ant-design/icons';
import {registration} from "../../Redux/actions/user.js";
import {login} from "../../Redux/actions/user.js";
import {useDispatch} from "react-redux";

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

    const dispatch = useDispatch()

    const onFinish = (values) => {
        dispatch(login(values.email, values.password))
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div className="registration">
            <HomeTwoTone style={{fontSize: 36}}/>
            <div className="registration__header">
                Авторизация
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
                <Form.Item {...tailLayout}>
                    <Button size='large' type="primary" htmlType="submit">
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Registration;