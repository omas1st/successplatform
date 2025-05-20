import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home       from './pages/Home';
import Login      from './pages/Login';
import Register   from './pages/Register';
import Dashboard  from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';

function App() {
  // we only use the token to protect the dashboard/admin routes
  const token = localStorage.getItem('token');

  return (
    <Routes>
      {/* Public pages */}
      <Route path="/"        element={<Home />} />
      <Route path="/login"   element={<Login />} />
      <Route path="/register"element={<Register />} />

      {/* Protected pages */}
      <Route
        path="/dashboard"
        element={ token ? <Dashboard /> : <Navigate to="/login" replace /> }
      />
      <Route
        path="/admin/*"
        element={ token ? <AdminPanel /> : <Navigate to="/login" replace /> }
      />

      {/* Catch‑all redirect back to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
