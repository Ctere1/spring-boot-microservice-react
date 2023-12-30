import React, { Component } from "react";
import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";
import { Card } from "react-bootstrap";

class Profile extends Component {

    render() {
        const { user: currentUser } = this.props;

        if (!currentUser) {
            return <Navigate to="/login" />;
        }

        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        <strong>Profile</strong>
                    </h3>
                </header>
                <Card style={{ marginTop: 0 }}>
                    <Card.Header><strong>Id:</strong> {currentUser.id}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <label>
                                <strong>Username:</strong>
                            </label>{" "}
                            {currentUser.username}
                            <label>
                                <strong>Email:</strong>
                            </label>{" "}
                            {currentUser.email}
                            <label>
                                <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ... {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                            </label>{" "}
                        </Card.Text>
                    </Card.Body>
                </Card>

            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps)(Profile);