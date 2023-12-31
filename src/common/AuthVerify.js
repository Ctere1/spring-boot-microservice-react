import React, { Component } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from './WithRouter';

class AuthVerify extends Component {
    constructor(props) {
        super(props);

        this.checkTokenExpiration = this.checkTokenExpiration.bind(this);
    }

    componentDidMount() {
        console.log("AuthVerify component initialized");
    
        this.checkTokenExpiration();

        this.intervalId = setInterval(this.checkTokenExpiration, 10000); // check every 10 seconds
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    checkTokenExpiration() {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            const decodedJwt = this.parseJwt(user.accessToken);

            if (decodedJwt.exp * 1000 < Date.now()) {
                this.props.logOut();
                toast("Jwt expired please login again");
                // Navigating to the "/login" path
                this.props.router.navigate("/login");
            }
        }
    }

    parseJwt(token) {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    }

    render() {
        return <div></div>;
    }
}

export default (withRouter(AuthVerify));
