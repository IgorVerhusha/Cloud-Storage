import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles, uploadFile} from "../../Redux/actions/file.js";
import {LeftCircleTwoTone, FolderAddTwoTone, FileAddTwoTone} from '@ant-design/icons';
import {Tooltip} from "antd";
import "./disk.scss"
import FileList from "./FileList/FileList.jsx";
import Popup from "./Popup.jsx";
import {setPopupDisplay, setCurrentDir} from "../../Redux/fileReducer.js";

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const dirStack = useSelector(state => state.files.dirStack)
    const [dragEnter, setDragEnter] = useState(false)

    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [currentDir])

    const createDirHandler = () => {
        dispatch(setPopupDisplay(true))
    }

    const backClickHandler = () => {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }

    const fileUploadHandler = (event) => {
        const files = [...event.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }

    const dragEnterHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(true)
    }

    const dragLeaveHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(false)
    }

    const dropHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        let files = [...e.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false)
    }

    return (!dragEnter ?
            <div className="disk" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler}
                 onDragOver={dragEnterHandler}>
                <div className="disk__btns">
                    <Tooltip placement="bottom" title={"Назад"} color={"blue"}>
                        <LeftCircleTwoTone style={{cursor: 'pointer'}} onClick={() => backClickHandler()}/>
                    </Tooltip>
                    <Tooltip placement="bottom" title={"Создать новую папку"} color={"blue"}>
                        <FolderAddTwoTone style={{cursor: 'pointer', marginLeft: 30}}
                                          onClick={() => createDirHandler()}/>
                    </Tooltip>
                    <div className="disk__upload">
                        <Tooltip placement="bottom" title={"Загрузить файл"} color={"blue"}>
                            <label htmlFor="disk__upload-input" className="disk__upload-label">
                                <FileAddTwoTone style={{cursor: 'pointer'}}/></label>
                        </Tooltip>
                        <input onChange={(event) => fileUploadHandler(event)} type="file" id="disk__upload-input"
                               className="disk__upload-input"/>
                    </div>
                </div>
                <FileList/>
                <Popup/>
            </div>
            :
            <div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler}
                 onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                Перетащите файлы сюда
            </div>
    );
};

export default Disk;