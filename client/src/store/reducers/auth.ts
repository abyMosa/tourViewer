import { AuthActions } from "../actions/ActionTypes.d";
import { updateObject } from '../../utils/misc';
import { User } from "../../types/types";
import { AnyAction, Reducer } from "redux";


export interface AuthReducerState {
    isAuthenticated: boolean;
    loading: boolean;
    user: User | null;
    error: string | null;
    token: string | null;
}


const defaultState: AuthReducerState = {
    isAuthenticated: false,
    token: null,
    loading: false,
    error: null,
    user: null
}

const reducer: Reducer = (state: AuthReducerState = defaultState, action: AnyAction) => {
    switch (action.type) {

        case AuthActions.AUTH_INIT:
            return updateObject(state, { loading: true });

        case AuthActions.AUTH_SUCCESS:
            return updateObject(state, { token: action.token, loading: false, error: null, isAuthenticated: action.user !== null, user: action.user });

        case AuthActions.AUTH_FAILED:
            return updateObject(state, { loading: false, error: action.error });

        default:
            return state;
    }
}

export default reducer;