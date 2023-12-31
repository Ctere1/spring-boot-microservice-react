import axios from "axios";
import AuthHeader from "./AuthHeader";

axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;

class CartService {
    getAll() {
        return axios.get(`shopping-cart`, { headers: AuthHeader() });
    }

    getById(cartId) {
        return axios.get(`shopping-cart/${cartId}`, { headers: AuthHeader() });
    }

    getByName(name) {
        return axios.get(`shopping-cart/by-name/${name}`, { headers: AuthHeader() });
    }

    create(name) {
        return axios.post(`shopping-cart?name=${name}`, null, { headers: AuthHeader() });
    }

    delete(cartId) {
        return axios.delete(`shopping-cart/${cartId}`, { headers: AuthHeader() });
    }

    deleteProduct(cartId, productId) {
        return axios.delete(`shopping-cart/${cartId}/products/${productId}`, { headers: AuthHeader() });
    }

    getTotalPrice(cartId){
        return axios.get(`shopping-cart/totalprice/${cartId}`, { headers: AuthHeader() });
    }

    deleteAll() {
        return axios.delete(`shopping-cart/deleteAll`, { headers: AuthHeader() });
    }

    addProducts(cartId, data) {
        return axios.post(`shopping-cart/${cartId}`, data, { headers: AuthHeader() });
    }
}

const cartService = new CartService();

export default cartService;