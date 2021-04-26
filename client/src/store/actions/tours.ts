import { TourActions } from './ActionTypes.d';
import { Dispatch } from "redux";
import { AxiosResponse, AxiosError, AxiosInstance } from "axios";
import { Tour, AddTourForm } from "../../types/types";


// fetch user related tours
const fetchUserToursInit = () => {
    return {
        type: TourActions.FETCH_USER_TOURS_INIT,
    }
}
const fetchUserToursSuccess = (userTours: Tour[]) => {
    return {
        type: TourActions.FETCH_USER_TOURS_SUCCESS,
        userTours,
    }
}
const fetchUserToursError = (error: string) => {
    return {
        type: TourActions.FETCH_USER_TOURS_SUCCESS,
        error,
    }
}


// fetch a tour 
const fetchTourInit = () => {
    return {
        type: TourActions.FETCH_TOUR_INIT,
    }
}

const fetchTourSuccess = (currentTour: Tour) => {
    return {
        type: TourActions.FETCH_TOUR_SUCCESS,
        currentTour,
    }
}
const fetchTourError = (error: string) => {
    return {
        type: TourActions.FETCH_TOUR_ERROR,
        error,
    }
}


// adding tours
const addTourInit = () => {
    return {
        type: TourActions.ADD_TOUR_INIT,
    }
}

const addTourSuccess = (tour: Tour) => {
    return {
        type: TourActions.ADD_TOUR_SUCCESS,
    }
}

const addTourError = (error: string) => {
    return {
        type: TourActions.ADD_TOUR_ERROR,
        error,
    }
}

// =======================
// =======================
// thunk actions
// =======================
// =======================

// fetch a tour 
export const fetchUserTours = (axios: AxiosInstance, userId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(fetchUserToursInit());

        axios.get(`/user/${userId}/tours`)
            .then((res: AxiosResponse) => {
                if (res.status === 200) {
                    dispatch(fetchUserToursSuccess(res.data));
                } else if (res.data.error) {
                    dispatch(fetchUserToursError(res.data.message));
                }
            })
            .catch((err: AxiosError) => dispatch(fetchUserToursError(err.message)))
    }
}

// fetch a tour 
export const fetchTour = (axios: AxiosInstance, id: string) => {
    return (dispatch: Dispatch) => {
        dispatch(fetchTourInit());

        axios.get(`/tour/${id}`)
            .then((res: AxiosResponse) => {
                if (res.status === 200) {
                    dispatch(fetchTourSuccess(res.data));
                } else if (res.data.error) {
                    dispatch(fetchTourError(res.data.message));
                }
            })
            .catch((err: AxiosError) => dispatch(fetchTourError(err.message)))
    }
}

// delete a tour
export const deleteTour = (axios: AxiosInstance, id: string, cb: (status: any) => void) => {
    return (dispatch: Dispatch) => {
        axios.delete(`/tour/${id}`)
            .then((res: AxiosResponse) => {
                if (res.status === 200) {
                    cb({ status: res.status });
                } else if (res.data.error) {
                    cb({ status: res.status, message: res.data.message });
                }
            })
            .catch((err: AxiosError) => {
                console.log(err.message);
                cb({ status: 500, message: err.message });
            })
    }
}


// get tour details 
export const addTour = async (axios: AxiosInstance, form: AddTourForm) => {
    return (dispatch: Dispatch) => {
        dispatch(addTourInit());

        axios.post('/tour', form)
            .then((res: AxiosResponse) => {
                if (res.status === 200) {
                    dispatch(addTourSuccess(res.data));
                } else if (res.data.error) {
                    dispatch(addTourError(res.data.message));
                }
            })
            .catch((err: AxiosError) => dispatch(addTourError(err.message)))
    }
}

// ====================================
// helpers 


export const getTourViewerLink = (tourPath: string, id: string) => {
    let tourFullPath = `${window.location.origin}/api/${tourPath}`;
    let url = new URL(tourFullPath);
    let urlHrefAr = url.href.split("");

    if (urlHrefAr[urlHrefAr.length - 1] === '/')
        urlHrefAr.splice(urlHrefAr.length - 1, 1);

    let UrlHrefNoNameAr = urlHrefAr.join('').split('/');
    let tourName = UrlHrefNoNameAr.splice(UrlHrefNoNameAr.length - 1, 1);
    let urlHref = UrlHrefNoNameAr.join('/');
    const viewerPath = `${window.location.origin}/api/viewer`;
    return `${viewerPath}?id=${id}&tour=${tourName}&content-path=${urlHref}/`;
}

export const getTourUrl = (tourPath: string) => {
    return `${window.location.origin}/api/${tourPath}`;
}

export const getTourImageUrl = (tourPath: string) => {
    return `${getTourUrl(tourPath)}/preview.jpg`;
}
