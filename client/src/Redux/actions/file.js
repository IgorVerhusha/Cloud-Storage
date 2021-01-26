import axios from 'axios'
import {setFiles, addFile, deleteFileAction, setIsFetchingFiles} from "../fileReducer.js";
import {message} from "antd";
import {showUploader, addUploadFile, changeUploadFile} from "../uploadReducer.js";
import {API_URL} from "../../config.js";


export const getFiles = (dirId, sort) => {
    return async dispatch => {
        dispatch(setIsFetchingFiles(true))
        try {
            let url = `${API_URL}api/files`
            if(dirId){
                url = `${API_URL}api/files?parent=${dirId}`
            }
            if(sort){
                url = `${API_URL}api/files?sort=${sort}`
            }
            if(dirId && sort){
                url = `${API_URL}api/files?parent=${dirId}&sort=${sort}`
            }
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('tokenCloud')}`
                }
            })
            dispatch(setFiles(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }
        dispatch(setIsFetchingFiles(false))
    }
}


export const createDir = (dirId, name) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/files`, {
                name,
                parent: dirId,
                type: 'dir'
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('tokenCloud')}`
                }
            })
            dispatch(addFile(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export const uploadFile = (file, dirId) => {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            if (dirId) {
                formData.append('parent', dirId)
            }
            const uploadFile = {name: file.name, progress: 0, id: Date.now()}
            dispatch(showUploader(true))
            dispatch(addUploadFile(uploadFile))
            const response = await axios.post(`${API_URL}api/files/upload`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('tokenCloud')}`
                },
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    if (totalLength) {
                        uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        dispatch(changeUploadFile(uploadFile))
                    }
                }
            })
            dispatch(addFile(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export const downloadFile = async (file) => {
    const response = await fetch(`${API_URL}api/files/download?id=${file._id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('tokenCloud')}`
        }
    })
    if (response.status === 200) {
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        link.remove()
    }
}

export const deleteFile = (file) => {
    return async dispatch => {
        try {
            const response = await axios.delete(`${API_URL}api/files?id=${file._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('tokenCloud')}`
                }
            })
            dispatch(deleteFileAction(file._id))
            message.success(response?.data?.message);
        } catch (e) {
            message.error(e?.response?.data?.message);
        }
    }
}

export const searchFile = (search) => {
    return async dispatch => {
        try {
            dispatch(setIsFetchingFiles(true))
            const response = await axios.get(`${API_URL}api/files/search?search=${search}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('tokenCloud')}`
                }
            })
            dispatch(setFiles(response.data))
        } catch (e) {
            message.error(e?.response?.data?.message);
        } finally {
            dispatch(setIsFetchingFiles(false))
        }
    }
}