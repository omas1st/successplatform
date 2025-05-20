import React, { useState } from 'react';
import API from '../../api';
import './RedirectUrlsEditor.css';

export default function RedirectUrlsEditor() {
  const [search, setSearch]     = useState('');
  const [users, setUsers]       = useState([]);
  const [selected, setSelected] = useState(null);

  const handleSearch = () => {
    API.get(`/admin/users?search=${encodeURIComponent(search)}`)
       .then(res => setUsers(res.data));
  };

  const loadProfile = user => {
    const urls = [...(user.customUrls || [])];
    while (urls.length < 15) urls.push({ url: '', status: 'pending' });
    setSelected({ ...user, customUrls: urls });
  };

  const updateUrl = (idx, value) => {
    const cu = [...selected.customUrls];
    cu[idx].url = value;
    setSelected({ ...selected, customUrls: cu });
  };

  const changeStatus = (idx, status) => {
    const cu = [...selected.customUrls];
    cu[idx].status = status;
    setSelected({ ...selected, customUrls: cu });
  };

  const save = () => {
    API.put(`/admin/redirects/${selected._id}`, { customUrls: selected.customUrls })
      .then(() => alert('URLs updated'));
  };

  return (
    <div className="redirect-urls-editor">
      <h3>User Continue Redirect URLs</h3>

      <div className="search">
        <input
          placeholder="Search by username/email/number"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <ul className="user-list">
        {users.map(u => (
          <li key={u._id}>
            {u.username} — {u.fullName}
            <button onClick={() => loadProfile(u)}>Profile</button>
          </li>
        ))}
      </ul>

      {selected && (
        <div className="profile-editor">
          <h4>Editing URLs for {selected.fullName} ({selected.username})</h4>
          {selected.customUrls.map((u, i) => (
            <div key={i} className="url-row">
              <input
                placeholder={`URL #${i + 1}`}
                value={u.url}
                onChange={e => updateUrl(i, e.target.value)}
              />
              <select
                value={u.status}
                onChange={e => changeStatus(i, e.target.value)}
              >
                <option value="approved">Approve</option>
                <option value="disapproved">Disapprove</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          ))}
          <button onClick={save}>Save All URLs</button>
        </div>
      )}
    </div>
  );
}
