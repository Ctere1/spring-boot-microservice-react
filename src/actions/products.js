import {
    CREATE_PRODUCT,
    RETRIEVE_PRODUCTS,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    DELETE_ALL_PRODUCTS
} from "./types";

import ProductService from "../services/ProductService";

export const createProduct = (name, description, category, price) => async (dispatch) => {
    try {
        const res = await ProductService.create({ name, description, category, price });

        dispatch({
            type: CREATE_PRODUCT,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const retrieveProducts = () => async (dispatch) => {
    try {
        const res = await ProductService.getAll();

        dispatch({
            type: RETRIEVE_PRODUCTS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const updateProduct = (id, data) => async (dispatch) => {
    try {
        const res = await ProductService.update(id, data);

        dispatch({
            type: UPDATE_PRODUCT,
            payload: data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deleteProduct = (id) => async (dispatch) => {
    try {
        await ProductService.delete(id);

        dispatch({
            type: DELETE_PRODUCT,
            payload: { id },
        });
    } catch (err) {
        console.log(err);
    }
};

export const deleteAllProducts = () => async (dispatch) => {
    try {
        const res = await ProductService.deleteAll();

        dispatch({
            type: DELETE_ALL_PRODUCTS,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};
