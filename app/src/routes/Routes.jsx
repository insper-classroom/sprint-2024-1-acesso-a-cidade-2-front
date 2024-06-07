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
import Senha from '../pages/RedefinicaoSenha';
import Update from '../pages/Update';
import Validacao from '../pages/Validacao';
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
          <Route path="/reset-password" component={Senha} />
          <Route path="/atualizar-senha" component={Update} />
          <Route path="/validate-token" component={Validacao} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default AppRoutes;
