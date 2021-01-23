import React from 'react';
import "./fileList.scss"
import {useSelector} from "react-redux";
import File from "./File/File.jsx";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import Spinner from "../../Spinner/Spinner.jsx";

const FileList = () => {

    const files = useSelector(state => state.files.files)
    const isFetching = useSelector(state => state.files.isFetching)

    if (files.length===0){
        return <div className="file-list__empty">Файлы не найдены. <br/>Вы можете создать папку или добавить файл, нажав кнопку либо перетянуть его сюда.</div>

    }

    return (
        <div className="file-list">
            {isFetching ? <Spinner/> :<>
                <div className="file-list__header">
                    <div className="file-list__name">Название</div>
                    <div className="file-list__date">Дата</div>
                    <div className="file-list__size">Размер</div>
                </div>
                <TransitionGroup >
            {files.map(file =>
                <CSSTransition key={file._id} timeout={500} classNames={'file'} exit={false}>
                <File file={file}/>
                </CSSTransition>)}
                </TransitionGroup>
            </>
            }
        </div>
    );
}

export default FileList;