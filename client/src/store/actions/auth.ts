import { AuthActions } from './ActionTypes.d';
import { setAuthHeader } from "../../axios";
import { User, UserLoginFormData } from "../../types/types";
import { Dispatch } from "redux";
import { AxiosResponse, AxiosError, AxiosInstance } from "axios";
import jwt from 'jsonwebtoken';
import { axiosErr } from "../../axios";


export const authInit = () => {
    return {
        type: AuthActions.AUTH_INIT,
    }
}

export const authSuccess = (token: (string | null), user: (User | null)) => {
    return {
        type: AuthActions.AUTH_SUCCESS,
        token: token,
        user: user,

    }
}

export const authFailed = (err: string) => {
    return {
        type: AuthActions.AUTH_FAILED,
        error: err
    }
}

export const login = (axios: AxiosInstance, form: UserLoginFormData) => {
    return (dispatch: Dispatch) => {
        dispatch(authInit());
        axios.post('/auth/login', form)
            .then((response: AxiosResponse) => {
                let token: string = response.data.token;
                localStorage.setItem('jwtToken', token);
                setAuthHeader(token);
                dispatch(authSuccess(token, jwt.decode(token) as (User | null)));
            })
            .catch((err: AxiosError) => {
                dispatch(authFailed(axiosErr(err)));
            });
    }
}

export const logout = () => {
    return (dispatch: Dispatch) => {
        localStorage.removeItem('jwtToken');
        setAuthHeader(null);
        dispatch(authSuccess(null, null));
    }
}


// to log the visitor in after registration uncomment this
// export const register = (axios: AxiosInstance, form: UserRegistrationFormData) => {
//     return (dispatch: Dispatch) => {
//         dispatch(authInit());
//         axios.post('/auth/register', form)
//             .then(response => {
//                 let token = response.data.token;
//                 localStorage.setItem('jwtToken', token);
//                 setAuthHeader(token);
//                 dispatch(authSuccess(token, jwt.decode(token) as (User | null)));
//             })
//             .catch((err: AxiosError) => {
//                 dispatch(authFailed(axiosErr(err)));
//             });
//     }
// }

export const getUser = (token: string) => {
    return jwt.decode(token) as User;
}

