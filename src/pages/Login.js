import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';
import './Auth.css';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const nav = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await API.post('/users/login', form);
      localStorage.setItem('token', data.token);
      window.dispatchEvent(new Event('tokenChanged'));
      
      // Redirect to admin panel if user is admin, otherwise to dashboard
      if (data.user.isAdmin) {
        nav('/admin');
      } else {
        nav('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <input placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required />
      <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
      <button type="submit">Login</button>
      <p>
        New user? <Link to="/register">Register here</Link>
      </p>
    </form>
  );
                                          }
