import actions from "./cities.actions";
import CitiesService from "../../../services/cities.service";
import {message} from "antd";


export const loadCitiesAsync = (payload) => (dispatch) => {
    dispatch(actions.citiesLoadStart());

    CitiesService.getAllCities(payload)
        .then((response) => {
                console.log("response ",response)
            return dispatch(actions.citiesLoadSuccess(response.data));
        }
            )
        .catch((error) => {
            console.log("error ",error)
            message.error(error.responseHeader && error.responseHeader.responseDesc);
            return  dispatch(actions.citiesLoadError(error))});
};

export const updateCityAsync = (payload, callback) => (dispatch) => {
    dispatch(actions.citiesLoadStart());

    CitiesService.updateCity(payload)
        .then((response) => {
            message.success("Successfully updated city");
            return dispatch(loadCitiesAsync(callback));
            // return callback;
        })
        .catch((error) => {
            console.log("error ",error)
            message.error(error.response && error.response.data &&  error.response.data.responseHeader && error.response.data.responseHeader.responseDesc);
            return dispatch(actions.cityUpdateError(error))});
};