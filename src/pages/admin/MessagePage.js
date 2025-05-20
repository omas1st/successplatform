import React, { useState } from 'react';
import API from '../../api';
import './MessagePage.css';

export default function MessagePage() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState('');

  const handleSearch = () => {
    API.get(`/admin/users?search=${encodeURIComponent(search)}`)
      .then(res => setUsers(res.data));
  };

  const sendNotification = () => {
    if (!selected || !note) return;
    API.post(`/admin/notify/${selected._id}`, { message: note })
      .then(() => {
        alert('Notification sent');
        setNote('');
      });
  };

  return (
    <div className="message-page">
      <h3>Send Notification</h3>
      <div className="search">
        <input
          placeholder="Search username or name"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <ul className="user-list">
        {users.map(u => (
          <li
            key={u._id}
            className={selected?._id === u._id ? 'selected' : ''}
            onClick={() => setSelected(u)}
          >
            {u.fullName} ({u.username})
          </li>
        ))}
      </ul>

      {selected && (
        <div className="notify-form">
          <h4>Notify: {selected.fullName}</h4>
          <textarea
            placeholder="Your message..."
            value={note}
            onChange={e => setNote(e.target.value)}
          />
          <button onClick={sendNotification}>Send</button>
        </div>
      )}
    </div>
  );
}
