import thunk from "redux-thunk";
import { createStore, combineReducers, compose, applyMiddleware, Store, AnyAction, Reducer } from "redux";
import auth, { AuthReducerState } from "./auth";
import tours, { TourReducerState } from "./tours";


export interface ApplicationState {
    auth: AuthReducerState;
    tours: TourReducerState;
}

const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    // settings,
    tours,
    auth
});


const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store: Store<any, AnyAction> = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
