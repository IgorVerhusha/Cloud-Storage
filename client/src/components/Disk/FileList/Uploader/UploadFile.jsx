import React from 'react'
import {Progress} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {removeUploadFile} from "../../../../Redux/uploadReducer.js";

const UploadFile = ({file}) => {
    const dispatch = useDispatch()
    return (
        <div className="upload-file">
            <div className="upload-file__header">
                <div className="upload-file__name">{file.name}</div>
                <div className="close-button close-button_small" onClick={()=>dispatch(removeUploadFile(file.id))}><CloseOutlined /></div>
            </div>
            <Progress percent={file.progress} strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
            }}/>
        </div>
    );
};

export default UploadFile;