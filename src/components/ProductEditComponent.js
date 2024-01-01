import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProduct, deleteProduct } from "../actions/products";
import ProductService from "../services/ProductService";
import { withRouter } from '../common/WithRouter';
import Button from '@mui/material/Button';
import { Update, Delete } from "@mui/icons-material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Product extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.getProduct = this.getProduct.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.updateContent = this.updateContent.bind(this);
        this.removeProduct = this.removeProduct.bind(this);

        this.state = {
            currentProduct: {
                id: null,
                name: "",
                description: "",
                category: "",
                price: "",

            }
        };
    }

    componentDidMount() {
        this.getProduct(this.props.router.params.id);
    }

    onChangeName(e) {
        const name = e.target.value;

        this.setState(function (prevState) {
            return {
                currentProduct: {
                    ...prevState.currentProduct,
                    name: name,
                },
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState((prevState) => ({
            currentProduct: {
                ...prevState.currentProduct,
                description: description,
            },
        }));
    }

    onChangePrice(e) {
        const price = e.target.value;

        this.setState((prevState) => ({
            currentProduct: {
                ...prevState.currentProduct,
                price: price,
            },
        }));
    }

    onChangeCategory(e) {
        const category = e.target.value;

        this.setState((prevState) => ({
            currentProduct: {
                ...prevState.currentProduct,
                category: category,
            },
        }));
    }

    getProduct(id) {
        ProductService.get(id)
            .then((response) => {
                this.setState({
                    currentProduct: response.data,
                });
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    updateStatus() {
        var data = {
            id: this.state.currentProduct.id,
            name: this.state.currentProduct.name,
            description: this.state.currentProduct.description,

        };

        this.props
            .updateProduct(this.state.currentProduct.id, data)
            .then((response) => {
                console.log(response);

                this.setState((prevState) => ({
                    currentProduct: {
                        ...prevState.currentProduct
                    },
                }));

                toast("Product updated successfully!");
            })
            .catch((e) => {
                console.log(e);
            });
    }

    updateContent() {
        this.props
            .updateProduct(this.state.currentProduct.id, this.state.currentProduct)
            .then((response) => {
                console.log(response);

                toast("Product updated successfully!");
            })
            .catch((e) => {
                console.log(e);
            });
    }

    removeProduct() {
        this.props
            .deleteProduct(this.state.currentProduct.id)
            .then(() => {
                this.props.history.push("/products");
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        const { currentProduct } = this.state;

        return (
            <div>
                {currentProduct ? (
                    <div className="edit-form">
                        <h4>Edit Product</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={currentProduct.name}
                                    onChange={this.onChangeName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentProduct.description}
                                    onChange={this.onChangeDescription}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    required
                                    value={currentProduct.price}
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
                                    value={currentProduct.category}
                                    onChange={this.onChangeCategory}
                                    name="category"
                                />
                            </div>

                        </form>
                        <br />
                        <div className="d-flex justify-content-center">
                            <Button startIcon={<Delete />} className="m-1" variant="outlined" color="error" onClick={this.removeProduct} style={{ textTransform: "none" }}>Delete</Button>
                            <Button startIcon={<Update />} className="m-1" variant="outlined" color="success" onClick={this.updateContent} style={{ textTransform: "none" }}>Update</Button>

                        </div>

                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Product...</p>
                    </div>
                )}
            </div>
        );
    }
}

export default connect(null, { updateProduct, deleteProduct })(withRouter(Product));