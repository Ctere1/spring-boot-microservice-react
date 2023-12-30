import React, { Component } from "react";


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        //
    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>{this.state.content}</h3>
                    <div>
                        <p>
                            Hi, welcome to spring-boot-microservice-react application. This is a simple application to demonstrate how to integrate spring boot with react.
                            <br />
                            <br />
                            This application has following features:
                            <br />
                            <br />
                            <li>Login</li>
                            <li>Register</li>
                            <li>Access profile page</li>
                            <li>Access products page</li>
                            <li>Add product</li>
                            <li>Get product details</li>
                            <li>Update product</li>
                            <li>Delete product</li>
                            <li>Create cart if not exists</li>
                            <li>Add product to cart</li>
                            <li>Delete product from cart</li>
                            <br />
                            This application is secured with Spring Security and JWT Authentication.

                        </p>
                    </div>
                </header>
            </div>
        );
    }
}