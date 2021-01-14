import axios from 'axios'
import {setUser, setIsFetching, logout} from "../userReducer.js";

export const registration =  (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`http://localhost:5000/api/auth/registration`, {
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
            const response = await axios.post(`http://localhost:5000/api/auth/login`, {
                email,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
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
            const response = await axios.get(`http://localhost:5000/api/auth/auth`,
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            localStorage.removeItem('token')
            dispatch(logout())
        }
        dispatch(setIsFetching(false))
    }
}