import axios from 'axios'
import {setUser, setIsFetching, logout} from "../userReducer.js";
import {API_URL} from "../../config.js";

export const registration = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/auth/registration`, {
                email,
                password
            })
            alert(response.data.message)
            dispatch(login(email, password))
        } catch (e) {
            alert(e.response?.data.message)
        }
    }
}
export const login = (email, password) => {
    return async dispatch => {
        dispatch(setIsFetching(true))
        try {
            const response = await axios.post(`${API_URL}api/auth/login`, {
                email,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('tokenCloud', response.data.token)
        } catch (e) {
            alert(e.response?.data.message)
        }
        dispatch(setIsFetching(false))
    }
}

export const auth = () => {
    return async dispatch => {
        dispatch(setIsFetching(true))
        try {
            const response = await axios.get(`${API_URL}api/auth/auth`,
                {headers: {Authorization: `Bearer ${localStorage.getItem('tokenCloud')}`}})
            dispatch(setUser(response.data.user))
            localStorage.setItem('tokenCloud', response.data.token)
        } catch (e) {
            localStorage.removeItem('tokenCloud')
            dispatch(logout())
        }
        dispatch(setIsFetching(false))
    }
}

export const uploadAvatar = (file) => {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const response = await axios.post(`${API_URL}api/files/avatar`, formData,
                {headers: {Authorization: `Bearer ${localStorage.getItem('tokenCloud')}`}})
            dispatch(setUser(response.data))
        } catch (e) {
            console.log(e)
        }
        dispatch(setIsFetching(false))
    }
}

export const deleteAvatar = (file) => {
    return async dispatch => {
        try {
            const response = await axios.delete(`${API_URL}api/files/avatar`,
                {headers: {Authorization: `Bearer ${localStorage.getItem('tokenCloud')}`}})
            dispatch(setUser(response.data))
        } catch (e) {
            console.log(e)
        }
        dispatch(setIsFetching(false))
    }
}