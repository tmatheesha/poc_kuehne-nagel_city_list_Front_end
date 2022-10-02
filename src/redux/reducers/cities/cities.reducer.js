import initialState from "./cities.initialState";
import actionTypes from "./cities.actionType";

const citiesReducer = (state = initialState, { type, payload }) => {
    console.log("type ",type);
    console.log("payload ",payload);
    switch (type) {
        case actionTypes.CITIES_LOAD_START:
            console.log("payload reducer",payload);
            return {
                ...state,
                isLoading: true,
                cities: null,
                noOfItems: null,
                errorMessage: null,
            };

        case actionTypes.CITIES_LOAD_SUCCESS:
            console.log("payload reducer",payload);
            return {
                ...state,
                isLoading: false,
                cities: payload.dtoList,
                noOfItems: payload.noOfItems,
            };

        case actionTypes.CITIES_LOAD_ERROR:
            console.log("payload reducer",payload);
            return {
                ...state,
                isLoading: false,
                cities: null,
                noOfItems: null,
                errorMessage: payload,
            };

        default:
            return state;
    }
};

export default citiesReducer;