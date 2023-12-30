import React, { Component } from "react";
import { connect } from "react-redux";
import { createProduct } from "../actions/products";
import { Link } from "react-router-dom";

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangePrice= this.onChangePrice.bind(this);
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
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newProduct}>
                            Add
                        </button>

                        <Link to={"/products"}><button className="m-3 btn btn-secondary">  Go back</button></Link>

                    </div>
                ) : (
                    <div>
                        <div className="form-group">
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

                        <button onClick={this.saveProduct} className="mt-3 btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

export default connect(null, { createProduct })(AddProduct);