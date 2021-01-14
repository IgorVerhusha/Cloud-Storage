import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles} from "../../Redux/actions/file.js";
import {LeftCircleTwoTone, FolderAddTwoTone} from '@ant-design/icons';
import {Tooltip} from "antd";
import "./disk.scss"
import FileList from "./FileList/FileList.jsx";

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)

    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [currentDir])

    return (
        <div className="disk">
            <div className="disk__btns">
                <Tooltip placement="bottom" title={"Назад"} color={"blue"}>
                <LeftCircleTwoTone  style={{ cursor: 'pointer'}} />
                </Tooltip>
                <Tooltip placement="bottom" title={"Создать папку"} color={"blue"}>
                <FolderAddTwoTone style={{ cursor: 'pointer', marginLeft: 30}}/>
                </Tooltip>
            </div>
            <FileList/>
        </div>
    );
};

export default Disk;