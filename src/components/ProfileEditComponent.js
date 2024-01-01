import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { withRouter } from '../common/WithRouter';
import Button from '@mui/material/Button';
import { Delete, ArrowBack, Save } from "@mui/icons-material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProfile, deleteProfile } from "../actions/profile";

class ProfileEdit extends Component {
    constructor(props) {
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            currentProfile: {
                id: null,
                password: undefined,
                email: undefined,
            }
        };
    }

    componentDidMount() {
        const { user: currentUser } = this.props;

        this.setState({
            currentProfile: {
                id: currentUser.id
            }
        });
    }

    onChangeEmail(e) {
        const email = e.target.value;

        this.setState(function (prevState) {
            return {
                currentProfile: {
                    ...prevState.currentProfile,
                    email: email,
                },
            };
        });
    }

    onChangePassword(e) {
        const password = e.target.value;

        this.setState(function (prevState) {
            return {
                currentProfile: {
                    ...prevState.currentProfile,
                    password: password,
                },
            };
        });
    }

    deleteProfile = () => {
        const isConfirmed = window.confirm("Are you sure you want to delete profile?");

        if (!isConfirmed) {
            return;
        }

        this.props
            .deleteProfile(this.state.currentProfile.id)
            .then((response) => {
                console.log(response);
                this.props.logOut();
                this.props.router.navigate("/login");
                toast("Profile deleted successfully!");
            })
            .catch((e) => {
                console.log(e);
            });
    }

    updateProfile = () => {
        if (this.state.currentProfile.email === undefined && this.state.currentProfile.password === undefined) {
            window.confirm("Please set email or password");
            return;
        }

        this.props
            .updateProfile(this.state.currentProfile.id, this.state.currentProfile)
            .then((response) => {
                console.log(response);
                this.props.logOut();
                this.props.router.navigate("/login");
                toast("Please login again to see the changes");
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        const { message } = this.props;
        return (
            <div>
                {this.state.currentProfile && (
                    <div className="edit-form">
                        <h4>Edit Profile</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="email" style={{ display: "block", margin: "10px 0", fontWeight: "bold", color: "#333" }}>
                                    New Email <span style={{ fontSize: "12px", color: "#777" }}>(optional)</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    onChange={this.onChangeEmail}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" style={{ display: "block", margin: "10px 0", fontWeight: "bold", color: "#333" }}>
                                    New Password <span style={{ fontSize: "12px", color: "#777" }}>(optional)</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="password"
                                    onChange={this.onChangePassword}
                                />
                            </div>
                        </form>
                        <br />
                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                        <br />
                        <div className="d-flex justify-content-center">
                            <Button startIcon={<Delete />} className="m-1" variant="outlined" color="error" onClick={this.deleteProfile} style={{ textTransform: "none" }}>Delete</Button>
                            <Button startIcon={<Save />} className="m-1" variant="outlined" color="success" onClick={this.updateProfile} style={{ textTransform: "none" }}>Save</Button>
                            <Link to={"/profile"}>
                                <Button startIcon={<ArrowBack />} className="m-1" variant="outlined" color="primary" style={{ textTransform: "none" }}>Go back</Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const { message } = state.message;
    return {
        user,
        message
    };
}

export default connect(mapStateToProps, { updateProfile, deleteProfile })(withRouter(ProfileEdit));
