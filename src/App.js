import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home       from './pages/Home';
import Login      from './pages/Login';
import Register   from './pages/Register';
import Dashboard  from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const handleTokenChange = () => {
      setToken(localStorage.getItem('token'));
    };
    window.addEventListener('tokenChanged', handleTokenChange);
    return () => window.removeEventListener('tokenChanged', handleTokenChange);
  }, []);

  return (
    <Routes>
      {/* Public pages */}
      <Route path="/"        element={<Home />} />
      <Route path="/login"   element={<Login />} />
      <Route path="/register"element={<Register />} />

      {/* Protected pages */}
      <Route
        path="/dashboard"
        element={token ? <Dashboard /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/admin/*"
        element={token ? <AdminPanel /> : <Navigate to="/login" replace />}
      />

      {/* Catch-all redirect back to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
