import React from 'react';
import Cadastro from '../pages/Cadastro';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import CreateEvent from '../pages/CreateEvent';
import Home from '../pages/Home';
import AdminPage from '../pages/Admin';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import Favorites from '../pages/Favorites';
function AppRoutes() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/" element={<Home />} />
          <Route path="/create-event" element={<ProtectedRoute> <CreateEvent /> </ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/favorites" element={<ProtectedRoute> <Favorites /> </ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute> <AdminPage /> </ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default AppRoutes;