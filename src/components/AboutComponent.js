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
                            About Page. 
                            <br />
                            <br />
                            Some text:
                            <br />
                            <br />
                            <ul>
                                <li>Some list</li>
                            </ul>

                        </p>
                    </div>
                </header>
            </div>
        );
    }
}