import React from 'react';
import Cadastro from '../pages/Cadastro';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import CreateEvent from '../pages/CreateEvent';
import Home from '../pages/Home';
import AdminPage from '../pages/Admin';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import Favorites from '../pages/Favorites';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ResetPassword from './pages/RedefinicaoSenha';
import UpdatePassword from './pages/Update';
import TokenValidation from './pages/Validacao';

function AppRoutes() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/" element={<Home />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route
            path="/admin" element={<AdminPage />}
            // element={
            //   <ProtectedRoute>
            //     <AdminPage />
            //   </ProtectedRoute>
            // }
          />
          <Switch>
            <Route path="/reset-password" component={ResetPassword} />
            <Route path="/atualizar-senha" component={UpdatePassword} />
            <Route path="/validate-token" component={TokenValidation} />
        </Switch>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default AppRoutes;