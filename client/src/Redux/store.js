import {fileReducer} from "./fileReducer.js";
import {userReducer} from "./userReducer.js";
import {applyMiddleware, combineReducers, createStore} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    user: userReducer,
    files: fileReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))