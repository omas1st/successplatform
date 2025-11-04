import React from 'react';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import UsersDetail        from './admin/UsersDetail';
import MessagePage        from './admin/MessagePage';
import HomeBallsEditor    from './admin/HomeBallsEditor';
import PastWinningEditor  from './admin/PastWinningEditor';
import PastResultsEditor  from './admin/PastResultsEditor';
import RedirectUrlsEditor from './admin/RedirectUrlsEditor';
import './AdminPanel.css';

export default function AdminPanel() {
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
