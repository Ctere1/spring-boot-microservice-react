import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import logo from './assets/logo.svg';

import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import HomeComponent from "./components/HomeComponent";
import ProfileComponent from "./components/ProfileComponent";
import AboutComponent from "./components/AboutComponent";
import AddProductComponent from "./components/AddProductComponent";
import ProductEditComponent from "./components/ProductEditComponent";
import ProductsListComponent from "./components/ProductsListComponent";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from './helpers/history';

import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
import { Login, Logout, Person, PersonAdd } from "@mui/icons-material";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    this.props.dispatch(logout());
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <Router history={history}>
        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/">
              <img
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="Logo"
              />{' '}
              Microservice API
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              {currentUser ? (
                <>
                  <Nav className="me-auto">
                    <Nav.Link href="/products">Products</Nav.Link>
                    <NavDropdown title="Links" id="basic-nav-dropdown">
                      <NavDropdown.Item href="/about">
                        About
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="http://localhost:5860/swagger-ui/index.html#/" target="_blank">
                        Swagger Doc
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav><Nav>
                    <Nav.Link href="/profile">  {currentUser.username} <Person /></Nav.Link>
                    <Nav.Link eventKey={2} href="/logout" onClick={this.logOut}>
                      Logout < Logout />
                    </Nav.Link>
                  </Nav>
                </>
              ) : (
                <>
                  <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                  </Nav>
                  <Nav>
                    <Nav.Link href="/login">Login <Login /></Nav.Link>
                    <Nav.Link eventKey={2} href="/register">Signup <PersonAdd /></Nav.Link>
                  </Nav>
                </>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className="container mt-3">

          <Routes>
            <Route exact path="/" element={<HomeComponent />} />
            <Route exact path="/home" element={<HomeComponent />} />
            <Route exact path="/login" element={<LoginComponent />} />
            <Route exact path="/register" element={<RegisterComponent />} />
            <Route exact path="/profile" element={<ProfileComponent />} />

            {currentUser && (
              <>
                <Route exact path="/products/add" element={<AddProductComponent />} />
                <Route path="/products/:id" element={<ProductEditComponent />} />
                <Route path="/products" element={<ProductsListComponent />} />
                <Route path="/about" element={<AboutComponent />} />
              </>
            )}
          </Routes>

        </div>

        <ToastContainer />
        <AuthVerify logOut={this.logOut} />

      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);