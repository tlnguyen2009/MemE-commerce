import axios from "axios";
import { loginStart, loginFailure, loginSuccess } from "./userRedux";

//export function "login(...)"
export const login = async (dispatch, loginInfo) => { //read auth.js to see what we need for loginInfo
    dispatch (loginStart());
    try {
        const res = await axios.post("http://localhost:5000/api/auth/login", loginInfo);
        dispatch(loginSuccess(res.data)); //reading auth.js from backend to see "user" and "token" are returned.
    } catch {
        dispatch(loginFailure());
    }
};