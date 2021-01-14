import React from 'react';
import "./file.scss"
import {FileTwoTone, FolderTwoTone} from '@ant-design/icons';

const File = ({file}) => {
    return (
        <div className='file'>
            {file.type === 'dir' ?
                <FolderTwoTone /> : <FileTwoTone />
            }
            <div className="file__name">{file.name}</div>
            <div className="file__date">{file.date.slice(0,10)}</div>
            <div className="file__size">{file.size}</div>
        </div>
    );
};

export default File;