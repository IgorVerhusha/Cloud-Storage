import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles} from "../../Redux/actions/file.js";
import {LeftCircleTwoTone, FolderAddTwoTone} from '@ant-design/icons';
import {Tooltip} from "antd";
import "./disk.scss"
import FileList from "./FileList/FileList.jsx";
import Popup from "./Popup.jsx";
import {setPopupDisplay, setCurrentDir} from "../../Redux/fileReducer.js";

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const dirStack = useSelector(state => state.files.dirStack)

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

    console.log(dirStack)

    return (
        <div className="disk">
            <div className="disk__btns">
                 <Tooltip placement="bottom" title={"Назад"} color={"blue"}>
                    <LeftCircleTwoTone style={{cursor: 'pointer'}} onClick={() => backClickHandler()}/>
                </Tooltip>
                <Tooltip placement="bottom" title={"Создать новую папку"} color={"blue"}>
                    <FolderAddTwoTone style={{cursor: 'pointer', marginLeft: 30}} onClick={() => createDirHandler()}/>
                </Tooltip>
            </div>
            <FileList/>
            <Popup/>
        </div>
    );
};

export default Disk;