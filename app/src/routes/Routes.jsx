import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import AdminPage from '../pages/Admin';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

function AppRoutes() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin" element={<AdminPage />}
            // element={
            //   <ProtectedRoute>
            //     <AdminPage />
            //   </ProtectedRoute>
            // }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default AppRoutes;