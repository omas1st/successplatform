// src/pages/Home.js

import React, { useEffect, useState } from 'react';
import { useNavigate }        from 'react-router-dom';
import API                    from '../api';
import Header                 from '../components/Header';
import LottoBall              from '../components/LottoBall';
import './Home.css';

export default function Home() {
  const [freeBalls, setFreeBalls]     = useState(Array(14).fill('00'));
  const [premium, setPremium]         = useState({ lunchtime: Array(4).fill('00'), teatime: Array(4).fill('00') });
  const [pastWinning, setPastWinning] = useState({ lunchtime: Array(4).fill('00'), teatime: Array(4).fill('00') });
  const [pastResults, setPastResults] = useState({ lunchtime: Array(7).fill('00'), teatime: Array(7).fill('00') });
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/lotto/free').then(r => setFreeBalls(r.data.balls)).catch(() => {});
    API.get('/lotto/premium').then(r => setPremium(r.data)).catch(() => {});
    API.get('/lotto/past-winning').then(r => setPastWinning(r.data)).catch(() => {});
    API.get('/lotto/past-results').then(r => setPastResults(r.data)).catch(() => {});
  }, []);

  return (
    <div className="home-page">
      {/* Header without Home/Login/Register links */}
      <Header hideNav />

      <main>
        <section>
          <h2>Free Lunchtime &amp; Teatime Numbers (Today)</h2>
          <div className="balls-grid">
            {freeBalls.map((v, i) => <LottoBall key={i} value={v} />)}
          </div>
        </section>

        <section>
          <h2>Premium Winning Numbers</h2>
          <div className="predictions">
            {['lunchtime','teatime'].map(type => (
              <div key={type}>
                <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                <div className="balls-row">
                  {(premium[type] || []).map((v, i) => (
                    <LottoBall key={i} value={v} color={i < 3 ? '#88f' : '#f88'} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Restored Continue button */}
        <section className="cta">
          <p>
            Get premium 3 straight winning numbers and Bonus today, click the continue button below to get our premium numbers .          </p>
          <button onClick={() => navigate('/login')}>Continue</button>
        </section>

        <section>
          <h2>Past Winning Numbers</h2>
          <div className="balls-row">
            {pastWinning.lunchtime.map((v, i) => <LottoBall key={i} value={v} />)}
          </div>
          <div className="balls-row">
            {pastWinning.teatime.map((v, i) => <LottoBall key={i} value={v} />)}
          </div>
        </section>

        <section>
          <h2>Past Results</h2>
          <div className="balls-row">
            {pastResults.lunchtime.map((v, i) => <LottoBall key={i} value={v} />)}
          </div>
          <div className="balls-row">
            {pastResults.teatime.map((v, i) => <LottoBall key={i} value={v} />)}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Success Platform contact: omas7th@gmail.com</p>
      </footer>
    </div>
  );
}
