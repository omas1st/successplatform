import React, { useEffect, useState } from 'react';
import API from '../../api';
import LottoBall from '../../components/LottoBall';
import './HomeBallsEditor.css';

export default function HomeBallsEditor() {
  const [premium, setPremium] = useState({ lunchtime: [], teatime: [] });

  useEffect(() => {
    API.get('/admin/balls').then(res => {
      setPremium(res.data.premium);
    });
  }, []);

  const updatePremium = (type, idx, value) => {
    const np = { ...premium };
    np[type][idx].value = value;
    setPremium(np);
  };

  const save = () => {
    API.put('/admin/balls', { premium })
      .then(() => alert('Saved'));
  };

  return (
    <div className="home-balls-editor">
      <h3>Home Page Lotto Balls</h3>

      {/* Removed the free balls section */}

      <section>
        <h4>Premium (4 balls each)</h4>
        {['lunchtime', 'teatime'].map(type => (
          <div key={type}>
            <h5>{type.charAt(0).toUpperCase() + type.slice(1)}</h5>
            <div className="balls-grid">
              {premium[type].map((b, i) => (
                <div key={i} className="editor-ball">
                  <LottoBall
                    value={b.value}
                    color={i < 3 ? '#88f' : '#f88'}
                  />
                  <input
                    maxLength={2}
                    value={b.value}
                    onChange={e => updatePremium(type, i, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <button onClick={save}>Save All</button>
    </div>
  );
}
