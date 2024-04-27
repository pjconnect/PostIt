import toast from "react-hot-toast";
import {AxiosResponse} from "axios";

export function handleApiErrors(ex) {
    const data = ex.response.data;
    let message = "";
    if (data?.err) {
        message = data?.err;
    } else if (data?.errors) {
        let keys = Object.keys(data.errors);
        for (let k of keys) {
            message += data.errors[k] + "\n";
        }
    } else if (ex.message) {
        debugger;
        message = ex.message;
    }
    toast(message, {icon: '⚠️'});
    console.log('res', ex.message)
}

export function redirectBasedOnErrorCode(ex, navigate) {
    if (ex?.response?.status == 401) {
        navigate("/login");
    } else {

    }
}

export function saveJwtInLoginResponse(loginResponse: AxiosResponse<{
    username: string;
    token: string
}>) {
    localStorage.setItem('jwt', loginResponse.data.token);
    localStorage.setItem('username', loginResponse.data.username);
}
