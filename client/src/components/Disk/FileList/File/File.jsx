import React from 'react';
import "./file.scss"
import {FileTwoTone, FolderTwoTone, DownloadOutlined, DeleteTwoTone, ExclamationCircleOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {setCurrentDir, pushToStack, setCurrentDirName} from "../../../../Redux/fileReducer.js";
import {Tooltip, Modal} from "antd";
import {downloadFile, deleteFile} from "../../../../Redux/actions/file.js";
import sizeFormat from "../../../../utils/sizeFormat.js"
const { confirm } = Modal;
const File = ({file}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const currentDirName = useSelector(state => state.files.currentDirName)
    const filesView = useSelector(state => state.files.view)

    const openDirHandler = () => {
        if (file.type === 'dir') {
            dispatch(pushToStack({id:currentDir, name:currentDirName}))
            dispatch(setCurrentDirName(file.name))
            dispatch(setCurrentDir(file._id))
        }
    }

    const downloadClickHandler = (e) => {
        e.stopPropagation()
        downloadFile(file)
    }

    const deleteClickHandler = (e) => {
        e.stopPropagation()
        if (file.type === 'dir') {
            confirm({
                title: 'Вы действительно хотите удалить папку?',
                icon: <ExclamationCircleOutlined/>,
                content: 'Всё содержимое папки будет удалено.',
                cancelText: 'Отмена',
                okText: 'Удалить',
                okType: 'danger',
                onOk() {
                    dispatch(deleteFile(file))
                },
                onCancel() {
                },
            });
        } else {
            dispatch(deleteFile(file))
        }

    }

    if(filesView==='list'){
        return (
            <div className='file' onClick={() => openDirHandler()}>
                {file.type === 'dir' ?
                    <FolderTwoTone twoToneColor='#fa8c16'/> : <FileTwoTone twoToneColor='#08979c'/>
                }
                <div className="file__name">{file.name}</div>
                <div className={"file__btns"}>
                    <Tooltip placement="bottom" title={"Скачать файл"} color={"#389e0d"}>
                        {file.type !== 'dir' && <DownloadOutlined className={"file__download"} style={{color:"#389e0d"}}
                                                                  onClick={(e) => downloadClickHandler(e)}/>}
                    </Tooltip>
                    <Tooltip placement="bottom" title={"Удалить"} color={"#d4380d"}>
                        <DeleteTwoTone className={"file__delete"} twoToneColor="#d4380d" onClick={(e) => deleteClickHandler(e) }/>
                    </Tooltip>
                </div>
                <div className="file__date">{file.date.slice(0, 10)}</div>
                <div className="file__size">{file.type !== 'dir' && sizeFormat(file.size)}</div>
            </div>
        );
    }
    if(filesView==='plate'){
        return (
            <Tooltip placement="bottom" title={file.type === 'dir' ? `Дата: ${file.date.slice(0, 10)}`: `Размер: ${sizeFormat(file.size)} Дата: ${file.date.slice(0, 10)}`} >
            <div className='file-plate' onClick={() => openDirHandler()}>
                <div className="file-plate__icon">
                {file.type === 'dir' ?
                    <FolderTwoTone twoToneColor='#fa8c16'/> : <FileTwoTone twoToneColor='#08979c'/>
                }
                </div>
                <div className="file-plate__name">{file.name}</div>
                <div className={"file-plate__btns"}>
                    <Tooltip placement="right" title={"Удалить"} color={"#d4380d"}>
                        <DeleteTwoTone className={"file-plate__delete"} twoToneColor="#d4380d" onClick={(e) => deleteClickHandler(e) }/>
                    </Tooltip>
                    <Tooltip placement="right" title={"Скачать файл"} color={"#389e0d"}>
                        {file.type !== 'dir' && <DownloadOutlined className={"file-plate__download"} style={{color:"#389e0d"}}
                                                                  onClick={(e) => downloadClickHandler(e)}/>}
                    </Tooltip>

                </div>
            </div>
            </Tooltip>
        );
    }
};

export default File;