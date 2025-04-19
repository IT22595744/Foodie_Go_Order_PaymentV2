import React from 'react';
// import './App.css';
import Home from './Pages/Home';
// import SignUp from './pages/SignUp'
// import SignIn from './pages/SignIn'
import UserDashboard from './Pages/UserDashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AdminCreateProduct from './Pages/CreateMenu';
import AdminAddBanner from './Pages/AddBanner';
import AdminDashboard from './Pages/AdminDashboard';
import AddToCart from './Pages/Order/AddToCart';
import ViewCart from './Pages/Order/Carts';
import EditCart from './Pages/Order/EditCartItems';

import PaymentSuccess from './Pages/Payment/PaymentSuccess';
import PaymentCancel from './Pages/Payment/PaymentCancel';

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          {/* <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/signin" element={<SignIn />} /> */}
          <Route exact path="/user/dashboard" element={<UserDashboard />} />
          <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
          <Route exact path="/admin/dashboard/product/create" element={<AdminCreateProduct />} />
          <Route exact path="/admin/dashboard/banner/create" element={<AdminAddBanner />} />
          <Route exact path="/add-cart" element={<AddToCart />} />
          <Route path="/view-cart" element={<ViewCart />} />
          <Route path="/update-cart/:id" element={<EditCart />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancel" element={<PaymentCancel />} />
        </Routes>
      </BrowserRouter>
    </>
   
  );
}

export default App;
