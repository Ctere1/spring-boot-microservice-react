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
            <div className="row justify-content-center">
                <h3>Profile</h3>
                <Card style={{ marginTop: 0 }}>
                    <Card.Header><strong>Id:</strong> {currentUser.id}</Card.Header>
                    <Card.Img variant="top" src="https://picsum.photos/1600/200" />
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