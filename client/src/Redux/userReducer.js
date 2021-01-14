const SET_USER = "SET_USER"
const LOGOUT = "LOGOUT"
const IS_FETCHING = "IS_FETCHING"

const initialState = {
    currentUser: {},
    isAuth: false,
    isFetching: false
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
        case LOGOUT:
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }
        case IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            }
        default:
            return state
    }
}

export const setUser = user => ({type: SET_USER, payload: user})
export const logout = () => ({type: LOGOUT})
export const setIsFetching = (payload) => ({type: IS_FETCHING, payload})