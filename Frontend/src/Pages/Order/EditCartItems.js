import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddToCart.css";

const EditCartItems = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [item, setItem] = useState({
        name: "",
        image: "",
        price: "",
        qty: 1,
        total: "",
    });
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCartItem = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/carts/${id}`);
                setItem(response.data.cart);
            } catch (error) {
                console.log("Error fetching cart item:", error);
                setError("Failed to fetch cart item details");
            }
        };
        fetchCartItem();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        if (name === "qty") {
            const newQty = parseInt(value) || 1;
            const totalPrice = newQty * parseFloat(item.price || 0);
            setItem((prevState) => ({
                ...prevState,
                total: totalPrice.toFixed(2),
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/carts/${id}`, item);
            alert("Cart item updated successfully.");
            navigate("/view-cart");
        } catch (error) {
            console.log("Error Updating Cart Item:", error);
            setError("Failed to update cart item");
        }
    };

    return (
        <div className="container cart-container mt-5">
            <div className="card shadow-lg p-4">
                <h2 className="cart-title text-center">Edit Cart Item</h2>
                {error && <p className="text-danger text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="cart-form">
                    <div className="text-center mb-3">
                        <img src={item.image} alt={item.name} className="cart-img rounded" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Name:</label>
                        <input type="text" name="name" className="form-control" value={item.name} readOnly />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Price:</label>
                        <input type="number" name="price" className="form-control" value={item.price} readOnly />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Quantity:</label>
                        <input type="number" name="qty" className="form-control" value={item.qty} onChange={handleChange} min="1" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Total:</label>
                        <input type="text" name="total" className="form-control" value={item.total} readOnly />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Update Cart
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditCartItems;
