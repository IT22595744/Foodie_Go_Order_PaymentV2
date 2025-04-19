import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddToCart.css";

const AddToCart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [item, setItem] = useState({
    name: "",
    image: "",
    price: "",
    qty: 1,
    total: ""
  });

  useEffect(() => {
    if (location.state && location.state.product) {
      const { productName, image, price } = location.state.product;
      setItem({
        name: productName,
        image: image,
        price: price,
        qty: 1,
        total: price
      });
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevState) => ({
      ...prevState,
      [name]: value
    }));

    if (name === "qty") {
      const totalPrice = parseFloat(value) * parseFloat(item.price);
      setItem((prevState) => ({
        ...prevState,
        total: totalPrice.toFixed(2)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/carts/", item);
      alert("Item added to cart successfully.");
      navigate("/view-cart");
    } catch (error) {
      alert("Error adding item to cart.");
    }
  };

  return (
    <div className="container cart-container">
      <div className="card shadow-lg p-4">
        <h2 className="cart-title text-center">Add Food to Cart</h2>
        <form onSubmit={handleSubmit} className="cart-form">
          <div className="mb-3 text-center">
            <img src={item.image} alt={item.name} className="cart-img" />
          </div>

          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input type="text" className="form-control" value={item.name} readOnly />
          </div>

          <div className="mb-3">
            <label className="form-label">Price:</label>
            <input type="number" className="form-control" value={item.price} readOnly />
          </div>

          <div className="mb-3">
            <label className="form-label">Quantity:</label>
            <input type="number" name="qty" className="form-control" value={item.qty} onChange={handleChange} min="1" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Total:</label>
            <input type="text" className="form-control" value={item.total} readOnly />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Add to Cart
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddToCart;
