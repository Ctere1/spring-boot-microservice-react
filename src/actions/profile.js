import {
    UPDATE_PROFILE,
    DELETE_PROFILE,
    SET_MESSAGE
} from "./types";

import ProfileService from "../services/ProfileService";

export const updateProfile = (id, data) => async (dispatch) => {
    try {
        return await ProfileService.update(id, data).then(
            (response) => {
                dispatch({
                    type: UPDATE_PROFILE,
                    payload: data,
                });


                dispatch({
                    type: SET_MESSAGE,
                    payload: response.data.message,
                });

                return Promise.resolve();
            },
            (error) => {
                const message =
                    error?.response?.data?.message ||
                    error?.response?.data?.errors ||
                    error.message ||
                    error.toString();


                dispatch({
                    type: SET_MESSAGE,
                    payload: message,
                });

                return Promise.reject();
            }
        );

    } catch (err) {
        return Promise.reject(err);
    }
};

export const deleteProfile = (id) => async (dispatch) => {
    try {
        return await ProfileService.delete(id).then(
            (response) => {
                dispatch({
                    type: DELETE_PROFILE,
                    payload: { id },
                });

                dispatch({
                    type: SET_MESSAGE,
                    payload: response.data.message,
                });

                return Promise.resolve();
            },
            (error) => {
                const message =
                    error?.response?.data?.message ||
                    error?.response?.data?.errors ||
                    error.message ||
                    error.toString();


                dispatch({
                    type: SET_MESSAGE,
                    payload: message,
                });

                return Promise.reject();
            }
        );
    } catch (err) {
        console.log(err);
    }
};