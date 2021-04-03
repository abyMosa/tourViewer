import { TourActions } from "../actions/ActionTypes.d";
import { updateObject } from '../../utils/misc';
import { Tour } from "../../types/types";
import { AnyAction, Reducer } from "redux";

export interface TourReducerState {
    loadingUserTours: boolean;
    loadingTour: boolean;
    isAddingTour: boolean;
    userTours: Tour[];
    currentTour: Tour | null;
    error: string | null;
}

const defaultState: TourReducerState = {
    loadingUserTours: false,
    loadingTour: false,
    isAddingTour: false,
    userTours: [],
    currentTour: null,
    error: null,
}

const reducer: Reducer = (state: TourReducerState = defaultState, action: AnyAction) => {
    switch (action.type) {

        case TourActions.FETCH_USER_TOURS_INIT:
            return updateObject(state, {
                loadingUserTours: true
            });

        case TourActions.FETCH_USER_TOURS_SUCCESS:
            return updateObject(state, {
                loadingUserTours: false,
                userTours: action.userTours,
                error: null
            });


        case TourActions.FETCH_USER_TOURS_ERROR:
            return updateObject(state, {
                loadingUserTours: false,
                userTours: [],
                error: action.error
            });


        case TourActions.FETCH_TOUR_INIT:
            return updateObject(state, {
                loadingTour: true,
            });


        case TourActions.FETCH_TOUR_SUCCESS:
            return updateObject(state, {
                loadingTour: false,
                currentTour: action.currentTour,
                error: null,
            });


        case TourActions.FETCH_TOUR_ERROR:
            return updateObject(state, {
                loadingTour: false,
                currentTour: null,
                error: action.error,
            });

        case TourActions.ADD_TOUR_INIT:
            return updateObject(state, { isAddingTour: true });

        case TourActions.ADD_TOUR_SUCCESS:
            return updateObject(state, { isAddingTour: false, });

        case TourActions.ADD_TOUR_ERROR:
            return updateObject(state, { isAddingTour: false, });


        default:
            return state;
    }
}

export default reducer;