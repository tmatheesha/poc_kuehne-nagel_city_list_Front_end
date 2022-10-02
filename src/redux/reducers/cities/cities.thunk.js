import actions from "./cities.actions";
import CitiesService from "../../../services/cities.service";


export const loadCitiesAsync = (payload) => (dispatch) => {
    dispatch(actions.citiesLoadStart());

    CitiesService.getAllCities(payload)
        .then((response) => dispatch(actions.citiesLoadSuccess(response.data)))
        .catch((error) => dispatch(actions.citiesLoadError(error)));
};