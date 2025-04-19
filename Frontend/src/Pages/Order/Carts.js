import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Nav from "../../Component/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import "./cart.css";
import {loadStripe} from "@stripe/stripe-js";

const apiURL = "http://localhost:8080";

const Carts = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  console.log(carts);
  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/carts/");
        setCarts(response.data.carts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching carts:", error);
        setError("Failed to fetch cart details");
        setLoading(false);
      }
    };
    fetchCarts();
  }, []);

  useEffect(() => {
    let total = 0;
    carts.forEach((cart) => {
      total += parseFloat(cart.total);
    });
    setTotalAmount(total);
  }, [carts]);

  const handleRemoveFromCart = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/carts/${id}`);
      setCarts((prevCarts) => prevCarts.filter((cart) => cart._id !== id));
      alert("Item removed from cart successfully.");
    } catch (error) {
      console.error("Error removing item from cart:");
      alert("Failed to remove item from cart");
    }
  };

  const makePayment=async()=>{
    const stripe=await loadStripe("pk_test_51RDI58FfB6lW4ek0nhTfFa3p5oZ9EQXQfjPh93RJ8qUSeDM3CuQGei8XTbQOTVODiwDh2DGNz8RkJwJ3ebhDSroH003LElCvhu");
    
    const body={
      products:carts
    }

    const headers={
      "Content-Type":"application/json"
    }

    const response=await fetch(`${apiURL}/create-checkout-session`,{
      method:"POST",
      headers:headers,
      body:JSON.stringify(body)
    })

    const session=await response.json();

    const result=stripe.redirectToCheckout({
      sessionId:session.id
    })
  }

  return (
    <div>
      <Nav />
      <div className="container mt-5">
        <h1 className="text-center text-primary fw-bold">Your Foods Are Here Hurry Up To Eat</h1>
        <div className="d-flex justify-content-between my-3">
          <Link to="/viewallcarts" className="btn btn-primary">Add New</Link>
          <button className="btn btn-warning">Download Report</button>
        </div>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-danger text-center">{error}</p>
        ) : (
          <div className="row">
            {carts.length === 0 ? (
              <p className="text-center">No items in cart</p>
            ) : (
              <>
                {carts.map((cart) => (
                  <div key={cart._id} className="col-md-6 col-lg-4 mb-4">
                    <div className="card shadow-sm border-0">
                      <img src={cart.image} className="card-img-top" alt={cart.name} />
                      <div className="card-body">
                        <h5 className="card-title text-dark">{cart.name}</h5>
                        <p className="card-text text-muted">Price: ${cart.price}</p>
                        <p className="card-text text-muted">Quantity: {cart.qty}</p>
                        <p className="card-text text-danger fw-bold">Total: ${cart.total}</p>
                        <div className="d-flex justify-content-between">
                          <button className="btn btn-danger" onClick={() => handleRemoveFromCart(cart._id)}>Delete</button>
                          <Link to={`/update-cart/${cart._id}`} className="btn btn-primary">Update</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="col-12 mt-4 text-center">
                  <h3 className="fw-bold">Total Amount: <span className="text-success">Rs.{totalAmount.toFixed(2)}</span></h3>
                  
                  <button onClick={makePayment}>Make Payment</button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Carts;
