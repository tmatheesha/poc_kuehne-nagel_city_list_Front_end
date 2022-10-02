import actionTypes from "./cities.actionType";

const citiesLoadStart = () => ({
    type: actionTypes.CITIES_LOAD_START,
});

const citiesLoadSuccess = (users) => ({
    type: actionTypes.CITIES_LOAD_SUCCESS,
    payload: users,
});

const citiesLoadError = (errorMessage) => ({
    type: actionTypes.CITIES_LOAD_ERROR,
    payload: errorMessage,
});

export default {
    citiesLoadStart,
    citiesLoadSuccess,
    citiesLoadError,
};
