// src/pages/Home.js

import React, { useEffect, useState } from 'react';
import { useNavigate }        from 'react-router-dom';
import API                    from '../api';
import Header                 from '../components/Header';
import LottoBall              from '../components/LottoBall';
import './Home.css';

const TESTIMONIALS = [
  {
    id: 'thandi',
    name: 'Thandi',
    text: 'Activated, won R650k, and launched my catering empire! From street vendor to business owner in 7 days. Only God and this platform!',
    initialLikes: 31800,
  },
  {
    id: 'robert',
    name: 'Robert',
    text: 'I Won R1.2 MILLION after activation ✈️ Travelling SA with my queen. Life’s SHORT',
    initialLikes: 14500,
  },
];

export default function Home() {
  const [freeBalls, setFreeBalls]     = useState(Array(14).fill('00'));
  const [premium, setPremium]         = useState({ lunchtime: Array(4).fill('00'), teatime: Array(4).fill('00') });
  const [pastWinning, setPastWinning] = useState({ lunchtime: Array(4).fill('00'), teatime: Array(4).fill('00') });
  const [pastResults, setPastResults] = useState({ lunchtime: Array(7).fill('00'), teatime: Array(7).fill('00') });
  const [likes, setLikes]             = useState({});
  const [justLiked, setJustLiked]     = useState({});
  const navigate = useNavigate();

  // Load lotto data
  useEffect(() => {
    API.get('/lotto/free').then(r => setFreeBalls(r.data.balls)).catch(() => {});
    API.get('/lotto/premium').then(r => setPremium(r.data)).catch(() => {});
    API.get('/lotto/past-winning').then(r => setPastWinning(r.data)).catch(() => {});
    API.get('/lotto/past-results').then(r => setPastResults(r.data)).catch(() => {});
  }, []);

  // Initialize and daily-increment likes for testimonials
  useEffect(() => {
    const today = new Date().toDateString();
    const stored = JSON.parse(localStorage.getItem('testimonials') || '{}');
    const newLikes = {};

    TESTIMONIALS.forEach(({ id, initialLikes }) => {
      let { count = initialLikes, lastUpdate } = stored[id] || {};
      if (lastUpdate !== today) {
        count += 129;
        lastUpdate = today;
      }
      newLikes[id] = count;
      stored[id] = { count, lastUpdate };
    });

    setLikes(newLikes);
    localStorage.setItem('testimonials', JSON.stringify(stored));
  }, []);

  // Handle temporary “blue” effect on like click
  const handleLikeClick = id => {
    setJustLiked(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setJustLiked(prev => ({ ...prev, [id]: false }));
    }, 800);
  };

  return (
    <div className="home-page">
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

        <section className="cta">
          <p>
            Get premium 3 straight winning numbers and Bonus today, click the continue button below to get our premium numbers.
          </p>
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

        {/* Testimonials Section at Bottom */}
        <section className="testimonials-section">
          <h2>What Our Winners Say</h2>
          {TESTIMONIALS.map(({ id, name, text }) => (
            <div key={id} className="testimonial">
              <div className="avatar">{name.charAt(0)}</div>
              <div className="testimonial-content">
                <strong>{name}</strong>
                <p>{text}</p>
                <div className="testimonial-actions">
                  <button
                    className={`like-button ${justLiked[id] ? 'liked' : ''}`}
                    onClick={() => handleLikeClick(id)}
                  >
                    👍 {likes[id] || 0}
                  </button>
                  <button className="comment-link" disabled>
                    💬 Comment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Success Platform contact: uk49success@gmail.com</p>
      </footer>
    </div>
  );
}
