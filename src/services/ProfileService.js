import axios from "axios";
import AuthHeader from "./AuthHeader";

axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;

class ProfileService {
    update(userId, data) {
        return axios.put(`user/update/${userId}`, data, { headers: AuthHeader() })
    }

    delete(userId) {
        return axios.delete(`user/delete/${userId}`, { headers: AuthHeader() });
    }
}

const profileService = new ProfileService();

export default profileService;