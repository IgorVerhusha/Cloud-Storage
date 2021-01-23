import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles, uploadFile} from "../../Redux/actions/file.js";
import {LeftCircleTwoTone, FolderAddTwoTone, FileAddTwoTone, HomeOutlined } from '@ant-design/icons';
import {Tooltip, Select} from "antd";
import "./disk.scss"
import FileList from "./FileList/FileList.jsx";
import Popup from "./Popup.jsx";
import {setPopupDisplay, setCurrentDir, setCurrentDirName, breadCrumbHandlerAction} from "../../Redux/fileReducer.js";
import { Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
import Uploader from "./FileList/Uploader/Uploader.jsx";
const { Option } = Select;


const Disk = () => {

    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const currentDirName = useSelector(state => state.files.currentDirName)
    const dirStack = useSelector(state => state.files.dirStack)

    const [dragEnter, setDragEnter] = useState(false)
    const [sort, setSort] = useState('type')



    useEffect(() => {
        dispatch(getFiles(currentDir, sort))
    }, [currentDir, sort])

    const createDirHandler = () => {
        dispatch(setPopupDisplay(true))
    }

    const backClickHandler = () => {
        const backDir = dirStack.pop()
        dispatch(setCurrentDirName(backDir?.name))
        dispatch(setCurrentDir(backDir?.id))
    }
    const breadCrumbHandler = (item) => {
        dispatch(breadCrumbHandlerAction(dirStack.indexOf(item)))
        dispatch(setCurrentDirName(item.name))
        dispatch(setCurrentDir(item.id))
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


    return (
        !dragEnter ?
            <div className="disk" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler}
                 onDragOver={dragEnterHandler}>
                    <div className="disk__navigation">
                        <Tooltip placement="bottom" title={"Назад"} color={"blue"}>
                            {currentDir&&<LeftCircleTwoTone style={{cursor: 'pointer'}} onClick={() => backClickHandler()}/>}
                        </Tooltip>
                        <div className="disk__breadcrumb">
                        <Breadcrumb>
                            {dirStack.map((item,index)=><Breadcrumb.Item key={index} onClick={()=>breadCrumbHandler(item)}><a>{item.name? item.name : <HomeOutlined />}</a></Breadcrumb.Item>)}
                            <Breadcrumb.Item>{currentDirName}</Breadcrumb.Item>
                        </Breadcrumb>
                        </div>
                    </div>
                <div className="disk__btns">
                    <Tooltip placement="bottom" title={"Создать новую папку"} color={"blue"}>
                        <FolderAddTwoTone style={{cursor: 'pointer'}}
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
                    <div className="disk__select">
                        сортировать по:{" "}{" "}
                    <Select  defaultValue="type" value={sort} style={{ width: 120, fontSize: 18 }} onChange={(e)=>setSort(e)}>
                        <Option value="type">типу</Option>
                        <Option value="name">имени</Option>
                        <Option value="date">дате</Option>
                    </Select>
                    </div>
                </div>

                <FileList/>
                <Popup/>
                <Uploader/>
            </div>
            :
            <div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler}
                 onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                Перетащите файлы сюда
            </div>
    );
};

export default Disk;