import axios from "axios";
import AuthHeader from "./AuthHeader";

axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;

class ProductService {
    getAll() {
        return axios.get(`product`, { headers: AuthHeader() });
    }

    get(id) {
        return axios.get(`product/${id}`, { headers: AuthHeader() });
    }

    create(data) {
        return axios.post("product", data, { headers: AuthHeader() });
    }

    update(id, data) {
        return axios.put(`product/${id}`, data, { headers: AuthHeader() });
    }

    delete(id) {
        return axios.delete(`product/${id}`, { headers: AuthHeader() });
    }

    deleteAll() {
        return axios.delete(`product/deleteAll`, { headers: AuthHeader() });
    }
}

const productService = new ProductService();

export default productService;