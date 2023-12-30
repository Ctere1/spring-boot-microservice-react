import React, { useState, useEffect } from "react";
import productService from "../services/ProductService";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from '../common/WithRouter';
import { updateProduct } from "../actions/products";
import { Card, ListGroup, Modal } from "react-bootstrap";
import cartService from "../services/CartService";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { Add, ListAltOutlined, ShoppingCartRounded } from "@mui/icons-material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [cartId, setCartId] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const retrieveCart = async () => {
        const user = localStorage.getItem("user");
        const parsedUser = JSON.parse(user);

        var isCartExist = false;
        try {
            const response = await cartService.getByName(parsedUser.username);
            setCartId(response.data.id);
            isCartExist = true;
            setCartProducts(response.data.products);
        } catch (e) {
            console.log(e);
        }

        if (!isCartExist) {
            cartService.create(parsedUser.username)
                .then((response) => {
                    setCartId(response.data.id);

                    console.log(response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        }

    };

    const retrieveProducts = () => {
        productService.getAll()
            .then((response) => {
                setProducts(response.data);

                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(retrieveProducts, []);
    useEffect(() => {
        retrieveCart();
    }, []);

    const refreshList = () => {
        retrieveCart();
        retrieveProducts();
        setCurrentProduct(null);
        setCurrentIndex(-1);
    };

    const setActiveProduct = (product, index) => {
        setCurrentProduct(product);
        setCurrentIndex(index);
        handleShowModal();
    };

    const deleteAllProducts = () => {
        productService.deleteAll()
            .then((response) => {
                console.log(response.data);
                refreshList();
                toast("All products deleted");
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const deleteProduct = (product) => {
        productService.delete(product.id)
            .then((response) => {
                console.log(response.data);
                refreshList();
                toast(product.name + " deleted");
            })
            .catch((e) => {
                console.log(e);
            });
        handleCloseModal();
    };

    const addToCart = (product) => {
        cartService.addProducts(cartId, [product])
            .then((response) => {
                const { products } = response.data;
                setCartProducts(products);
                console.log(response.data);
                toast(product.name + " added to cart");
            })
            .catch((e) => {
                console.log(e);
            });
        handleCloseModal();
    };

    const removeProductFromCart = (product) => {
        cartService.deleteProduct(cartId, product.id)
            .then((response) => {
                const { products } = response.data;
                setCartProducts(products);
                console.log(response.data);

            })
            .catch((e) => {
                console.log(e);
            });
    };


    return (
        <div className="row justify-content-md-center">

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Product Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card style={{ marginTop: 0 }}>
                        <Card.Header><strong>Id:</strong> {currentProduct?.id}</Card.Header>
                        <Card.Body >
                            <Card.Title> <strong>Name:</strong> {currentProduct?.name}</Card.Title>
                            <Card.Text>
                                <div>
                                    <label>
                                        <strong>Description:</strong>
                                    </label>{" "}
                                    {currentProduct?.description}
                                    <label>
                                        <strong>Category:</strong>
                                    </label>{" "}
                                    {currentProduct?.category}
                                    <label>
                                        <strong>Price:</strong>
                                    </label>{" "}
                                    {currentProduct?.price}
                                </div>
                            </Card.Text>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Link to={"/products/" + currentProduct?.id}>
                                    <Button className="m-3" variant="outlined" color="primary" onClick={() => updateProduct(currentProduct)} style={{ textTransform: "none", margin: '5px' }}>Edit</Button>
                                </Link>
                                <Button startIcon={<DeleteIcon />} className="m-3" variant="outlined" color="error" onClick={() => deleteProduct(currentProduct)} style={{ textTransform: "none", margin: '5px' }}>Delete</Button>
                                <Button startIcon={<ShoppingCartRounded />} className="m-3" variant="contained" color="success" onClick={() => addToCart(currentProduct)} style={{ textTransform: "none", margin: '5px' }}>Add to Cart</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="col-md-9">
                <h4><ListAltOutlined />Products List</h4>
                <ListGroup>
                    {products &&
                        products.map((product, index) => (
                            <ListGroup.Item
                                active={index === currentIndex}
                                onClick={() => setActiveProduct(product, index)}
                                key={index}
                            >
                                {product.name}
                            </ListGroup.Item>
                        ))}
                </ListGroup>
                <div className="col-md-12 d-flex align-items-center justify-content-start">
                    <Button startIcon={<DeleteIcon />} className="" variant="outlined" color="error" onClick={deleteAllProducts} style={{ textTransform: "none" }}>Delete All</Button>
                    <Link to={"/products/add"}>
                        <Button startIcon={<Add />} className="m-3" variant="outlined" color="primary" style={{ textTransform: "none" }}>Add New</Button>
                    </Link>
                </div>
            </div>


            <div className="col-md-3">
                <h4><ShoppingCartRounded /> My Cart </h4>
                <ListGroup>
                    {cartProducts &&
                        cartProducts.map((cartProduct, index) => (
                            <ListGroup.Item
                                //active={index === currentIndex}
                                // onClick={() => setActiveProduct(cartProduct, index)}
                                key={index}
                                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>{cartProduct.name}</span>
                                <Button startIcon={<DeleteIcon />} size="small" className="m-1" variant="outlined" color="primary" onClick={() => removeProductFromCart(cartProduct)} style={{ textTransform: "none" }}>Remove</Button>
                            </ListGroup.Item>
                        ))}
                </ListGroup>
            </div>

        </div>
    );
};

export default connect(null,)(withRouter(ProductsList));