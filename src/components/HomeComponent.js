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
                            <li>Access user page</li>
                            <li>Access moderator page</li>
                            <li>Access admin page</li>
                            <li>Access home page</li>
                            <li>Access profile page</li>
                            <li>Access tutorials page</li>
                            <li>Add tutorial</li>
                            <li>Get tutorial details</li>
                            <li>Update tutorial</li>
                            <li>Delete tutorial</li>
                            <br />
                            This application is secured with Spring Security and JWT Authentication.
                            <br />
                            <br />
                            <strong>NOTE: </strong>
                            Application creates (register) default user as "ROLE_USER". You can add more users with different roles via API or swagger.

                        </p>
                    </div>
                </header>
            </div>
        );
    }
}