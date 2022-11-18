import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/home/Home';
import List from './pages/list/List';
import Property from './pages/property/Property';
import Login from './pages/login/Login';
import Admin from './pages/admin/Admin';

import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';
import Register from './pages/register/Register.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/hotels/:id" element={<Property />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
