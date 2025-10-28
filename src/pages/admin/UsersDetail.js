import React, { useEffect, useState } from 'react';
import API from '../../api';
import './UsersDetail.css';

export default function UsersDetail() {
  const [search, setSearch] = useState('');
  const [users, setUsers]   = useState([]);

  const fetchUsers = (query = '') => {
    API.get(`/admin/users?search=${encodeURIComponent(query)}`)
      .then(res => {
        // Sort users by createdAt in descending order (newest first)
        const sortedUsers = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setUsers(sortedUsers);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = id => {
    if (!window.confirm('Delete this user?')) return;
    API.delete(`/admin/users/${id}`).then(() => {
      setUsers(users.filter(u => u._id !== id));
    });
  };

  const handleEdit = u => {
    // prompt for 3+bonus lunchtime and teatime
    const lt = prompt('Enter 4 Lunchtime premium balls (comma-separated):', u.premium?.lunchtime.join(',') || '');
    const tt = prompt('Enter 4 Teatime premium balls (comma-separated):', u.premium?.teatime.join(',') || '');
    if (lt != null && tt != null) {
      const lunchtime = lt.split(',').map(s => s.trim()).slice(0,4);
      const teatime   = tt.split(',').map(s => s.trim()).slice(0,4);
      API.put(`/admin/users/${u._id}`, { premium: { lunchtime, teatime } })
        .then(res => {
          setUsers(users.map(x => x._id === u._id ? res.data : x));
          alert('Premium numbers updated');
        });
    }
  };

  return (
    <div className="users-detail">
      <h3>Registered Users</h3>
      <div className="search-bar">
        <input
          placeholder="Search by username/email/number"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={() => fetchUsers(search)}>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Full Name</th><th>Username</th><th>Email</th>
            <th>WhatsApp</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.fullName}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.whatsapp}</td>
              <td>
                <button onClick={() => handleEdit(u)}>Edit Premium</button>
                <button onClick={() => handleDelete(u._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
