import React from 'react';
import "./file.scss"
import {FileTwoTone, FolderTwoTone} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {setCurrentDir, pushToStack} from "../../../../Redux/fileReducer.js";

const File = ({file}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)

    const openDirHandler = () => {
        dispatch(pushToStack(currentDir))
        dispatch(setCurrentDir(file._id))
    }


    return (
        <div className='file' onClick={file.type === 'dir' ? () => openDirHandler() : ''}>
            {file.type === 'dir' ?
                <FolderTwoTone/> : <FileTwoTone/>
            }
            <div className="file__name">{file.name}</div>
            <div className="file__date">{file.date.slice(0, 10)}</div>
            <div className="file__size">{file.size}</div>
        </div>
    );
};

export default File;