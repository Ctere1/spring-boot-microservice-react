import React, { Component } from "react";
import { connect } from "react-redux";
import { createProduct } from "../actions/products";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { Add, ArrowBack } from "@mui/icons-material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.newProduct = this.newProduct.bind(this);

        this.state = {
            id: null,
            name: "",
            description: "",
            category: "",
            price: "",

            submitted: false,
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value,
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value,
        });
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value,
        });
    }

    onChangeCategory(e) {
        this.setState({
            category: e.target.value,
        });
    }

    saveProduct() {
        const { name, description, category, price } = this.state;

        this.props
            .createProduct(name, description, category, price)
            .then((data) => {
                this.setState({
                    id: data.id,
                    name: data.name,
                    description: data.description,
                    category: data.category,
                    price: data.price,


                    submitted: true,
                });
                console.log(data);
                toast("New product added");
            })
            .catch((e) => {
                console.log(e);
            });
    }

    newProduct() {
        this.setState({
            id: null,
            name: "",
            description: "",
            category: "",
            price: "",

            submitted: false,
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <div className="justify-content-center">
                            <h4>Submitted successfully!</h4>
                            <Button startIcon={<Add />} className="m-3" variant="outlined" color="primary" onClick={this.newProduct} style={{ textTransform: "none" }}>Add</Button>

                            <Link to={"/products"}>
                                <Button startIcon={<ArrowBack />} className="m-3" variant="outlined" color="primary" style={{ textTransform: "none" }}>Go back</Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <h4>Add Product</h4>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={this.state.name}
                                onChange={this.onChangeName}
                                name="name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                name="description"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                required
                                value={this.state.price}
                                onChange={this.onChangePrice}
                                name="price"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <input
                                type="text"
                                className="form-control"
                                id="category"
                                required
                                value={this.state.category}
                                onChange={this.onChangeCategory}
                                name="category"
                            />
                        </div>

                        <div className="d-flex justify-content-center">
                            <Button startIcon={<Add />} className="m-3" variant="outlined" color="primary" onClick={this.saveProduct} style={{ textTransform: "none" }}>Add</Button>
                        </div>

                    </div>
                )}
            </div>
        );
    }
}

export default connect(null, { createProduct })(AddProduct);