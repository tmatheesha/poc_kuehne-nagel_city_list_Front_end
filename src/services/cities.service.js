import apiClient from "../helpers/apiClient";

class CitiesService {
    getAllCities = (payload) => apiClient().post("/pages",payload);
    updateCity = (payload) => apiClient().post("/update",payload);
}

export default new CitiesService();