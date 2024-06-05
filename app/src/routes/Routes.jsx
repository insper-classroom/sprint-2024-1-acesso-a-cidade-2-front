import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cadastro from '../pages/Cadastro';
import Home from '../pages/Home';
// import Login from '../pages/Login';
// import Register from '../pages/Register';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Cadastro />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;