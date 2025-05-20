// frontend/src/pages/AdminPanel.js
import React, { useState } from 'react';
import { NavLink, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import UsersDetail        from './admin/UsersDetail';
import MessagePage        from './admin/MessagePage';
import HomeBallsEditor    from './admin/HomeBallsEditor';
import PastWinningEditor  from './admin/PastWinningEditor';
import PastResultsEditor  from './admin/PastResultsEditor';
import RedirectUrlsEditor from './admin/RedirectUrlsEditor';
import './AdminPanel.css';

export default function AdminPanel() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [creds, setCreds]   = useState({ username: '', password: '' });
  const [error, setError]   = useState('');
  const navigate            = useNavigate();

  const ADMIN_USER = process.env.REACT_APP_ADMIN_USERNAME || 'omas';
  const ADMIN_PASS = process.env.REACT_APP_ADMIN_PASSWORD || 'omas';

  const handleLogin = e => {
    e.preventDefault();
    if (
      creds.username.toLowerCase() === ADMIN_USER.toLowerCase() &&
      creds.password === ADMIN_PASS
    ) {
      setIsAdmin(true);
      setError('');
    } else {
      setError('Invalid admin credentials');
    }
  };

  if (!isAdmin) {
    return (
      <div className="admin-login">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          {error && <p className="error">{error}</p>}
          <input
            placeholder="Username"
            value={creds.username}
            onChange={e => setCreds({ ...creds, username: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={creds.password}
            onChange={e => setCreds({ ...creds, password: e.target.value })}
            required
          />
          <button type="submit">Login as Admin</button>
        </form>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <aside className="admin-nav">
        <h2>Admin Panel</h2>
        <nav>
          <NavLink to="/admin/users">Users Detail</NavLink>
          <NavLink to="/admin/messages">Message Page</NavLink>
          <NavLink to="/admin/home-balls">Home Page Lotto Balls</NavLink>
          <NavLink to="/admin/past-winning">Past Winning Numbers</NavLink>
          <NavLink to="/admin/past-results">Past Results</NavLink>
          <NavLink to="/admin/redirect-urls">User Continue URLs</NavLink>
        </nav>
      </aside>
      <main className="admin-content">
        <Routes>
          <Route path="/"            element={<Navigate to="users" replace />} />
          <Route path="users"        element={<UsersDetail />} />
          <Route path="messages"     element={<MessagePage />} />
          <Route path="home-balls"   element={<HomeBallsEditor />} />
          <Route path="past-winning" element={<PastWinningEditor />} />
          <Route path="past-results" element={<PastResultsEditor />} />
          <Route path="redirect-urls" element={<RedirectUrlsEditor />} />
        </Routes>
      </main>
    </div>
  );
}
