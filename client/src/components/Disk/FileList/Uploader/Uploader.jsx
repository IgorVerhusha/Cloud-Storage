import React from 'react';
import UploadFile from "./UploadFile.jsx";
import "./uploader.scss"
import { Button, notification } from 'antd';
import {CloseOutlined } from '@ant-design/icons';
import {useSelector, useDispatch} from "react-redux";
import {showUploader} from "../../../../Redux/uploadReducer.js";

const Uploader = () => {
    const dispatch = useDispatch()
    const files = useSelector(state=> state.upload.files)
    const isVisible = useSelector(state => state.upload.isVisible)

    return (isVisible &&
        <div className="uploader">
        <div className="uploader__header">
            <div className="uploader__title">
                Загрузки
            </div>
            <div className="close-button" onClick={()=>dispatch(showUploader(!isVisible))}><CloseOutlined /></div>
        </div>
        {files.map((item)=><UploadFile key={item.id} file={item}/>)}
    </div>
    );
};

export default Uploader;