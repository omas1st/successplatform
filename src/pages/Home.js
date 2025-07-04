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
    text: 'I almost gave up betting on UK49s because of endless losses. Taking one last chance with Success Winning Platform was the best decision ever. I won R320,000 and my life has changed!',
    initialLikes: 31802,
  },
  {
    id: 'robert',
    name: 'Robert',
    text: 'I Won R1.2 MILLION after activation ✈️ Travelling SA with my queen. Life’s SHORT',
    initialLikes: 14505,
  },
  {
    id: 'mahlaba',
    name: 'Mahlaba',
    text: 'I’d been scammed and lost count of my losses. But Success Winning Platform gave me a real win, R800,000 won just after activating my account!',
    initialLikes: 28811,
  },
  {
    id: 'modiba',
    name: 'Modiba',
    text: 'I’ve tried many platforms, but this is the only one that delivered. I won R300,000. Dreams do come true!',
    initialLikes: 26108,
  },
  {
    id: 'sphelele',
    name: 'Sphelele',
    text: 'I was skeptical at first, but after winning R160,000, I’m now a true believer. The process was simple and the results were real.',
    initialLikes: 10730,
  },
  {
    id: 'sbusiso',
    name: 'Sbusiso',
    text: 'With R430,000 in winnings, I can finally renovate my home. I’m so thankful for this platform and the admin.',
    initialLikes: 18451,
  },
  {
    id: 'ntombikhona',
    name: 'Ntombikhona',
    text: 'After endless losses and scams, I tried Success Winning Platform as my last hope. Their numbers brought me R1,100,000 unbelievable!',
    initialLikes: 33148,
  },
  {
    id: 'william',
    name: 'William',
    text: 'I was shocked when I saw I had won R600,000. This platform is the real deal for anyone looking to win big.',
    initialLikes: 19193,
  },
  {
    id: 'thamsanqa',
    name: 'Thamsanqa',
    text: 'After activating my account, I received my numbers and won R1,300,000! I’m forever grateful for this life-changing win.',
    initialLikes: 24670,
  },
  {
    id: 'john',
    name: 'John',
    text: 'I never thought I’d win after so many disappointments. Success Winning Platform gave me 3 straight numbers and bonus after i activated my account. I won R750,000!',
    initialLikes: 11304,
  },
  {
    id: 'kgomotso',
    name: 'Kgomotso',
    text: 'I never imagined I’d win R350,000 so quickly. This platform is trustworthy and delivers on its promises.',
    initialLikes: 20002,
  },
  {
    id: 'annah',
    name: 'Annah',
    text: 'I nearly gave up on betting, but Success Winning Platform’s winning numbers changed my story. I won R950,000 and I’m so grateful., thanks to Success wining platform and its admins',
    initialLikes: 34706,
  },
  {
    id: 'dingane',
    name: 'Dingane',
    text: 'I was on the verge of quitting UK49s for good after so many losses and falling for scams. But after joining Success Winning Platform, I won R450,000 with their 3 straight numbers and bonus! I can’t believe my luck finally changed.',
    initialLikes: 30214,
  },
  {
    id: 'daniel',
    name: 'Daniel',
    text: 'Honestly, I had lost all hope in UK49s. Scammers took so much from me. But Success Winning Platform restored my faith. I won R120,000 right after activating my account!',
    initialLikes: 25523,
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
        count += 117;
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
