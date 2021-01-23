const SET_FILES = "SET_FILES"
const SET_CURRENT_DIR = "SET_CURRENT_DIR"
const ADD_FILE = "ADD_FILE"
const SET_POPUP_DISPLAY = "SET_POPUP_DISPLAY"
const PUSH_TO_STACK = "PUSH_TO_STACK"
const DELETE_FILE = "DELETE_FILE"
const SET_CURRENT_DIR_NAME = "SET_CURRENT_DIR_NAME"
const BREAD_CRUMB = "BREAD_CRUMB"
const IS_FETCHING_FILES = "IS_FETCHING_FILES"

const initialState = {
    files: [],
    currentDir: null,
    currentDirName: null,
    popupDisplay: false,
    dirStack: [],
    isFetching: false
}

export const fileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FILES:
            return {...state, files: action.payload}
        case SET_CURRENT_DIR:
            return {...state, currentDir: action.payload}
        case ADD_FILE:
            return {...state, files: [...state.files, action.payload]}
        case SET_POPUP_DISPLAY:
            return {...state, popupDisplay: action.payload}
        case PUSH_TO_STACK:
            return {...state, dirStack: [...state.dirStack, action.payload]}
        case DELETE_FILE:
            return {...state, files: [...state.files.filter(file => file._id !== action.payload)]}
        case SET_CURRENT_DIR_NAME:
            return {...state, currentDirName: action.payload}
        case BREAD_CRUMB:
            return {...state, dirStack: [...state.dirStack.splice(0, action.payload)]}
        case IS_FETCHING_FILES:
            return {...state, isFetching: action.payload}
        default:
            return state
    }
}

export const setFiles = (files) => ({type: SET_FILES, payload: files})
export const setCurrentDir = (dir) => ({type: SET_CURRENT_DIR, payload: dir})
export const addFile = (file) => ({type: ADD_FILE, payload: file})
export const setPopupDisplay = (display) => ({type: SET_POPUP_DISPLAY, payload: display})
export const pushToStack = (dir) => ({type: PUSH_TO_STACK, payload: dir})
export const setCurrentDirName = (dir) => ({type: SET_CURRENT_DIR_NAME, payload: dir})
export const deleteFileAction = (dirId) => ({type: DELETE_FILE, payload: dirId})
export const breadCrumbHandlerAction = (index) => ({type: BREAD_CRUMB, payload:index})
export const setIsFetchingFiles = (payload) => ({type: IS_FETCHING_FILES, payload})

