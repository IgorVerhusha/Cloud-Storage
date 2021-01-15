import axios from 'axios'
import {setFiles, addFile} from "../fileReducer.js";

export const getFiles = (dirId) => {
    return async dispatch => {
        try {
const response = await axios.get(`http://localhost:5000/api/files${dirId ? '?parent='+dirId : ''}`, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('tokenCloud')}`
    }
})
            dispatch(setFiles(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}


export const createDir = (dirId, name) => {
    return async dispatch => {
        try {
            const response = await axios.post(`http://localhost:5000/api/files`,{
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