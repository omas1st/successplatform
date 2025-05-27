import React, { useEffect, useState, useCallback } from 'react';
import API from '../../api';
import LottoBall from '../../components/LottoBall';
import './HomeBallsEditor.css';

// placeholders so balls render immediately
const DEFAULT_FREE = Array(14).fill({ value: '00', isWon: false });
const DEFAULT_PREMIUM = {
  lunchtime: Array(4).fill({ value: '00', isWon: false }),
  teatime:   Array(4).fill({ value: '00', isWon: false }),
};

export default function HomeBallsEditor() {
  const [free, setFree] = useState(DEFAULT_FREE);
  const [premium, setPremium] = useState(DEFAULT_PREMIUM);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/admin/balls').then(res => {
      setFree(res.data.free);
      setPremium(res.data.premium);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const updateFree = useCallback((idx, value) => {
    setFree(f => {
      const copy = [...f];
      copy[idx] = { ...copy[idx], value };
      return copy;
    });
  }, []);

  const toggleWon = useCallback(idx => {
    setFree(f => {
      const copy = [...f];
      copy[idx] = { ...copy[idx], isWon: !copy[idx].isWon };
      return copy;
    });
  }, []);

  const updatePremium = useCallback((type, idx, value) => {
    setPremium(p => {
      const copy = { ...p };
      copy[type] = copy[type].map((b, i) =>
        i === idx ? { ...b, value } : b
      );
      return copy;
    });
  }, []);

  const save = () => {
    API.put('/admin/balls', { free, premium })
      .then(() => alert('Saved'));
  };

  return (
    <div className="home-balls-editor">
      <h3>Home Page Lotto Balls</h3>

      <section>
        <h4>Free (14 balls)</h4>
        <div className="balls-grid">
          {free.map((b, i) => (
            <div key={i} className="editor-ball">
              <LottoBall
                value={b.isWon ? '🏆' : b.value}
                color={b.isWon ? '#ff0' : undefined}
                onClick={() => toggleWon(i)}
              />
              <input
                maxLength={2}
                value={b.value}
                onChange={e => updateFree(i, e.target.value)}
              />
            </div>
          ))}
        </div>
      </section>

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

      <button onClick={save} disabled={loading}>
        {loading ? 'Loading…' : 'Save All'}
      </button>
    </div>
  );
}
