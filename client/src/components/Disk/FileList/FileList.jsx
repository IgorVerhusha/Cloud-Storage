import React from 'react';
import "./fileList.scss"
import {useSelector} from "react-redux";
import File from "./File/File.jsx";

const FileList = () => {

    const files = useSelector(state => state.files.files).map(file => <File key={file._id} file={file}/>)


    return (
        <div className="file-list">
            <div className="file-list__header">
                <div className="file-list__name">Название</div>
                <div className="file-list__date">Дата</div>
                <div className="file-list__size">Размер</div>
            </div>
            {files}
        </div>
    );
};

export default FileList;