import apiClient from "../helpers/apiClient";

class CitiesService {
    getAllCities = (payload) => apiClient().post("/pages",payload);
}

export default new CitiesService();