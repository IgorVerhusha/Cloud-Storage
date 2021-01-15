import React,{useState} from 'react';
import {Modal, Input} from "antd";
import {useSelector, useDispatch} from "react-redux";
import {setPopupDisplay} from "../../Redux/fileReducer.js";
import {createDir} from "../../Redux/actions/file.js";

const Popup = () => {

    const [dirName, setDirName] = useState("")
    const popupDisplay = useSelector(state=>state.files.popupDisplay)
    const currentDir = useSelector(state => state.files.currentDir)
    const dispatch = useDispatch()
    const handleOk = () => {
        dispatch(createDir(currentDir, dirName))
        setDirName("")
        dispatch(setPopupDisplay(false))
    };

    const handleCancel = () => {
        dispatch(setPopupDisplay(false))
        setDirName("")
    };

    return (
        <>
            <Modal title="Создать новую папку" visible={popupDisplay} onOk={handleOk} onCancel={handleCancel} cancelText={"Отмена"} okText={"Создать папку"}>
                <Input placeholder={"Введите название папки..."} value={dirName} onChange={(e)=>setDirName(e.target.value)}/>
            </Modal>
        </>
    );
};

export default Popup;