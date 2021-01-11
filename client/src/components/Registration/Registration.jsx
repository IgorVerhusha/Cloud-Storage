import React from 'react';
import {Input} from "antd";
import {Button} from "antd";
import './registration.scss'
import 'antd/dist/antd.css';
import { IdcardTwoTone } from '@ant-design/icons';

const Registration = () => {
    return (
        <div className="registration">
            <IdcardTwoTone style={{fontSize: 36}}/>
            <div className="registration__header">
                Регистрация
            </div>
            <Input placeholder="Basic usage" style={{marginBottom: 24}}/>
            <Input placeholder="Basic usage" style={{marginBottom: 24}}/>
            <Input placeholder="Basic usage" style={{marginBottom: 24}}/>
            <Input.Password placeholder="input password" style={{marginBottom: 24}}/>
            <Button type="primary">Войти</Button>
        </div>
    );
};

export default Registration;