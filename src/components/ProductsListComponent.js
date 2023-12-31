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
import IconButton from '@mui/material/IconButton';
import { Add, Inventory2Sharp, ShoppingCartRounded } from "@mui/icons-material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [totalPrice, setTotalPrice] = useState("");
    const [cartId, setCartId] = useState(null);
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
            getTotalPrice(response.data.id);
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
    };

    const setActiveProduct = (product, index) => {
        setCurrentProduct(product);
        handleShowModal();
    };

    const deleteAllProducts = () => {
        const isConfirmed = window.confirm("Are you sure you want to delete all products?");

        if (!isConfirmed) {
            return;
        }

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
                getTotalPrice(cartId);
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
                getTotalPrice(cartId);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const getTotalPrice = (cartId) => {
        cartService.getTotalPrice(cartId)
            .then((response) => {
                setTotalPrice(response.data.total_price)
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
                            <Card.Title></Card.Title>
                            <Card.Text>
                                <div>
                                    <label>
                                        <strong>Name:</strong>
                                    </label>{" "}
                                    {currentProduct?.name}
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
                <h4><Inventory2Sharp /> Products </h4>
                <div className="col-md-12 d-flex align-items-center justify-content-start">
                    <Button startIcon={<DeleteIcon />} className="" variant="outlined" color="error" onClick={deleteAllProducts} style={{ textTransform: "none" }}>Delete All</Button>
                    <Link to={"/products/add"}><Button startIcon={<Add />} className="m-3" variant="outlined" color="primary" style={{ textTransform: "none" }}>Add New</Button></Link>
                </div>
                <hr className="styled-hr" />
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {products &&
                        products.map((product, index) => (
                            <div key={index} className="col">
                                <Card className="product-card" onClick={() => setActiveProduct(product, index)}>
                                    <Card.Img variant="top" src="https://placehold.co/250x150" />
                                    <Card.Body >
                                        <Card.Title style={{ textTransform: 'capitalize' }}>{product.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{product.category}</Card.Subtitle>
                                        <Card.Text>
                                            {product.description}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                </div>
            </div>

            <div className="col-md-3 cart-container">
                <h4 className="cart-title"><ShoppingCartRounded /> My Cart </h4>
                <ListGroup>
                    {cartProducts &&
                        cartProducts.map((cartProduct, index) => (
                            <ListGroup.Item
                                // onClick={() => setActiveProduct(cartProduct, index)}
                                key={index}
                                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ textTransform: 'capitalize' }}>{cartProduct.name} </span>
                                <IconButton aria-label="delete" onClick={() => removeProductFromCart(cartProduct)} ><DeleteIcon size="small" color="primary" /></IconButton>
                            </ListGroup.Item>
                        ))}
                    <div className="total-price-container">
                        <strong>Total Price:</strong>
                        <span className="total-price">{totalPrice}</span>
                    </div>
                </ListGroup>
            </div>

        </div>
    );
};

export default connect(null,)(withRouter(ProductsList));