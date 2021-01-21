import React from 'react';
import "./file.scss"
import {FileTwoTone, FolderTwoTone, SaveTwoTone, DeleteTwoTone} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {setCurrentDir, pushToStack} from "../../../../Redux/fileReducer.js";
import {Tooltip} from "antd";
import {downloadFile, deleteFile} from "../../../../Redux/actions/file.js";

const File = ({file}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)

    const openDirHandler = () => {
        if (file.type === 'dir') {
            dispatch(pushToStack(currentDir))
            dispatch(setCurrentDir(file._id))
        }
    }

    const downloadClickHandler = (e) => {
        e.stopPropagation()
        downloadFile(file)
    }

    const deleteClickHandler = (e) => {
        e.stopPropagation()
        dispatch(deleteFile(file))
    }
    return (
        <div className='file' onClick={() => openDirHandler()}>
            {file.type === 'dir' ?
                <FolderTwoTone/> : <FileTwoTone/>
            }
            <div className="file__name">{file.name}</div>
            <div className={"file__btn"}>
                <Tooltip placement="bottom" title={"Загрузить файл"} color={"#389e0d"}>
                    {file.type !== 'dir' && <SaveTwoTone className={"file__download"} twoToneColor="#389e0d"
                                                         onClick={(e) => downloadClickHandler(e)}/>}
                </Tooltip>
                <Tooltip placement="bottom" title={"Удалить"} color={"#d4380d"}>
                    <DeleteTwoTone className={"file__delete"} twoToneColor="#d4380d" onClick={(e) => deleteClickHandler(e) }/>
                </Tooltip>
            </div>
            <div className="file__date">{file.date.slice(0, 10)}</div>
            <div className="file__size">{file.size}</div>

        </div>
    );
};

export default File;