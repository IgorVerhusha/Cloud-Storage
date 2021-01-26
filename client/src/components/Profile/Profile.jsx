import React from 'react';
import {Tooltip, Avatar} from "antd";
import {FileAddTwoTone, DeleteTwoTone, UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {deleteAvatar, uploadAvatar} from "../../Redux/actions/user.js";
import {API_URL} from "../../config.js";
import "./profile.scss"
import sizeFormat from "../../utils/sizeFormat.js";

const Profile = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    const changeAvatarHandler = (e) => {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }

    return (
        <div className="profile">
            <Avatar shape="square" size={132}
                    icon={currentUser.avatar ? <img src={API_URL + currentUser.avatar}/> : <UserOutlined/>}/>
            <div className="profile__avatar-btns">
                <Tooltip placement="right" title={"Удалить аватар"} color={"#d4380d"}>
                    <DeleteTwoTone className={"profile__delete"} twoToneColor="#d4380d"
                                   onClick={() => dispatch(deleteAvatar())}/>
                </Tooltip>
                <Tooltip placement="right" title={"Загрузить аватар"} color={"blue"}>
                    <label htmlFor="profile__upload-avatar">
                        <FileAddTwoTone style={{cursor: 'pointer'}}/></label>
                </Tooltip>
                <input accept="image/*" onChange={(event) => changeAvatarHandler(event)} type="file"
                       id="profile__upload-avatar" className="profile__upload-input"
                />
            </div>
            <div>email: {currentUser.email}</div>
            <div>место на диске всего: {sizeFormat(currentUser.diskSpace)}</div>
            <div>занято: {sizeFormat(currentUser.usedSpace)}</div>
            <div>осталось: {sizeFormat(currentUser.diskSpace - currentUser.usedSpace)}</div>
        </div>
    );
}

export default Profile