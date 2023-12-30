import React, { Component } from "react";

export default class About extends Component {
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
                            Developed by Cemil Tan.
                            <br />
                            <br />
                            Contact Me:
                            <br />
                            <br />
                            <ul>
                                <li><strong>Email</strong>: cemiltan896@gmail.com</li>
                                <li><strong>Linkedin</strong>: <a href="https://www.linkedin.com/in/cemil-tan-a337b512b/" target="_blank">Cemil Tan Linkedin</a></li>
                                <li><strong>Github</strong>: <a href="https://github.com/Ctere1" target="_blank">Cemil Tan Github</a></li>
                            </ul>
                        </p>
                    </div>
                </header>
            </div>
        );
    }
}