import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { logout } from "../actions/auth";


const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

const AuthVerify = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("AuthVerify component initialized");

        const checkTokenExpiration = () => {
            const user = JSON.parse(localStorage.getItem("user"));

            if (user) {
                const decodedJwt = parseJwt(user.accessToken);

                if (decodedJwt.exp * 1000 < Date.now()) {
                   logout();
                }
            }
        };

        checkTokenExpiration();

        const intervalId = setInterval(checkTokenExpiration, 10000); // 10 saniyede bir kontrol et

        return () => clearInterval(intervalId); // Temizleme işlemi bileşen unmount olduğunda yapılır
    }, [navigate]);

    return <div></div>;
};

export default AuthVerify;
