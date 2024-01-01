import { Email, GitHub, LinkedIn } from "@mui/icons-material";
import React, { Component } from "react";
import IconButton from '@mui/material/IconButton';

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
            <div class="container mt-5">
            <div class="row d-flex justify-content-center">
                <div class="col-md-7">
                    <div class="aboutCard p-3 py-4">
                        <div class="text-center">
                            <img src="https://avatars.githubusercontent.com/u/62745858?v=4" width="100" class="rounded-circle" />
                        </div>

                        <div class="text-center mt-3">
                            <span class="bg-secondary p-1 px-4 rounded text-white">Contact Me</span>
                            <h5 class="mt-2 mb-0">Cemil Tan</h5>
                            <span>Computer Engineer</span>

                            <div class="px-4 mt-1">
                                <p class="aboutfonts"> Hi, welcome to spring-boot-microservice-react application. This is a simple application to demonstrate how to integrate spring boot with react. For more detail about the application, please refer to the following projects: <span/>
                                    <a href="https://github.com/Ctere1/spring-boot-microservice" target="_blank" rel="noopener noreferrer">
                                        Spring Boot Microservice API
                                    </a>
                                    <span/> and <span/> 
                                    <a href="https://github.com/Ctere1/spring-boot-microservice-react" target="_blank" rel="noopener noreferrer">
                                        Spring Boot Microservice React
                                    </a>
                                </p>
                            </div>

                            <ul className="about-social-list">
                                <li>
                                    <IconButton>
                                        <a href="https://www.linkedin.com/in/cemil-tan-a337b512b/" target="_blank" rel="noopener noreferrer">
                                            <LinkedIn />
                                        </a>
                                    </IconButton>
                                </li>
                                <li>
                                    <IconButton>
                                        <a href="mailto:cemiltan896@gmail.com">
                                            <Email />
                                        </a>
                                    </IconButton>
                                </li>
                                <li>
                                    <IconButton>
                                        <a href="https://github.com/Ctere1/" target="_blank" rel="noopener noreferrer">
                                            <GitHub />
                                        </a>
                                    </IconButton>
                                </li>
                            </ul>


                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}